"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/passwordInput";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { createApiUserRepository } from "@/modules/users/infra/ApiUserRepository";
import { forgotPassword } from "@/modules/users/application/forgot-password/forgotPassword";
import { User } from "@/modules/users/domain/User";
interface FormValues {
  email: string; // Define other fields here if your form has more
}
const userRepository = createApiUserRepository();

function RequestEmailPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const sendMailFn = forgotPassword(userRepository);
      const sendMailPromise = sendMailFn(data.email);
      toast.promise(sendMailPromise, {
        loading: "Enviando enlace...",
        success: "Enlace enviado con éxito!",
        error: "Error al enviar el enlace. Inténtalo de nuevo.",
      });
    } catch (error) {
      console.error("Error al enviar el enlace. Inténtalo de nuevo.", error);
    }
  };

  return (
    <>
      <div className="flex items-start justify-center p-2 mt-40">
        <div className="bg-gray-100 p-4 md:p-14 rounded-lg shadow-md w-full md:max-w-lg">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-lg md:text-2xl font-bold text-center">
              Restablecer contraseña
            </h1>
            <p>Enviaremos un enlace para restablecer su contraseña.</p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input type="email" {...register("email")} />
              </div>
            </div>
            <Button
              type="submit"
              className="mx-auto w-1/2 md:w-1/2"
              variant="teal"
            >
              Confirmar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RequestEmailPassword;
