import { useEffect, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CitySelect } from "@/components/Select/City/select";
import { StateSelect } from "@/components/Select/State/select";
import { createApiUserRepository } from "@/modules/users/infra/ApiUserRepository";
import { User } from "@/modules/users/domain/User";
import { formatDni, handleDateChange } from "@/common/helpers/helpers";
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
import { PatientSchema } from "@/validators/patient.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoMdArrowRoundBack } from "react-icons/io";
import { goBack } from "@/lib/utils";
import { MaritalStatusSelect } from "@/components/Select/MaritalStatus/select";
import { GenderSelect } from "@/components/Select/Gender/select";
import { RHFactorSelect } from "@/components/Select/RHFactor/select";
import { BloodSelect } from "@/components/Select/Blood/select";
import { z } from "zod";
import { FaEdit, FaUserEdit } from "react-icons/fa";
import { Patient } from "@/modules/patients/domain/Patient";
registerLocale("es", es);
type FormValues = z.infer<typeof PatientSchema>;
export default function userSecretaryCardComponent({ user }: { user: User }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(PatientSchema),
  });
  const {
    setValue,
    control,
    formState: { errors },
  } = form;

  const { isPatient, isSecretary, isDoctor } = useRoles();
  const [selectedState, setSelectedState] = useState<State | undefined>(
    user?.address?.city?.state
  );
  const [selectedCity, setSelectedCity] = useState<City | undefined>(
    user?.address?.city
  );
  const [startDate, setStartDate] = useState<Date | undefined>(() =>
    user?.birthDate ? new Date(user.birthDate.toString()) : undefined
  );
  useEffect(() => {
    if (user) {
      setValue("firstName", user?.firstName ?? "");
      setValue("lastName", user?.lastName ?? "");
      setValue("email", user?.email ?? "");
      setValue("phoneNumber", user?.phoneNumber ?? "");
      setValue("address.street", user?.address.street ?? "");
      setValue("address.number", user?.address.number ?? "");
      setValue("address.description", user?.address.description ?? "");
      setValue("address.phoneNumber", user?.address.phoneNumber ?? "");
      setValue("address.city.state", user?.address?.city?.state ?? "");
      setValue("address.city", user?.address.city ?? "");
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    const addressToSend = {
      ...data.address,
      id: user?.address.id,
      city: selectedCity,
      state: selectedState,
    };

    const dataToSend: any = {
      ...data,
      userName: user?.dni,
      address: addressToSend,
      photo: user?.photo || "default2.png",
    };
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

  return (
    <div key="1" className="container mt-2">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                            <Input {...field} defaultValue={user?.firstName} />
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
                              defaultValue={user?.lastName}
                              placeholder="Ingresar apellido..."
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
                              defaultValue={user?.email}
                              placeholder="Ingresar correo electrónico..."
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
                            <Input {...field} defaultValue={user?.dni} />
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
                              defaultValue={user?.phoneNumber}
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
                              defaultValue={user?.phoneNumber2}
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
                    <Label htmlFor="bloodType">Sangre </Label>
                    <BloodSelect
                      control={control}
                      defaultValue={user?.bloodType}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rhFactor">Factor R.H.</Label>
                    <RHFactorSelect
                      control={control}
                      defaultValue={user?.rhFactor}
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
                              defaultValue={user?.gender}
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
                              defaultValue={user?.maritalStatus}
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
                      name="healthPlans"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">
                            Obra Social
                          </FormLabel>
                          <FormControl>
                            {/* <HealthInsuranceSelect
                                onHealthInsuranceChange={
                                  handleHealthInsuranceChange
                                }
                                selected={selectedHealthInsurance}
                              /> */}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="healthInsurancePlan">Plan</Label>
                    {/* <HealthPlanSelect
                        idHealthInsurance={Number(selectedHealthInsurance?.id)}
                        selected={selectedHealthInsurance}
                        onPlanChange={handlePlanChange}
                      /> */}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
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
                              placeholder="Ingresar Número de Afiliado"
                              // defaultValue={user?.affiliationNumber}
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
                              defaultValue={user?.observations}
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
                              defaultValue={selectedState}
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
                              idState={
                                selectedState ? selectedState.id : undefined
                              }
                              onCityChange={handleCityChange}
                              defaultValue={selectedCity}
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
                              defaultValue={user?.address.street}
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
                              defaultValue={user?.address.number}
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
                              defaultValue={user?.address.description}
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
                              defaultValue={user?.address.phoneNumber}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center gap-4 mt-10">
                <Button
                  className="w-full sm:w-auto"
                  variant="outline"
                  form="userForm"
                  type="submit"
                >
                  Modificar Datos
                </Button>
                <ChangePasswordDialog id={user?.userId} />
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
