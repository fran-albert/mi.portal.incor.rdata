"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { BloodSelect } from "@/components/Select/Blood/select";
import { RHFactorSelect } from "@/components/Select/RHFactor/select";
import { GenderSelect } from "@/components/Select/Gender/select";
import { MaritalStatusSelect } from "@/components/Select/MaritalStatus/select";
import { CitySelect } from "@/components/Select/City/select";
import { StateSelect } from "@/components/Select/State/select";
import { Button } from "@/components/ui/button";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { es } from "date-fns/locale/es";
registerLocale("es", es);
import { FaCalendar } from "react-icons/fa6";
import moment from "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";
import { Label } from "@/components/ui/label";
import { goBack } from "@/lib/utils";
import { Doctor } from "@/types/Doctor/Doctor";
import { HealthInsurance } from "@/types/Health-Insurance/Health-Insurance";
import { Speciality } from "@/types/Speciality/Speciality";
import { State } from "@/types/State/State";
import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "sonner";
import { useCustomSession } from "@/context/SessionAuthProviders";
import { HealthInsuranceDoctorSelect } from "@/components/Select/HealthInsurace/Doctor/select";
import { SpecialitySelect } from "@/components/Select/Speciality/select";
import { DoctorSchema } from "@/validators/doctor.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { City } from "@/types/City/City";
import { handleDateChange } from "@/common/helpers/helpers";
import { useDoctorMutations } from "@/hooks/Doctor/useDoctorMutation";

type FormValues = z.infer<typeof DoctorSchema>;

function CreateDoctorForm() {
  const { addDoctorMutation } = useDoctorMutations();
  const form = useForm<FormValues>({
    resolver: zodResolver(DoctorSchema),
  });
  const {
    setValue,
    control,
    formState: { errors },
  } = form;
  const [selectedState, setSelectedState] = useState<State | undefined>(
    undefined
  );
  const [selectedSpecialities, setSelectedSpecialities] = useState<
    Speciality[]
  >([]);
  const [selectedHealthInsurances, setSelectedHealthInsurances] = useState<
    HealthInsurance[]
  >([]);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined);
  const { session } = useCustomSession();
  const idSession = session?.user?.id;

  const handleCityChange = (city: City) => {
    if (selectedState) {
      const cityWithState = { ...city, state: selectedState };
      setSelectedCity(cityWithState);
      setValue("address.city", cityWithState);
    }
  };

  const handleStateChange = (state: State) => {
    setSelectedState(state);
    setValue("address.city.state", state);
  };

  async function onSubmit(values: z.infer<typeof DoctorSchema>) {
    const dateInArgentina = moment(values.birthDate).tz(
      "America/Argentina/Buenos_Aires"
    );

    const payload: any = {
      ...values,
      specialities: selectedSpecialities.map((speciality) => ({
        id: speciality.id,
        name: speciality.name,
      })),
      healthInsurances: selectedHealthInsurances.map((insurance) => ({
        id: insurance.id,
        name: insurance.name,
      })),
      address: {
        ...values.address,
        city: selectedCity,
        id: values.address.id,
      },
      photo: "",
      birthDate: dateInArgentina.format(),
      registeredById: Number(idSession),
    };

    try {
      const doctorCreationPromise = addDoctorMutation.mutateAsync(payload);
      toast.promise(doctorCreationPromise, {
        loading: "Creando médico...",
        success: "Médico creado con éxito!",
        error: "Error al crear el Médico",
      });

      doctorCreationPromise
        .then(() => {
          goBack();
        })
        .catch((error) => {
          console.error("Error al crear el médico", error);
        });
    } catch (error) {
      console.error("Error al crear el doctor", error);
    }
  }

  return (
    <div key="1" className="container mt-2">
      <Card>
        <CardHeader>
          <CardTitle>
            <button
              className="flex items-center justify-start w-full"
              onClick={goBack}
              type="button"
            >
              <IoMdArrowRoundBack className="text-black mr-2" size={25} />
              Agregar Médico
            </button>
          </CardTitle>
          <CardDescription>
            Completa los campos para agregar un nuevo médico.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                              placeholder="Ingresar matrícula..."
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
                            <Input {...field} placeholder="Ingresar D.N.I..." />
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
                    <Label htmlFor="blood">Sangre </Label>
                    <BloodSelect control={control} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rhFactor">Factor R.H.</Label>
                    <RHFactorSelect control={control} />
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
                            <GenderSelect control={control} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maritalStatus">Estado Civil</Label>
                    <MaritalStatusSelect control={control} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="healthCareProvider">Obra Social</Label>
                    <HealthInsuranceDoctorSelect
                      selected={selectedHealthInsurances}
                      onHealthInsuranceChange={(newSelection) =>
                        setSelectedHealthInsurances(newSelection)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="healthInsurancePlan">Especialidades</Label>
                    <SpecialitySelect
                      selected={selectedSpecialities}
                      onSpecialityChange={(newSelection) =>
                        setSelectedSpecialities(newSelection)
                      }
                    />
                  </div>
                </div>
                <div className="">
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
                              placeholder="Ingresar observaciones"
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
                      name="address.city.state.name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">
                            Provincia
                          </FormLabel>
                          <FormControl>
                            <StateSelect
                              control={control}
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
                      name="address.city.name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">Ciudad</FormLabel>
                          <FormControl>
                            <CitySelect
                              control={control}
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
                            <Input {...field} placeholder="Ingresar calle" />
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
                            <Input {...field} placeholder="Ingresar número" />
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
                            <Input {...field} placeholder="Ingresar número" />
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
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={goBack}>
                  Cancelar
                </Button>
                <Button variant="incor" type="submit"disabled={addDoctorMutation.isPending}>
                  Confirmar
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateDoctorForm;
