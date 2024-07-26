import { useEffect, useState } from "react";
import { FaCamera, FaPencilAlt, FaUserEdit } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { goBack } from "@/lib/utils";
import { capitalizeWords, handleDateChange } from "@/common/helpers/helpers";
import { FaCalendar } from "react-icons/fa6";
import { BloodSelect } from "@/components/Select/Blood/select";
import { RHFactorSelect } from "@/components/Select/RHFactor/select";
import { GenderSelect } from "@/components/Select/Gender/select";
import { MaritalStatusSelect } from "@/components/Select/MaritalStatus/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CitySelect } from "@/components/Select/City/select";
import { StateSelect } from "@/components/Select/State/select";
import { HealthInsurance } from "@/types/Health-Insurance/Health-Insurance";
import { HealthPlans } from "@/modules/healthPlans/domain/HealthPlan";
import { User } from "@/types/User/User";
import { formatDni } from "@/common/helpers/helpers";
import useRoles from "@/hooks/useRoles";
import { Patient } from "@/types/Patient/Patient";
import { State } from "@/types/State/State";
import { HealthPlanSelect } from "@/components/Select/HealthPlan/select";
import ChangePasswordDialog from "../changePassword/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";
import { toast } from "sonner";
import { IoMdArrowRoundBack } from "react-icons/io";
import Loading from "@/app/loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatientSchema } from "@/validators/patient.schema";
import { z } from "zod";
import { City } from "@/types/City/City";
registerLocale("es", es);
type FormValues = z.infer<typeof PatientSchema>;
export default function ProfileCardComponent({ data }: { data: Patient }) {
  // const { updatePatient } = usePatient();
  const form = useForm<FormValues>({
    resolver: zodResolver(PatientSchema),
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
      setValue("rhFactor", String(data.rhFactor) || "");
      setValue("gender", String(data.gender) || "");
      setValue("maritalStatus", String(data.maritalStatus) || "");
      setValue("observations", data.observations || "");
      setValue("address.city.state", data?.address?.city?.state);
      setValue("address.city", data?.address?.city);
      setSelectedState(data?.address?.city?.state);
      setSelectedCity(data?.address?.city);
    }
  }, [data, setValue]);

  const onSubmit: SubmitHandler<any> = async (formData) => {
    const formattedUserName = removeDotsFromDni(formData.userName);
    const { address, ...rest } = formData;
    const addressToSend = {
      ...address,
      id: data?.address?.id,
      city: {
        ...selectedCity,
        state: selectedState,
      },
    };
    const healthPlansToSend = data?.healthPlans?.map((plan) => ({
      id: plan.id,
      name: plan.name,
      healthInsurance: {
        id: plan.healthInsurance.id,
        name: plan.healthInsurance.name,
      },
    }));
    const dataToSend = {
      ...rest,
      userName: formattedUserName,
      address: addressToSend,
      photo: data.photo,
      registeredById: data.registeredById,
      healthPlans: healthPlansToSend,
    };

    // try {
    //   const patientCreationPromise = updatePatient(
    //     Number(data?.userId),
    //     dataToSend
    //   );
    //   toast.promise(patientCreationPromise, {
    //     loading: "Actualizando datos...",
    //     success: "Datos actualizados con éxito!",
    //     error: "Error al actualizar los datos",
    //   });

    //   patientCreationPromise.catch((error) => {
    //     console.error("Error al actualizar los datos", error);
    //   });
    // } catch (error) {
    //   console.error("Error al actualizar los datos", error);
    // }
  };

  if (!data) {
    return <Loading isLoading={true} />;
  }

  return (
    <>
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
                            <FormLabel className="text-black">
                              Apellido
                            </FormLabel>
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
                        control={form.control}
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
                                  startDate
                                    ? startDate.toISOString().split("T")[0]
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
                            <FormLabel className="text-black">
                              Teléfono
                            </FormLabel>
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
                  <div className="">
                    <div className="space-y-2">
                      <Label htmlFor="healthCareProvider">Obra Social</Label>
                      <Input
                        className="w-full text-gray-800 cursor-not-allowed"
                        value={data?.healthPlans?.map((plan) => plan.name)}
                        readOnly
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
                        defaultValue={data?.affiliationNumber}
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
                              <CitySelect
                                control={control}
                                defaultValue={selectedCity}
                                idState={selectedState ? selectedState.id : 0}
                                onCityChange={handleCityChange}
                              />
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
                                defaultValue={data?.address?.street}
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
                                defaultValue={data?.address?.number}
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
                                defaultValue={data?.address?.description}
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
                                defaultValue={data?.address?.phoneNumber}
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
              <CardFooter className="flex flex-col sm:flex-row justify-end gap-2">
                {/* <ChangePasswordDialog id={id} /> */}
                <Button
                  className="w-full sm:w-auto"
                  variant="incor"
                  form="profileForm"
                  type="submit"
                >
                  Modificar Datos
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
}
