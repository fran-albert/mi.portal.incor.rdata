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
import { FaCamera, FaPencilAlt } from "react-icons/fa";
import { capitalizeWords } from "@/common/helpers/helpers";
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
import { HealthInsuranceSelect } from "@/components/Select/Health Insurance/select";
import { createApiUserRepository } from "@/modules/users/infra/ApiUserRepository";
import { getUser } from "@/modules/users/application/get/getUser";
import { User } from "@/modules/users/domain/User";
import moment from "moment-timezone";
import { formatDate, formatDni } from "@/common/helpers/helpers";
import { useDoctorStore } from "@/hooks/useDoctors";
import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import { getPatient } from "@/modules/patients/application/get/getPatient";
import { State } from "@/modules/state/domain/State";
import { City } from "@/modules/city/domain/City";
import { Doctor } from "@/modules/doctors/domain/Doctor";
import { createApiDoctorRepository } from "@/modules/doctors/infra/ApiDoctorRepository";
import { getDoctor } from "@/modules/doctors/application/get/getDoctor";
import { useForm, SubmitHandler } from "react-hook-form";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import { toast } from "sonner";
import "react-datepicker/dist/react-datepicker.css";
import Loading from "@/components/Loading/loading";
import { HealthInsurance } from "@/modules/healthInsurance/domain/HealthInsurance";
import { HealthInsuranceDoctorSelect } from "@/components/Select/Health Insurance/selectDoctor";
import { SpecialitySelect } from "@/components/Select/Specialty/select";
import { Speciality } from "@/modules/speciality/domain/Speciality";
import ChangePasswordDialog from "../changePassword/dialog";
interface Inputs extends Doctor {}

export default function ProfileDoctorCardComponent({ id }: { id: number }) {
  const { selectedDoctor, getDoctorById, updateDoctor, isLoading } =
    useDoctorStore();
  useEffect(() => {
    getDoctorById(id);
  }, [id, getDoctorById]);

  const [selectedState, setSelectedState] = useState<State | undefined>(
    selectedDoctor?.address?.city?.state
  );
  const [selectedCity, setSelectedCity] = useState<City | undefined>(
    selectedDoctor?.address?.city
  );
  const [startDate, setStartDate] = useState<Date>(
    new Date(selectedDoctor?.birthDate ?? new Date())
  );

  const removeDotsFromDni = (dni: any) => dni.replace(/\./g, "");
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const [selectedHealthInsurances, setSelectedHealthInsurances] = useState<
    HealthInsurance[]
  >(selectedDoctor?.healthInsurances || []);
  const [selectedSpecialities, setSelectedSpecialities] = useState<
    Speciality[]
  >(selectedDoctor?.specialities || []);
  const handleStateChange = (state: State) => {
    setSelectedState(state);
  };

  const handleCityChange = (city: City) => {
    setSelectedCity(city);
  };
  const [openModal, setOpenModal] = useState<boolean>(false);

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
      id: selectedDoctor?.address.id,
      city: {
        ...selectedCity,
        state: selectedState,
      },
    };
    const dataToSend: any = {
      ...rest,
      userName: formattedUserName,
      address: addressToSend,
      // healthPlans: selectedPlan ? [selectedPlan] : profile?.healthPlans,
      photo: "",
    };

    console.log("Data to send", dataToSend);

    try {
      const patientRepository = createApiPatientRepository();
      // const updatePatientFn = updatePatient(patientRepository);
      // const patientCreationPromise = updatePatientFn(Number(id), dataToSend);

      // toast.promise(patientCreationPromise, {
      //   loading: "Actualizando datos...",
      //   success: "Datos actualizados con éxito!",
      //   error: "Error al actualizar los datos",
      // });

      // patientCreationPromise.catch((error) => {
      //   console.error("Error al actualizar los datos", error);
      // });
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
  if (isLoading) {
    return <Loading isLoading />;
  }

  return (
    <>
      <div key="1" className="w-full">
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                      defaultValue={selectedDoctor?.lastName}
                      placeholder="Ingresar apellido"
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
                      defaultValue={selectedDoctor?.email}
                      placeholder="Ingresar correo electrónico"
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
                  <div className="space-y-2">
                    <Label htmlFor="matricula">Matrícula</Label>
                    <Input
                      id="matricula"
                      placeholder="Ingresar matrícula"
                      readOnly
                      className="cursor-not-allowed"
                      defaultValue={formatDni(
                        String(selectedDoctor?.matricula)
                      )}
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
                      className="w-full cursor-not-allowed"
                      readOnly
                      defaultValue={
                        selectedDoctor?.dni
                          ? formatDni(selectedDoctor?.dni)
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
                    <Label htmlFor="healtInsurance">Obra Sociales</Label>
                    {/* <HealthInsuranceDoctorSelect
                      selected={selectedHealthInsurances}
                      onHealthInsuranceChange={(newSelection) =>
                        setSelectedHealthInsurances(newSelection)
                      }
                    /> */}
                    <p className="text-sm font-medium">
                      {selectedDoctor?.healthInsurances
                        .map(
                          (item) =>
                            item.name.charAt(0).toUpperCase() +
                            item.name.slice(1).toLowerCase()
                        )
                        .join(", ")}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="healthInsurancePlan">Especialidades</Label>
                    {/* <SpecialitySelect
                      selected={selectedSpecialities}
                      onSpecialityChange={(newSelection) =>
                        setSelectedSpecialities(newSelection)
                      }
                    /> */}
                    <p className="text-sm font-medium">
                      {selectedDoctor?.specialities
                        .map((speciality) => speciality.name)
                        .join(", ")}
                    </p>
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
              <Button variant="teal" type="submit" className="w-full sm:w-auto">
                Modificar Datos
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
