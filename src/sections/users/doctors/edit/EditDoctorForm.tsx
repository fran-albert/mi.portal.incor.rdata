"use client";
import { formatDni } from "@/common/helpers/helpers";
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
import { capitalizeWords } from "@/common/helpers/helpers";
import { CitySelect } from "@/components/Select/City/select";
import { StateSelect } from "@/components/Select/State/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { SpecialitySelect } from "@/components/Select/Specialty/select";
import { City } from "@/modules/city/domain/City";
import { HealthInsurance } from "@/modules/healthInsurance/domain/HealthInsurance";
import { HealthPlans } from "@/modules/healthPlans/domain/HealthPlan";
import { State } from "@/modules/state/domain/State";
import { User } from "@/modules/users/domain/User";
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
import { Doctor } from "@/modules/doctors/domain/Doctor";
import { Speciality } from "@/modules/speciality/domain/Speciality";
import { HealthInsuranceDoctorSelect } from "@/components/Select/Health Insurance/selectDoctor";
import { goBack } from "@/lib/utils";
import { useDoctorStore } from "@/hooks/useDoctors";

interface Inputs extends Doctor {}

function EditDoctorForm({ id }: { id: number }) {
  const { selectedDoctor, getDoctorById, updateDoctor } = useDoctorStore();
  useEffect(() => {
    getDoctorById(id);
  }, [id, getDoctorById]);

  const [selectedState, setSelectedState] = useState<State | undefined>(
    selectedDoctor?.address?.city?.state
  );
  const [selectedCity, setSelectedCity] = useState<City | undefined>(
    selectedDoctor?.address?.city
  );
  const [selectedHealthInsurances, setSelectedHealthInsurances] = useState<
    HealthInsurance[]
  >(selectedDoctor?.healthInsurances || []);
  const [selectedSpecialities, setSelectedSpecialities] = useState<
    Speciality[]
  >(selectedDoctor?.specialities || []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    setValue,
  } = useForm<Inputs>();
  const removeDotsFromDni = (dni: any) => dni.replace(/\./g, "");
  const [startDate, setStartDate] = useState(
    selectedDoctor ? new Date(String(selectedDoctor.birthDate)) : new Date()
  );

  const handleStateChange = (state: State) => {
    setSelectedState(state);
  };

  const handleCityChange = (city: City) => {
    setSelectedCity(city);
  };

  const handleDateChange = (date: Date) => {
    const dateInArgentina = moment(date).tz("America/Argentina/Buenos_Aires");
    const formattedDateISO = dateInArgentina.format();
    setStartDate(date);
    setValue("birthDate", formattedDateISO);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const specialitiesToSend = selectedSpecialities.map((s) => ({
      id: s.id,
      name: s.name,
    }));
    const healthInsuranceToSend = selectedHealthInsurances.map((h) => ({
      id: h.id,
      name: h.name,
    }));

    const { address, ...rest } = data;
    const formattedUserName = removeDotsFromDni(data.userName);
    const addressToSend = {
      ...address,
      id: address.id,
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
      photo: selectedDoctor?.photo,
      registeredById: selectedDoctor?.registeredById,
    };

    try {
      const doctorCreationPromise = updateDoctor(
        dataToSend,
        Number(selectedDoctor?.userId)
      );

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
                  Editar Médico
                </button>
              </CardTitle>
              <CardDescription>
                Completa los campos para editar al médico.
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
                      defaultValue={selectedDoctor?.firstName}
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
                      defaultValue={selectedDoctor?.lastName}
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
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="healthInsurancePlan">
                      Correo Electrónico
                    </Label>
                    <Input
                      id="email"
                      placeholder="Ingresar correo electrónico"
                      defaultValue={selectedDoctor?.email}
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
                  <div className="space-y-2">
                    <Label htmlFor="matricula">Matrícula</Label>
                    <Input
                      id="matricula"
                      placeholder="Ingresar matrícula"
                      defaultValue={selectedDoctor?.matricula}
                      {...register("matricula", {
                        required: "Este campo es obligatorio",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "La matrícula debe contener solo números",
                        },
                      })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="userName">D.N.I.</Label>
                    <Input
                      id="userName"
                      defaultValue={selectedDoctor?.dni}
                      placeholder="Ingresar D.N.I."
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
                      placeholder="Ingresar teléfono"
                      defaultValue={selectedDoctor?.phoneNumber}
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
                    <Label htmlFor="phoneNumber2">Teléfono 2</Label>
                    <Input
                      id="phoneNumber2"
                      placeholder="Ingresar teléfono 2"
                      defaultValue={selectedDoctor?.phoneNumber2}
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
                    <Label htmlFor="blood">Sangre </Label>
                    <BloodSelect
                      control={control}
                      errors={errors}
                      defaultValue={String(selectedDoctor?.bloodType) || ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rhFactor">Factor R.H.</Label>
                    <RHFactorSelect
                      control={control}
                      errors={errors}
                      defaultValue={String(selectedDoctor?.rhFactor) || ""}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Sexo</Label>
                    <GenderSelect
                      control={control}
                      errors={errors}
                      defaultValue={String(selectedDoctor?.gender) || ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maritalStatus">Estado Civil</Label>
                    <MaritalStatusSelect
                      control={control}
                      errors={errors}
                      defaultValue={String(selectedDoctor?.maritalStatus) || ""}
                    />
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
                    <Label htmlFor="state">Observaciones</Label>
                    <Input
                      id="observations"
                      defaultValue={selectedDoctor?.observations}
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
                      defaultValue={selectedDoctor?.address?.city?.state}
                      errors={errors}
                      onStateChange={handleStateChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <CitySelect
                      control={control}
                      errors={errors}
                      defaultValue={selectedDoctor?.address?.city}
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
                      defaultValue={selectedDoctor?.address.street}
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
                      defaultValue={selectedDoctor?.address.number}
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
                      type="number"
                      placeholder="Ingresar piso"
                      defaultValue={selectedDoctor?.address.phoneNumber}
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
                      defaultValue={selectedDoctor?.address.description}
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

export default EditDoctorForm;
