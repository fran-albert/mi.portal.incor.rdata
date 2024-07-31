// import { formatDate, formatearDNI, stateName } from "@/common/Utils";
import { useEffect, useState } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { capitalizeWords, handleDateChange } from "@/common/helpers/helpers";
import { FaCalendar } from "react-icons/fa6";
import { BloodSelect } from "@/components/Select/Blood/select";
import { RHFactorSelect } from "@/components/Select/RHFactor/select";
import { GenderSelect } from "@/components/Select/Gender/select";
import { MaritalStatusSelect } from "@/components/Select/MaritalStatus/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CitySelect } from "@/components/Select/City/select";
import { StateSelect } from "@/components/Select/State/select";
import { User } from "@/types/User/User";
import moment from "moment-timezone";
import { formatDate, formatDni } from "@/common/helpers/helpers";
import { State } from "@/types/State/State";
import { Doctor } from "@/types/Doctor/Doctor";
import { useForm, SubmitHandler } from "react-hook-form";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import { toast } from "sonner";
import "react-datepicker/dist/react-datepicker.css";
import { HealthInsurance } from "@/types/Health-Insurance/Health-Insurance";
import { Speciality } from "@/types/Speciality/Speciality";
import Loading from "@/app/loading";
import { DoctorSchema } from "@/validators/doctor.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaUserEdit } from "react-icons/fa";
import { City } from "@/types/City/City";
import ChangePasswordDialog from "../Change-Password/dialog";
import { useDoctorMutations } from "@/hooks/Doctor/useDoctorMutation";
import { spec } from "node:test/reporters";
type FormValues = z.infer<typeof DoctorSchema>;
export default function ProfileDoctorCardComponent({
  data,
}: {
  data: Doctor | undefined;
}) {
  const { updateDoctorMutation } = useDoctorMutations();
  const form = useForm<FormValues>({
    resolver: zodResolver(DoctorSchema),
  });
  const {
    setValue,
    control,
    formState: { errors },
  } = form;
  const [selectedState, setSelectedState] = useState<State | undefined>(
    data?.address?.city?.state
  );
  const [selectedCity, setSelectedCity] = useState<City | undefined>(
    data?.address?.city
  );
  const [startDate, setStartDate] = useState<Date | undefined>(() =>
    data?.birthDate ? new Date(data.birthDate.toString()) : undefined
  );
  const removeDotsFromDni = (dni: any) => dni.replace(/\./g, "");

  const handleStateChange = (state: State) => {
    setSelectedState(state);
    setSelectedCity(undefined);
  };
  const handleCityChange = (city: City) => {
    setSelectedCity(city);
  };
  useEffect(() => {
    if (data) {
      setValue("firstName", data.firstName);
      setValue("lastName", data.lastName);
      setValue("email", data.email);
      setValue("userName", formatDni(String(data.dni)));
      if (data?.birthDate) {
        setStartDate(new Date(data.birthDate.toString()));
        setValue("birthDate", data.birthDate.toString());
      }
      setValue("phoneNumber", data.phoneNumber);
      setValue("phoneNumber2", data.phoneNumber2 || "");
      setValue("bloodType", String(data.bloodType) || "");
      setValue("matricula", data.matricula || "");
      setValue("rhFactor", String(data.rhFactor) || "");
      setValue("gender", String(data.gender) || "");
      setValue("maritalStatus", String(data.maritalStatus) || "");
      setValue("observations", data.observations || "");
      setValue("address.city.state", data?.address?.city?.state);
      setValue("address.city", data?.address?.city);
      setValue("address.street", data?.address.street);
      setValue("address.number", data?.address.number);
      setValue("address.description", data?.address.description || "");
      setValue("address.phoneNumber", data?.address.phoneNumber || "");
      setSelectedState(data?.address?.city?.state);
      setSelectedCity(data?.address?.city);
    }
  }, [data, setValue]);
  const onSubmit: SubmitHandler<any> = async (formData) => {
    const specialitiesToSend = data?.specialities.map((s) => ({
      id: s.id,
      name: s.name,
    }));
    const healthInsuranceToSend = data?.healthInsurances.map((h) => ({
      id: h.id,
      name: h.name,
    }));

    const { address, ...rest } = formData;
    const formattedUserName = removeDotsFromDni(formData.userName);
    const addressToSend = {
      ...address,
      id: data?.address?.id,
      city: {
        ...selectedCity,
        state: selectedState,
      },
    };

    const dataToSend: any = {
      ...rest,
      userName: formattedUserName,
      address: addressToSend,
      specialities: specialitiesToSend,
      healthInsurances: healthInsuranceToSend,
      photo: data?.photo,
      registeredById: data?.registeredById,
    };

    console.log("dataToSend", dataToSend);

    try {
      const doctorCreationPromise = updateDoctorMutation.mutateAsync({
        id: Number(data?.userId),
        doctor: dataToSend,
      });

      toast.promise(doctorCreationPromise, {
        loading: "Actualizando médico...",
        success: "Médico actualizado con éxito!",
        error: "Error al actualizar el médico",
      });

      doctorCreationPromise.catch((error) => {
        console.error("Error al actualizar el médico", error);
      });
    } catch (error) {
      console.error("Error al actualizar el médico", error);
    }
  };

  return (
    <div key="1" className="w-full container px-4 sm:px-6 lg:px-8 mt-2">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="profileForm">
            <CardHeader>
              <CardTitle>
                <button
                  className="flex items-center justify-start w-full"
                  type="button"
                >
                  <FaUserEdit className="text-black mr-2" size={25} />
                  Mi Perfil
                </button>
              </CardTitle>
              <CardDescription>
                En esta sección podrás modificar tus datos personales.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">Nombre</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Ingresar nombre..."
                              defaultValue={data?.firstName}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">Apellido</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Ingresar apellido..."
                              defaultValue={data?.lastName}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">
                            Correo Electrónico
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Ingresar correo electrónico..."
                              defaultValue={data?.email}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="userName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">D.N.I.</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Ingresar D.N.I..."
                              defaultValue={formatDni(String(data?.dni))}
                              readOnly
                              className="w-full text-gray-800 cursor-not-allowed"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={control}
                      name="birthDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">
                            Fecha de Nacimiento
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="date"
                              value={
                                field.value &&
                                !isNaN(new Date(field.value).getTime())
                                  ? moment(new Date(field.value)).format(
                                      "YYYY-MM-DD"
                                    )
                                  : ""
                              }
                              onChange={(e) =>
                                handleDateChange(
                                  e,
                                  setStartDate,
                                  setValue,
                                  "birthDate"
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">Teléfono</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Ingresar teléfono..."
                              defaultValue={data?.phoneNumber}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="phoneNumber2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">
                            Teléfono 2
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              defaultValue={data?.phoneNumber2}
                              placeholder="Ingresar teléfono..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="bloodType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">Sangre</FormLabel>
                          <FormControl>
                            <BloodSelect
                              control={control}
                              defaultValue={String(data?.bloodType) || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="rhFactor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">
                            Factor R.H.
                          </FormLabel>
                          <FormControl>
                            <RHFactorSelect
                              control={control}
                              defaultValue={String(data?.rhFactor) || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">Sexo</FormLabel>
                          <FormControl>
                            <GenderSelect
                              control={control}
                              defaultValue={String(data?.gender) || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="maritalStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">
                            Estado Civil
                          </FormLabel>
                          <FormControl>
                            <MaritalStatusSelect
                              control={control}
                              defaultValue={String(data?.maritalStatus) || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="observations"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">
                            Obra Social
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="w-full text-gray-800 cursor-not-allowed"
                              value={data?.healthInsurances
                                .map(
                                  (item) =>
                                    item.name.charAt(0).toUpperCase() +
                                    item.name.slice(1).toLowerCase()
                                )
                                .join(", ")}
                              readOnly
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="observations"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">
                            Especialidades
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={
                                data?.specialities
                                  .map((speciality) => speciality.name)
                                  .join(", ") || ""
                              }
                              className="w-full text-gray-800 cursor-not-allowed"
                              readOnly
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="affiliationNumber">
                      Número de Obra Social
                    </Label>
                    <Input
                      id="affiliationNumber"
                      className="w-full text-gray-800 cursor-not-allowed"
                      // defaultValue={data?.affiliationNumber}
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="observations"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">
                            Observaciones
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="w-full text-gray-800 cursor-not-allowed"
                              defaultValue={data?.observations}
                              readOnly
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="address.city.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">
                            Provincia
                          </FormLabel>
                          <FormControl>
                            <StateSelect
                              control={control}
                              defaultValue={data?.address?.city?.state}
                              onStateChange={handleStateChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">Ciudad</FormLabel>
                          <FormControl>
                            {selectedState && (
                              <CitySelect
                                control={control}
                                defaultValue={selectedCity}
                                idState={selectedState.id}
                                onCityChange={handleCityChange}
                              />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="address.street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">Calle</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Ingresar calle"
                              defaultValue={data?.address.street}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="address.number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">N°</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Ingresar número"
                              defaultValue={data?.address.number}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="address.description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">Piso</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Ingresar número"
                              defaultValue={data?.address.description}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="address.phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">
                            Departamento
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Ingresar departamento"
                              defaultValue={data?.address.phoneNumber}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-center gap-2">
              <Button
                className="sm:w-auto"
                variant="incor"
                form="profileForm"
                type="submit"
              >
                Modificar Datos
              </Button>
            </CardFooter>
          </form>
        </Form>
        <div className="mb-4 flex justify-center">
          <ChangePasswordDialog idUser={Number(data?.userId)} />
        </div>
      </Card>
    </div>
  );
}
