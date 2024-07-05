"use client";
import { formatDni } from "@/common/helpers/helpers";
import { CitySelect } from "@/components/Select/City/select";
import { HealthInsuranceSelect } from "@/components/Select/Health Insurance/select";
import { HealthPlanSelect } from "@/components/Select/HealthPlan/select";
import { StateSelect } from "@/components/Select/State/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { capitalizeWords } from "@/common/helpers/helpers";
import "@/styles/custom.datepicker.css";
import { FaCalendar } from "react-icons/fa6";
import { BloodSelect } from "@/components/Select/Blood/select";
import { RHFactorSelect } from "@/components/Select/RHFactor/select";
import { GenderSelect } from "@/components/Select/Gender/select";
import { MaritalStatusSelect } from "@/components/Select/MaritalStatus/select";
import { goBack } from "@/lib/utils";
import { City } from "@/modules/city/domain/City";
import { HealthInsurance } from "@/modules/healthInsurance/domain/HealthInsurance";
import { HealthPlans } from "@/modules/healthPlans/domain/HealthPlan";
import { getPatient } from "@/modules/patients/application/get/getPatient";
import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import { State } from "@/modules/state/domain/State";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { updatePatient } from "@/modules/patients/application/update/updatePatient";
import { toast } from "sonner";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";
import { Patient } from "@/modules/patients/domain/Patient";
import { usePatient } from "@/hooks/usePatients";
import Loading from "@/components/Loading/loading";
registerLocale("es", es);
interface Inputs extends Patient {}

function EditPatientForm({ id }: { id: number }) {
  const { selectedPatient, getPatientById, isLoading, updatePatient } =
    usePatient();
  useEffect(() => {
    getPatientById(id);
  }, [id, getPatientById]);

  const [selectedState, setSelectedState] = useState<State | undefined>(
    selectedPatient?.address?.city?.state
  );
  const [selectedCity, setSelectedCity] = useState<City | undefined>(
    selectedPatient?.address?.city
  );
  const [selectedHealthInsurance, setSelectedHealthInsurance] = useState<
    HealthInsurance | undefined
  >(selectedPatient?.healthPlans?.[0]?.healthInsurance);
  const [selectedPlan, setSelectedPlan] = useState<any | null>(
    selectedPatient?.healthPlans?.[0]
  );
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const removeDotsFromDni = (dni: any) => dni.replace(/\./g, "");
  const [startDate, setStartDate] = useState<Date>(
    new Date(selectedPatient?.birthDate ?? new Date())
  );

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
    if (selectedPatient) {
      if (selectedCity) {
        setValue("address.city", selectedCity, { shouldValidate: true });
      }
      setValue("healthPlans", selectedPlan ? [selectedPlan] : []);
    }
  }, [selectedPatient, selectedCity, selectedPlan, setValue]);

  const handleHealthInsuranceChange = (healthInsurance: HealthInsurance) => {
    setSelectedHealthInsurance(healthInsurance);
  };

  const handlePlanChange = (plan: HealthPlans | null) => {
    setSelectedPlan(plan ? plan : null);
  };

  const handleDateChange = (date: Date) => {
    const dateInArgentina = moment(date).tz("America/Argentina/Buenos_Aires");
    const formattedDateISO = dateInArgentina.format();
    setStartDate(date);
    setValue("birthDate", formattedDateISO);
  };

  useEffect(() => {
    if (selectedPatient) {
      const patientBirthDate = new Date(
        selectedPatient?.birthDate ?? new Date()
      );
      setStartDate(patientBirthDate);

      const dateInArgentina = moment(patientBirthDate).tz(
        "America/Argentina/Buenos_Aires"
      );
      const formattedDateISO = dateInArgentina.format();
      setValue("birthDate", formattedDateISO);
    }
  }, [selectedPatient, setValue]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { address, ...rest } = data;
    const formattedUserName = removeDotsFromDni(data.userName);
    const addressToSend = {
      ...address,
      id: selectedPatient?.address.id,
      city: {
        ...selectedCity,
        state: selectedState,
      },
    };
    const dataToSend: any = {
      ...rest,
      userName: formattedUserName,
      address: addressToSend,
      healthPlans: selectedPlan
        ? [
            {
              id: selectedPlan.id,
              name: selectedPlan.name,
              healthInsurance: {
                id: selectedHealthInsurance?.id || 0,
                name: selectedHealthInsurance?.name || "",
              },
            },
          ]
        : [],
      photo: selectedPatient?.photo,
      registeredById: selectedPatient?.registeredById,
    };

    console.log("Data to send", dataToSend);

    try {
      const patientCreationPromise = updatePatient(
        Number(selectedPatient?.userId),
        dataToSend
      );

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

  if (isLoading) {
    return <Loading isLoading={true} />;
  }

  return (
    <>
      <div key="1" className="w-full">
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <div className="grid grid-cols-2 gap-6">
                {/* <div className="col-span-2 flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  alt="Patient Avatar"
                  src="/placeholder-avatar.jpg"
                />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <Button variant="outline">Upload Photo</Button>
            </div> */}
                {/* <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                
              </div> */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input
                      id="firstName"
                      placeholder="Ingresar nombre"
                      defaultValue={selectedPatient?.firstName}
                      {...register("firstName", {
                        required: "Este campo es obligatorio",
                        minLength: {
                          value: 2,
                          message: "El nombre debe tener al menos 2 caracteres",
                        },
                        onChange: (e) => {
                          const capitalized = capitalizeWords(e.target.value);
                          setValue("firstName", capitalized, {
                            shouldValidate: true,
                          });
                        },
                      })}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs italic">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input
                      id="lastName"
                      placeholder="Ingresar apellido"
                      defaultValue={selectedPatient?.lastName}
                      {...register("lastName", {
                        required: "Este campo es obligatorio",
                        minLength: {
                          value: 2,
                          message:
                            "El apellido debe tener al menos 2 caracteres",
                        },
                        onChange: (e) => {
                          const capitalized = capitalizeWords(e.target.value);
                          setValue("lastName", capitalized, {
                            shouldValidate: true,
                          });
                        },
                      })}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs italic">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="healthInsurancePlan">
                      Correo Electrónico
                    </Label>
                    <Input
                      id="email"
                      placeholder="Ingresar correo electrónico"
                      defaultValue={selectedPatient?.email}
                      {...register("email", {
                        required: "Este campo es obligatorio",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                          message: "Introduce un correo electrónico válido",
                        },
                      })}
                      type="email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs italic">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">D.N.I.</Label>
                    <Input
                      id="username"
                      placeholder="Ingresar D.N.I."
                      defaultValue={selectedPatient?.dni}
                      {...register("userName", {
                        required: "Este campo es obligatorio",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "El D.N.I. debe contener solo números",
                        },
                      })}
                    />
                    {errors.userName && (
                      <p className="text-red-500 text-xs italic">
                        {errors.userName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Fecha de Nacimiento</Label>
                    <DatePicker
                      showIcon
                      selected={startDate}
                      onChange={handleDateChange}
                      locale="es"
                      className="max-w-full"
                      icon={<FaCalendar color="#0f766e" />}
                      customInput={<Input className="input-custom-style" />}
                      dateFormat="d MMMM yyyy"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Teléfono</Label>
                    <Input
                      id="phoneNumber"
                      defaultValue={selectedPatient?.phoneNumber}
                      placeholder="Ingresar teléfono"
                      {...register("phoneNumber", {
                        required: "Este campo es obligatorio",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "El Teléfono debe contener solo números",
                        },
                      })}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-xs italic">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono 2</Label>
                    <Input
                      id="phone"
                      placeholder="Ingresar teléfono 2"
                      defaultValue={selectedPatient?.phoneNumber2}
                      type="tel"
                      {...register("phoneNumber2", {
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "El teléfono debe contener solo números",
                        },
                      })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="bloodType">Sangre </Label>
                    <BloodSelect
                      control={control}
                      errors={errors}
                      defaultValue={String(selectedPatient?.bloodType) || ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rhFactor">Factor R.H.</Label>
                    <RHFactorSelect
                      control={control}
                      errors={errors}
                      defaultValue={String(selectedPatient?.rhFactor) || ""}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Sexo</Label>
                    <GenderSelect
                      control={control}
                      errors={errors}
                      defaultValue={String(selectedPatient?.gender) || ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maritalStatus">Estado Civil</Label>
                    <MaritalStatusSelect
                      control={control}
                      errors={errors}
                      defaultValue={
                        String(selectedPatient?.maritalStatus) || ""
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="healthCareProvider">Obra Social</Label>
                    <HealthInsuranceSelect
                      onHealthInsuranceChange={handleHealthInsuranceChange}
                      selected={selectedHealthInsurance}
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
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="affiliationNumber">
                      Número de Obra Social
                    </Label>
                    <Input
                      id="affiliationNumber"
                      placeholder="Ingresar N° de Obra Social"
                      {...register("affiliationNumber", {
                        // required: "Este campo es obligatorio",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Este campo debe contener solo números",
                        },
                      })}
                    />
                    {errors.affiliationNumber && (
                      <p className="text-red-500 text-xs italic">
                        {errors.affiliationNumber.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="observations">Observaciones</Label>
                    <Input
                      id="observations"
                      placeholder="Ingresar observaciones"
                      {...register("observations")}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="state">Provincia</Label>
                    <StateSelect
                      control={control}
                      defaultValue={selectedPatient?.address?.city?.state}
                      errors={errors}
                      onStateChange={handleStateChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <CitySelect
                      control={control}
                      errors={errors}
                      defaultValue={selectedPatient?.address?.city}
                      idState={selectedState ? selectedState.id : undefined}
                      onCityChange={handleCityChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="street">Calle</Label>
                    <Input
                      id="street"
                      placeholder="Ingresar calle"
                      defaultValue={selectedPatient?.address.street}
                      {...register("address.street", {
                        onChange: (e) => {
                          const capitalized = capitalizeWords(e.target.value);
                          setValue("address.street", capitalized, {
                            shouldValidate: true,
                          });
                        },
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="number">N°</Label>
                    <Input
                      id="number"
                      type="number"
                      defaultValue={selectedPatient?.address.number}
                      placeholder="Ingresar número"
                      {...register("address.number", {
                        onChange: (e) => {
                          const capitalized = capitalizeWords(e.target.value);
                          setValue("address.number", capitalized, {
                            shouldValidate: true,
                          });
                        },
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="floor">Piso</Label>
                    <Input
                      id="floor"
                      defaultValue={selectedPatient?.address.description}
                      type="number"
                      placeholder="Ingresar piso"
                      {...register("address.description", {
                        onChange: (e) => {
                          const capitalized = capitalizeWords(e.target.value);
                          setValue("address.description", capitalized, {
                            shouldValidate: true,
                          });
                        },
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Departamento</Label>
                    <Input
                      id="department"
                      placeholder="Ingresar departamento"
                      defaultValue={selectedPatient?.address.phoneNumber}
                      {...register("address.phoneNumber", {
                        onChange: (e) => {
                          const capitalized = capitalizeWords(e.target.value);
                          setValue("address.phoneNumber", capitalized, {
                            shouldValidate: true,
                          });
                        },
                      })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={goBack}>
                Cancelar
              </Button>
              <Button variant="teal" type="submit">
                Confirmar
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}

export default EditPatientForm;
