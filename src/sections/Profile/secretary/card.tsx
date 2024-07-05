import { useEffect, useState } from "react";
import { FaCamera, FaPencilAlt } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CitySelect } from "@/components/Select/City/select";
import { StateSelect } from "@/components/Select/State/select";
import { createApiUserRepository } from "@/modules/users/infra/ApiUserRepository";
import { getUser } from "@/modules/users/application/get/getUser";
import { User } from "@/modules/users/domain/User";
import { formatDni } from "@/common/helpers/helpers";
import useRoles from "@/hooks/useRoles";
import { State } from "@/modules/state/domain/State";
import { City } from "@/modules/city/domain/City";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";
import { useForm, SubmitHandler } from "react-hook-form";
import ChangePasswordDialog from "../changePassword/dialog";
import { updateUser } from "@/modules/users/application/update/updateUser";
import { toast } from "sonner";
registerLocale("es", es);
const userRepository = createApiUserRepository();
interface Inputs extends User {}
export default function ProfileSecretaryCardComponent({ id }: { id: number }) {
  const [profile, setProfile] = useState<User | undefined>();
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: profile,
  });
  const { isPatient, isSecretary, isDoctor } = useRoles();
  const [selectedState, setSelectedState] = useState<State | undefined>(
    profile?.address?.city?.state
  );
  const [selectedCity, setSelectedCity] = useState<City | undefined>(
    profile?.address?.city
  );
  const [startDate, setStartDate] = useState(
    profile ? new Date(String(profile.birthDate)) : new Date()
  );

  useEffect(() => {
    const loadUser = getUser(userRepository);

    const fetchUsers = async () => {
      try {
        const userData = await loadUser(id);
        setProfile(userData);
        if (userData?.birthDate) {
          setStartDate(new Date(userData.birthDate));
        }
        setSelectedState(userData?.address?.city?.state);
        setSelectedCity(userData?.address?.city);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [id]);

  useEffect(() => {
    setValue("firstName", profile?.firstName ?? "");
    setValue("lastName", profile?.lastName ?? "");
    setValue("email", profile?.email ?? "");
    setValue("phoneNumber", profile?.phoneNumber ?? "");
    setValue("address.street", profile?.address.street ?? "");
    setValue("address.number", profile?.address.number ?? "");
    setValue("address.description", profile?.address.description ?? "");
    setValue("address.phoneNumber", profile?.address.phoneNumber ?? "");
  }, [profile, setValue]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const addressToSend = {
      ...data.address,
      id: profile?.address.id,
      city: selectedCity,
      state: selectedState,
    };

    const dataToSend: any = {
      ...data,
      userName: profile?.dni,
      address: addressToSend,
      photo: profile?.photo || "default2.png",
    };

    console.log(dataToSend);

    try {
      const updateFn = updateUser(userRepository);
      await updateFn(dataToSend, Number(id));
      toast.success("Datos actualizados con éxito!");
    } catch (error) {
      console.error("Error al actualizar los datos", error);
      toast.error("Error al actualizar los datos");
    }
  };

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

  const handleDateChange = (date: Date) => {
    const dateInArgentina = moment(date).tz("America/Argentina/Buenos_Aires");
    const formattedDateISO = dateInArgentina.format();
    setStartDate(date);
    setValue("birthDate", formattedDateISO);
  };

  return (
    <>
      <div className="flex justify-center w-full px-4 lg:px-0">
        <div className="w-full max-w-full">
          <div className="w-1/2 p-6 mt-10 items-center justify-center border shadow-xl rounded-lg max-w-4xl mx-auto bg-white">
            <div className="my-4">
              <div className="flex items-center justify-center text-black font-bold text-xl">
                <button
                  className="flex items-center justify-start py-2 px-4 w-full"
                  onClick={() => window.history.back()}
                >
                  Mi Perfil
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center text-center py-6">
              <div className="relative mb-3">
                <div className="group rounded-2xl overflow-hidden">
                  {/* {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Profile Picture"
                        className="rounded-2xl"
                        style={{ width: "100px", height: "100px" }}
                      />
                    ) : (
                      <img
                        src={
                          session?.user?.photo
                            ? `https://mirankingtenis.s3.us-east-1.amazonaws.com/storage/avatar/${session.user.photo}.jpeg`
                            : "https://mirankingtenis.s3.us-east-1.amazonaws.com/storage/avatar/default2.png"
                        }
                        alt="Profile Picture"
                        width={100}
                        height={100}
                        className="rounded-2xl"
                      />
                    )} */}

                  <img
                    src={
                      "https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/default.png"
                    }
                    alt="Profile Picture"
                    width={100}
                    height={100}
                    className="rounded-2xl"
                  />
                  {/* <div className="absolute bottom-0 right-0 mb-2 mr-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                      <div
                        className="bg-gray-500 p-2 rounded-full cursor-pointer"
                        onClick={handleEditPictureClick}
                      >
                        <FaPencilAlt className="text-white" />
                      </div>
                    </div> */}
                  {/* <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    /> */}
                </div>
              </div>
              <h3 className="text-xl font-medium">
                {profile?.firstName} {profile?.lastName}
              </h3>
              <p className="text-gray-600">
                {isDoctor
                  ? "Doctor"
                  : isPatient
                  ? "Paciente"
                  : isSecretary
                  ? "Secretaria"
                  : ""}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center rounded-lg">
              <div className="w-full p-4">
                <form onSubmit={handleSubmit(onSubmit)} id="profileForm">
                  <h1 className="text-xl font-semibold mb-4">
                    Datos Personales
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nombre *
                      </Label>
                      <Input
                        {...register("firstName", { required: true })}
                        className="w-full bg-gray-200 border-gray-300 text-gray-800"
                        defaultValue={profile?.firstName}
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="lastname"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Apellido *
                      </Label>
                      <Input
                        {...register("lastName", { required: true })}
                        className="w-full bg-gray-200 border-gray-300 text-gray-800"
                        defaultValue={profile?.lastName}
                      />
                    </div>
                    <div className="md:col-span-1">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="gender">Sexo</Label>
                          <Input className="w-full bg-gray-200 border-gray-300 text-gray-800" />
                        </div>
                        <div>
                          <Label htmlFor="healthCare">
                            Fecha de Nacimiento *
                          </Label>
                          <DatePicker
                            showIcon
                            selected={startDate}
                            className="max-w-full"
                            onChange={handleDateChange}
                            locale="es"
                            customInput={
                              <Input className="w-full bg-gray-200 border-gray-300 text-gray-800" />
                            }
                            dateFormat="d MMMM yyyy"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="dni">D.N.I. *</Label>
                      <Input
                        className="w-full bg-gray-200 border-gray-300 text-gray-800 cursor-not-allowed"
                        defaultValue={
                          profile?.dni ? formatDni(profile?.dni) : ""
                        }
                        readOnly
                      />
                    </div>
                  </div>

                  <h1 className="text-xl font-semibold mb-4">Contacto</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="email">Correo Electrónico *</Label>
                      <Input
                        className="w-full bg-gray-200 border-gray-300 text-gray-800"
                        {...register("email")}
                        defaultValue={profile?.email}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phoneNumber">Teléfono *</Label>
                      <Input
                        {...register("phoneNumber", { required: true })}
                        className="w-full bg-gray-200 border-gray-300 text-gray-800"
                        defaultValue={profile?.phoneNumber}
                      />
                    </div>
                  </div>

                  <h1 className="text-xl font-semibold mt-4 mb-4">Ubicación</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="state">Provincia *</Label>
                      <StateSelect
                        control={control}
                        defaultValue={profile?.address?.city?.state}
                        errors={errors}
                        onStateChange={handleStateChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Ciudad *</Label>
                      <CitySelect
                        control={control}
                        errors={errors}
                        defaultValue={profile?.address?.city}
                        idState={selectedState ? selectedState.id : undefined}
                        onCityChange={handleCityChange}
                      />
                    </div>
                  </div>

                  <h1 className="text-xl font-semibold mb-4">Dirección</h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    <div>
                      <Label htmlFor="street">Calle</Label>
                      <Input
                        {...register("address.street")}
                        className="bg-gray-200"
                        defaultValue={profile?.address.street}
                      />
                    </div>

                    <div>
                      <Label htmlFor="number">Número</Label>
                      <Input
                        {...register("address.number")}
                        className="bg-gray-200"
                        defaultValue={profile?.address.number}
                      />
                    </div>
                    <div>
                      <Label htmlFor="street">Piso</Label>
                      <Input
                        {...register("address.description")}
                        defaultValue={profile?.address.description}
                        className="bg-gray-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="street">Departamento</Label>
                      <Input
                        {...register("address.phoneNumber")}
                        defaultValue={profile?.address.phoneNumber}
                        className="bg-gray-200"
                      />
                    </div>
                  </div>
                </form>
                <div className="flex justify-center items-center gap-4 mt-10">
                  <Button
                    className="w-full sm:w-auto"
                    variant="outline"
                    form="profileForm"
                    type="submit"
                  >
                    Modificar Datos
                  </Button>
                  <ChangePasswordDialog id={id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
