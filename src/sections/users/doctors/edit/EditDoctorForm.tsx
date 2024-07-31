"use client";
import { formatDni, handleDateChange } from "@/common/helpers/helpers";
import { BloodSelect } from "@/components/Select/Blood/select";
import { RHFactorSelect } from "@/components/Select/RHFactor/select";
import { GenderSelect } from "@/components/Select/Gender/select";
import { MaritalStatusSelect } from "@/components/Select/MaritalStatus/select";
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
import { capitalizeWords } from "@/common/helpers/helpers";
import { CitySelect } from "@/components/Select/City/select";
import { StateSelect } from "@/components/Select/State/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { HealthInsurance } from "@/types/Health-Insurance/Health-Insurance";
import { HealthPlans } from "@/modules/healthPlans/domain/HealthPlan";
import { State } from "@/types/State/State";
import { User } from "@/types/User/User";
import { useParams } from "next/navigation";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import moment from "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale/es";
registerLocale("es", es);
import React, { useEffect, useState } from "react";
import { FaCalendar, FaCamera } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "sonner";
import { Doctor } from "@/types/Doctor/Doctor";
import { Speciality } from "@/types/Speciality/Speciality";
import { goBack } from "@/lib/utils";
import { SpecialitySelect } from "@/components/Select/Speciality/select";
import { City } from "@/types/City/City";
import { DoctorSchema } from "@/validators/doctor.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDoctorMutations } from "@/hooks/Doctor/useDoctorMutation";
import { HealthInsuranceDoctorSelect } from "@/components/Select/HealthInsurace/Doctor/select";

type FormValues = z.infer<typeof DoctorSchema>;

function EditDoctorForm({ doctor }: { doctor: Doctor }) {
  const { updateDoctorMutation } = useDoctorMutations();
  const [selectedState, setSelectedState] = useState<State | undefined>(
    doctor?.address?.city?.state
  );
  const [selectedCity, setSelectedCity] = useState<City | undefined>(
    doctor?.address?.city
  );
  const [selectedHealthInsurances, setSelectedHealthInsurances] = useState<
    HealthInsurance[]
  >(doctor?.healthInsurances || []);
  const [selectedSpecialities, setSelectedSpecialities] = useState<
    Speciality[]
  >(doctor?.specialities || []);

  const form = useForm<FormValues>({
    resolver: zodResolver(DoctorSchema),
  });
  const {
    setValue,
    control,
    formState: { errors },
  } = form;
  const removeDotsFromDni = (dni: any) => dni.replace(/\./g, "");
  const [startDate, setStartDate] = useState<Date | undefined>(() =>
    doctor?.birthDate ? new Date(doctor.birthDate.toString()) : undefined
  );

  useEffect(() => {
    if (doctor) {
      setValue("firstName", doctor.firstName);
      setValue("lastName", doctor.lastName);
      setValue("email", doctor.email);
      setValue("userName", formatDni(String(doctor.dni)));
      if (doctor?.birthDate) {
        setStartDate(new Date(doctor.birthDate.toString()));
        setValue("birthDate", doctor.birthDate.toString());
      }
      setValue("phoneNumber", doctor.phoneNumber);
      setValue("phoneNumber2", doctor.phoneNumber2 || "");
      setValue("bloodType", String(doctor.bloodType) || "");
      setValue("matricula", doctor.matricula || "");
      setValue("rhFactor", String(doctor.rhFactor) || "");
      setValue("gender", String(doctor.gender) || "");
      setValue("maritalStatus", String(doctor.maritalStatus) || "");
      setValue("observations", doctor.observations || "");
      setValue("address.city.state", doctor?.address?.city?.state);
      setValue("address.city", doctor?.address?.city);
      setValue("address.street", doctor?.address.street);
      setValue("address.number", doctor?.address.number);
      setValue("address.description", doctor?.address.description || "");
      setValue("address.phoneNumber", doctor?.address.phoneNumber || "");
      setSelectedHealthInsurances(doctor.healthInsurances || []);
      setSelectedSpecialities(doctor.specialities || []);
      setSelectedCity(doctor?.address?.city);
      setSelectedState(doctor?.address?.city?.state);
    }
  }, [doctor, setValue]);


  const handleStateChange = (state: State) => {
    setSelectedState(state);
    setSelectedCity(undefined);
  };
  const handleCityChange = (city: City) => {
    setSelectedCity(city);
  };

  const onSubmit: SubmitHandler<any> = async (formData) => {
    const specialitiesToSend = selectedSpecialities.map((s) => ({
      id: s.id,
      name: s.name,
    }));
    const healthInsuranceToSend = selectedHealthInsurances.map((h) => ({
      id: h.id,
      name: h.name,
    }));

    const { address, ...rest } = formData;
    const formattedUserName = removeDotsFromDni(formData.userName);
    const addressToSend = {
      ...address,
      id: doctor?.address?.id,
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
      photo: doctor?.photo,
      registeredById: doctor?.registeredById,
    };

    console.log("dataToSend", dataToSend);

    try {
      const doctorCreationPromise = updateDoctorMutation.mutateAsync({
        id: Number(doctor?.userId),
        doctor: dataToSend,
      });

      toast.promise(doctorCreationPromise, {
        loading: "Actualizando médico...",
        success: "Médico actualizado con éxito!",
        error: "Error al actualizar el médico",
      });

      doctorCreationPromise
        .then(() => {
          goBack();
        })
        .catch((error) => {
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
                  onClick={goBack}
                  type="button"
                >
                  <IoMdArrowRoundBack className="text-black mr-2" size={25} />
                  Editar Médico
                </button>
              </CardTitle>
              <CardDescription>
                Completa los campos para editar el médico.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="grid grid-cols-2 gap-6">
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
                              defaultValue={doctor?.firstName}
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
                              defaultValue={doctor?.lastName}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
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
                              defaultValue={doctor?.email}
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
                      name="matricula"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">
                            Matrícula
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Ingresarmatrícula..."
                              defaultValue={doctor?.matricula}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
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
                              defaultValue={formatDni(String(doctor?.dni))}
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
                <div className="grid grid-cols-2 gap-6">
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
                              defaultValue={doctor?.phoneNumber}
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
                              defaultValue={doctor?.phoneNumber2}
                              placeholder="Ingresar teléfono..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
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
                              defaultValue={String(doctor?.bloodType) || ""}
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
                              defaultValue={String(doctor?.rhFactor) || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
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
                              defaultValue={String(doctor?.gender) || ""}
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
                              defaultValue={String(doctor?.maritalStatus) || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="healthInsurances"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">
                            Obra Social
                          </FormLabel>
                          <FormControl>
                            <HealthInsuranceDoctorSelect
                              selected={selectedHealthInsurances}
                              onHealthInsuranceChange={(newSelection) =>
                                setSelectedHealthInsurances(newSelection)
                              }
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
                      name="specialities"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">
                            Especialidades
                          </FormLabel>
                          <FormControl>
                            <SpecialitySelect
                              selected={selectedSpecialities}
                              onSpecialityChange={(newSelection) =>
                                setSelectedSpecialities(newSelection)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="">
                  {/* <div className="space-y-2">
                  <Label htmlFor="affiliationNumber">Número de Obra Social</Label>
                  <Input
                    id="affiliationNumber"
                    placeholder="Ingresar Número de Afiliado"
                    {...register("affiliationNumber", {
                      required: "Este campo es obligatorio",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "El número de afiliado debe contener solo números",
                      },
                    })}
                  />
                </div> */}
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
                              placeholder="Ingresar observaciones..."
                              defaultValue={doctor?.observations || undefined}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
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
                              defaultValue={doctor?.address?.city?.state}
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
                <div className="grid grid-cols-4 gap-6">
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
                              defaultValue={doctor?.address?.street}
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
                              defaultValue={doctor?.address?.number}
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
                              defaultValue={doctor?.address?.description}
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
                              defaultValue={doctor?.address?.phoneNumber}
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
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={goBack}>
                Cancelar
              </Button>
              <Button
                variant="incor"
                type="submit"
                disabled={updateDoctorMutation.isPending}
              >
                Confirmar
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default EditDoctorForm;
