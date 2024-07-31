import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HealthPlanSelect } from "@/components/Select/HealthPlan/select";
import { StateSelect } from "@/components/Select/State/select";
import { goBack } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import moment from "moment-timezone";
import { HealthInsurance } from "@/types/Health-Insurance/Health-Insurance";
import { HealthPlans } from "@/modules/healthPlans/domain/HealthPlan";
import { Patient } from "@/types/Patient/Patient";
import { State } from "@/types/State/State";
import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { FaCamera } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "sonner";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import { useCustomSession } from "@/context/SessionAuthProviders";
import { capitalizeWords, handleDateChange } from "@/common/helpers/helpers";
import { FaCalendar } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RHFactorSelect } from "@/components/Select/RHFactor/select";
import { GenderSelect } from "@/components/Select/Gender/select";
import { MaritalStatusSelect } from "@/components/Select/MaritalStatus/select";
import { CitySelect } from "@/components/Select/City/select";
import { HealthInsuranceSelect } from "@/components/Select/HealthInsurace/select";
import { BloodSelect } from "@/components/Select/Blood/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PatientSchema } from "@/validators/patient.schema";
import { usePatientStore } from "@/stores/Patient/patient.store";
import { usePatientMutations } from "@/hooks/Patient/usePatientMutation";
import { City } from "@/types/City/City";
registerLocale("es", es);

type FormValues = z.infer<typeof PatientSchema>;
export function CreatePatientForm() {
  const addPatientToStore = usePatientStore((state) => state.addPatient);
  const { addPatientMutation } = usePatientMutations();
  const form = useForm<FormValues>({
    resolver: zodResolver(PatientSchema),
  });
  const {
    setValue,
    control,
    formState: { errors },
  } = form;
  const [selectedState, setSelectedState] = useState<State | undefined>(
    undefined
  );
  const { session } = useCustomSession();
  const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined);
  const [selectedPlan, setSelectedPlan] = useState<HealthPlans | null>(null);
  const [selectedHealthInsurance, setSelectedHealthInsurance] = useState<
    HealthInsurance | undefined
  >(undefined);

  const [startDate, setStartDate] = useState<Date | undefined>();

  const handleHealthInsuranceChange = (healthInsurance: HealthInsurance) => {
    setSelectedHealthInsurance(healthInsurance);
    setSelectedPlan(null);
  };

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

  const handlePlanChange = (plan: HealthPlans | null) => {
    setSelectedPlan(plan ? plan : null);
  };

  async function onSubmit(data: z.infer<typeof PatientSchema>) {
    const dateInArgentina = moment(data.birthDate).tz(
      "America/Argentina/Buenos_Aires"
    );

    const payload: any = {
      ...data,
      email: data.email || "",
      address: {
        ...data.address,
        city: selectedCity,
      },
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
      photo: "",
      birthDate: dateInArgentina.format(),
      registeredById: Number(session?.user?.id),
    };
    try {
      const patientCreationPromise = addPatientMutation.mutateAsync(payload);
      toast.promise(patientCreationPromise, {
        loading: "Creando paciente...",
        success: "Paciente creado con éxito!",
        error: (err) => {
          if (err.response && err.response.status === 409) {
            return "El DNI o Email ya existe.";
          }
          return "Error al crear el Paciente";
        },
      });

      patientCreationPromise
        .then((newPatient) => {
          addPatientToStore(newPatient);
          goBack();
        })
        .catch((error) => {
          console.error("Error al crear el paciente", error);
        });
    } catch (error) {
      console.error("Error al crear el paciente", error);
    }
  }

  useEffect(() => {
    setSelectedPlan(null);
  }, [selectedHealthInsurance]);

  return (
    <div key="1" className="container mt-2">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardHeader>
              <CardTitle>
                <button
                  className="flex items-center justify-start w-full"
                  onClick={goBack}
                  type="button"
                >
                  <IoMdArrowRoundBack className="text-black mr-2" size={25} />
                  Agregar Paciente
                </button>
              </CardTitle>
              <CardDescription>
                Completa los campos para agregar un nuevo paciente.
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
                    <Label htmlFor="bloodType">Sangre </Label>
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
                              idState={
                                selectedState ? Number(selectedState.id) : 0
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
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={goBack}>
                Cancelar
              </Button>
              <Button variant="incor" type="submit" disabled={addPatientMutation.isPending}>
                Confirmar
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
