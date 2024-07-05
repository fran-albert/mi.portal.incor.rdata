"use client";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/passwordInput";
import Loading from "@/components/Loading/loading";
import { PrioritySelect } from "@/components/Select/Priority/select";
import { useForm, SubmitHandler } from "react-hook-form";
import { ServiceSelect } from "@/components/Select/Services/select";
import { Textarea } from "@/components/ui/textarea";
import { createApiUserRepository } from "@/modules/users/infra/ApiUserRepository";
import { requestSupport } from "@/modules/users/application/support/support";
import { toast } from "sonner";
import { User } from "@/modules/users/domain/User";
interface Inputs extends User {}
const userRepository = createApiUserRepository();

function SupportForm() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      userId: session?.user?.id || "",
      priority: "Media",
      module: "",
      description: "",
    },
  });

  useEffect(() => {
    setValue("userId", session?.user?.id || "");
  }, [session?.user?.id, setValue]);

  const handlePriorityChange = (selected: string) => {
    setValue("priority", selected);
  };

  const handleServiceChange = (selected: string) => {
    setValue("module", selected);
  };
  const onSubmit: SubmitHandler<Inputs> = async (data: User) => {

    try {
      const createRequestSupportFn = requestSupport(userRepository);
      const patientCreationPromise = createRequestSupportFn(data);

      toast.promise(patientCreationPromise, {
        loading: "Enviando ticket...",
        success: "Ticket enviado correctamente",
        error: "Error al enviar el ticket",
      });
      await patientCreationPromise;
      reset({
        userId: session?.user?.id || "",
        priority: "Media",
        module: "",
        description: "",
      });
    } catch (error) {
      console.error("Error al crear el ticket", error);
    }
  };
  useEffect(() => {
    setValue("priority", watch("priority") || "Media");
  }, [setValue, watch]);

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="flex items-start justify-center p-2 mt-40">
        <div className="bg-gray-100 p-4 md:p-14 rounded-lg shadow-md w-full md:max-w-lg">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-lg md:text-2xl font-bold text-center">
              Soporte
            </h1>
            <div className="space-y-4">
              <div>
                <Label htmlFor="priority">Prioridad</Label>
                <PrioritySelect
                  selected={watch("priority")}
                  onPriority={handlePriorityChange}
                />
              </div>
              <div>
                <Label htmlFor="service">Servicio</Label>
                <ServiceSelect onService={handleServiceChange} />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message">Descripción</Label>
                <Textarea
                  {...register("description")}
                  placeholder="Escribe su mensaje acá..."
                  id="message"
                />
              </div>
            </div>

            <div className="flex justify-center mt-10">
              <Button
                type="submit"
                variant="teal"
                className="mx-auto w-1/2 md:w-1/2"
              >
                Enviar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SupportForm;
