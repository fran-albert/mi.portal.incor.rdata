"use client";
import { formatDni, handleDateChange } from "@/common/helpers/helpers";
import { CitySelect } from "@/components/Select/City/select";
import { HealthPlanSelect } from "@/components/Select/HealthPlan/select";
import { StateSelect } from "@/components/Select/State/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { BloodSelect } from "@/components/Select/Blood/select";
import { RHFactorSelect } from "@/components/Select/RHFactor/select";
import { GenderSelect } from "@/components/Select/Gender/select";
import { MaritalStatusSelect } from "@/components/Select/MaritalStatus/select";
import { goBack } from "@/lib/utils";
import { City } from "@/modules/city/domain/City";
import { HealthInsurance } from "@/modules/healthInsurance/domain/HealthInsurance";
import { HealthPlans } from "@/modules/healthPlans/domain/HealthPlan";
import { State } from "@/modules/state/domain/State";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "sonner";
import { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";
import { usePatient } from "@/hooks/usePatients";
import { HealthInsuranceSelect } from "@/components/Select/HealthInsurace/select";
import Loading from "@/app/loading";
import { z } from "zod";
import { PatientSchema } from "@/validators/patient.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Patient } from "@/modules/patients/domain/Patient";
import { usePatientStore } from "@/stores/Patient/patient.store";
import { usePatientMutations } from "@/hooks/Patient/usePatientMutation";
registerLocale("es", es);
type FormValues = z.infer<typeof PatientSchema>;

function EditPatientForm({ patient }: { patient: Patient }) {
  const updatePatientToStore = usePatientStore((state) => state.updatePatient);
  const { updatePatientMutation } = usePatientMutations();
  const form = useForm<FormValues>({
    resolver: zodResolver(PatientSchema),
  });
  const {
    setValue,
    control,
    formState: { errors },
  } = form;

  const [selectedState, setSelectedState] = useState<State | undefined>(
    patient?.address?.city?.state
  );
  const [selectedCity, setSelectedCity] = useState<City | undefined>(
    patient?.address?.city
  );
  const [selectedHealthInsurance, setSelectedHealthInsurance] = useState<
    HealthInsurance | undefined
  >(patient?.healthPlans?.[0]?.healthInsurance);
  const [selectedPlan, setSelectedPlan] = useState<any | null>(
    patient?.healthPlans?.[0]
  );
  const [startDate, setStartDate] = useState<Date | undefined>(() =>
    patient?.birthDate ? new Date(patient.birthDate.toString()) : undefined
  );
  const removeDotsFromDni = (dni: any) => dni.replace(/\./g, "");

  const handleStateChange = (state: State) => {
    setSelectedState(state);
  };

  const handleCityChange = (city: City) => {
    if (selectedState) {
      const cityWithState = { ...city, state: selectedState };
      setSelectedCity(cityWithState);
      setValue("address.city", cityWithState, { shouldValidate: true });
    }
  };
  useEffect(() => {
    if (patient) {
      if (selectedCity) {
        setValue("address.city", selectedCity, { shouldValidate: true });
      }
      setValue("healthPlans", selectedPlan ? [selectedPlan] : []);
    }
  }, [patient, selectedCity, selectedPlan, setValue]);

  const handleHealthInsuranceChange = (healthInsurance: HealthInsurance) => {
    setSelectedHealthInsurance(healthInsurance);
  };
  useEffect(() => {
    if (patient) {
      setValue("firstName", patient.firstName);
      setValue("lastName", patient.lastName);
      setValue("email", patient.email);
      setValue("userName", formatDni(String(patient.dni)));
      if (patient?.birthDate) {
        setStartDate(new Date(patient.birthDate.toString()));
        setValue("birthDate", patient.birthDate.toString());
      }
      setValue("phoneNumber", patient.phoneNumber);
      setValue("phoneNumber2", patient.phoneNumber2 || "");
      setValue("bloodType", String(patient.bloodType) || "");
      setValue("rhFactor", String(patient.rhFactor) || "");
      setValue("gender", String(patient.gender) || "");
      setValue("maritalStatus", String(patient.maritalStatus) || "");
      setValue("observations", patient.observations || "");
      setValue("address.street", patient.address.street || "");
      setValue("address.number", patient.address.number || "");
      setValue("address.description", patient.address.description || "");
      setValue("address.phoneNumber", patient.address.phoneNumber || "");
    }
  }, [patient, setValue]);

  const handlePlanChange = (plan: HealthPlans | null) => {
    setSelectedPlan(plan ? plan : null);
  };

  const onSubmit: SubmitHandler<any> = async (formData) => {
    const formattedUserName = removeDotsFromDni(formData.userName);
    const { address, ...rest } = formData;
    const addressToSend = {
      ...address,
      id: patient?.address?.id,
      city: {
        ...selectedCity,
        state: selectedState,
      },
    };
    const healthPlansToSend = patient?.healthPlans?.map((plan) => ({
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
      photo: patient.photo,
      registeredById: patient.registeredById,
      healthPlans: healthPlansToSend,
    };
    try {
      const patientCreationPromise = updatePatientMutation.mutateAsync({
        id: Number(patient?.userId),
        patient: dataToSend,
      });

      toast.promise(patientCreationPromise, {
        loading: "Actualizando datos del paciente...",
        success: "Paciente actualizado con éxito!",
        error: "Error al actualizar el Paciente",
      });

      patientCreationPromise
        .then(() => {
          goBack();
        })
        .catch((error) => {
          console.error("Error al actualizar el paciente", error);
        });
    } catch (error) {
      console.error("Error al actualizar el paciente", error);
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
                  Editar Paciente
                </button>
              </CardTitle>
              <CardDescription>
                Completa los campos para editar el paciente.
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
                              defaultValue={patient?.lastName}
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
                              defaultValue={patient?.email}
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
                              defaultValue={formatDni(String(patient?.dni))}
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
                          <FormLabel className="text-black">Teléfono</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Ingresar teléfono..."
                              defaultValue={patient?.phoneNumber}
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
                              defaultValue={patient?.phoneNumber2}
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
                              defaultValue={String(patient?.bloodType) || ""}
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
                              defaultValue={String(patient?.rhFactor) || ""}
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
                              defaultValue={String(patient?.gender) || ""}
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
                              defaultValue={
                                String(patient?.maritalStatus) || ""
                              }
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
                      name="healthPlans"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">
                            Obra Social
                          </FormLabel>
                          <FormControl>
                            <HealthInsuranceSelect
                              onHealthInsuranceChange={
                                handleHealthInsuranceChange
                              }
                              selected={selectedHealthInsurance}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="healthInsurancePlan">Plan</Label>
                    <HealthPlanSelect
                      idHealthInsurance={Number(selectedHealthInsurance?.id)}
                      selected={selectedHealthInsurance}
                      onPlanChange={handlePlanChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="affiliationNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">
                            Número de Obra Social
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              defaultValue={patient?.affiliationNumber}
                              placeholder="Ingresar número de obra social..."
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
                            Observaciones
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Ingresar observaciones..."
                              defaultValue={patient?.observations || undefined}
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
                              defaultValue={patient?.address?.city?.state}
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
                              idState={
                                selectedState ? selectedState.id : undefined
                              }
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
                              defaultValue={patient?.address?.street}
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
                              defaultValue={patient?.address?.number}
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
                              defaultValue={patient?.address?.description}
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
                              defaultValue={patient?.address?.phoneNumber}
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
              <Button variant="incor" type="submit">
                Confirmar
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default EditPatientForm;
