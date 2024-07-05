import { useEffect, useState } from "react";
import { FaCamera, FaPencilAlt } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { goBack } from "@/lib/utils";
import { capitalizeWords } from "@/common/helpers/helpers";
import { FaCalendar } from "react-icons/fa6";
import { BloodSelect } from "@/components/Select/Blood/select";
import { RHFactorSelect } from "@/components/Select/RHFactor/select";
import { GenderSelect } from "@/components/Select/Gender/select";
import { MaritalStatusSelect } from "@/components/Select/MaritalStatus/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CitySelect } from "@/components/Select/City/select";
import { StateSelect } from "@/components/Select/State/select";
import { HealthInsuranceSelect } from "@/components/Select/Health Insurance/select";
import { createApiUserRepository } from "@/modules/users/infra/ApiUserRepository";
import { HealthInsurance } from "@/modules/healthInsurance/domain/HealthInsurance";
import { HealthPlans } from "@/modules/healthPlans/domain/HealthPlan";
import { getUser } from "@/modules/users/application/get/getUser";
import { User } from "@/modules/users/domain/User";
import { formatDni } from "@/common/helpers/helpers";
import useRoles from "@/hooks/useRoles";
import { Patient } from "@/modules/patients/domain/Patient";
import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import { getPatient } from "@/modules/patients/application/get/getPatient";
import { State } from "@/modules/state/domain/State";
import { City } from "@/modules/city/domain/City";
import { HealthPlanSelect } from "@/components/Select/HealthPlan/select";
import Loading from "@/components/Loading/loading";
import ChangePasswordDialog from "../changePassword/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";
import { toast } from "sonner";
import { updatePatient } from "@/modules/patients/application/update/updatePatient";
import { IoMdArrowRoundBack } from "react-icons/io";
import { usePatient } from "@/hooks/usePatients";
registerLocale("es", es);
interface Inputs extends Patient {}
const userRepository = createApiPatientRepository();

export default function ProfileCardComponent({ id }: { id: number }) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const { selectedPatient, getPatientById, isLoading, updatePatient } =
    usePatient();

  useEffect(() => {
    getPatientById(id);
  }, [id, getPatientById]);
  const [selectedHealthInsurance, setSelectedHealthInsurance] = useState<
    HealthInsurance | undefined
  >();
  const [selectedPlan, setSelectedPlan] = useState<HealthPlans | undefined>();
  const [selectedState, setSelectedState] = useState<State | undefined>(
    selectedPatient?.address?.city?.state
  );
  const [selectedCity, setSelectedCity] = useState<City | undefined>(
    selectedPatient?.address?.city
  );
  const [startDate, setStartDate] = useState(
    selectedPatient ? new Date(String(selectedPatient.birthDate)) : new Date()
  );
  const removeDotsFromDni = (dni: any) => dni.replace(/\./g, "");
  const handleStateChange = (state: State) => {
    setSelectedState(state);
  };

  const handleCityChange = (city: City) => {
    setSelectedCity(city);
  };

  const handleHealthInsuranceChange = (healthInsurance: HealthInsurance) => {
    setSelectedHealthInsurance(healthInsurance);
  };

  const handleHealthPlanChange = (healthPlan: HealthPlans) => {
    setSelectedPlan(healthPlan);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // const healthPlansToSend = selectedPlan.map((plan) => ({
    //   id: plan.id,
    //   name: plan.name,
    //   healthInsurance: {
    //     id: plan.healthInsurance.id,
    //     name: plan.healthInsurance.name,
    //   },
    // }));
    const formattedUserName = removeDotsFromDni(data.userName);
    const { address, ...rest } = data;
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
      healthPlans: selectedPlan ? [selectedPlan] : selectedPatient?.healthPlans,
      photo: selectedPatient?.photo,
      registeredById: selectedPatient?.registeredById,
    };

    try {
      const patientCreationPromise = updatePatient(Number(id), dataToSend);
      toast.promise(patientCreationPromise, {
        loading: "Actualizando datos...",
        success: "Datos actualizados con éxito!",
        error: "Error al actualizar los datos",
      });

      patientCreationPromise.catch((error) => {
        console.error("Error al actualizar los datos", error);
      });
    } catch (error) {
      console.error("Error al actualizar los datos", error);
    }
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

  if (isLoading) {
    return <Loading isLoading />;
  }

  return (
    <>
      <div key="1" className="w-full">
        <Card>
          <form onSubmit={handleSubmit(onSubmit)} id="profileForm">
            <CardHeader>
              <CardTitle>
                <h1 className="flex items-center justify-start w-full">
                  Mi Perfil
                </h1>
              </CardTitle>
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
                  <Button variant="outline" type="button">
                    Upload Photo
                  </Button>
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
                        // required: "Este campo es obligatorio",
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
                    <Label htmlFor="userName">D.N.I.</Label>
                    <Input
                      id="userName"
                      className="w-full cursor-not-allowed"
                      readOnly
                      defaultValue={
                        selectedPatient?.dni
                          ? formatDni(selectedPatient?.dni)
                          : ""
                      }
                      placeholder="Ingresar D.N.I."
                      {...register("userName")}
                    />
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
                    <Label htmlFor="phoneNumber2">Teléfono 2</Label>
                    <Input
                      id="phoneNumber2"
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
                <div className="">
                  <div className="space-y-2">
                    <Label htmlFor="healthCareProvider">Obra Social</Label>
                    <Input
                      className="w-full text-gray-800 cursor-not-allowed"
                      value={selectedPatient?.healthPlans?.map(
                        (plan) => plan.name
                      )}
                      readOnly
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
                      className="w-full text-gray-800 cursor-not-allowed"
                      defaultValue={selectedPatient?.affiliationNumber}
                      placeholder="Ingresar Número de Afiliado"
                      readOnly
                      // {...register("affiliationNumber", {
                      //   required: "Este campo es obligatorio",
                      //   pattern: {
                      //     value: /^[0-9]+$/,
                      //     message:
                      //       "El número de afiliado debe contener solo números",
                      //   },
                      // })}
                    />
                    {/* {errors.affiliationNumber && (
                      <p className="text-red-500 text-xs italic">
                        {errors.affiliationNumber.message}
                      </p>
                    )} */}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Observaciones</Label>
                    <Input
                      id="observations"
                      defaultValue={selectedPatient?.observations}
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
              <ChangePasswordDialog id={id} />
              <Button
                className="w-full sm:w-auto"
                variant="teal"
                form="profileForm"
                type="submit"
              >
                Modificar Datos
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
