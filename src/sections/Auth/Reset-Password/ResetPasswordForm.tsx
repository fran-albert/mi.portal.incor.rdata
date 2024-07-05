"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/passwordInput";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import { createApiUserRepository } from "@/modules/users/infra/ApiUserRepository";
import { resetPassword } from "@/modules/users/application/reset-password/resetPassword";

interface Inputs {
  password: string;
  confirmPassword: string;
}

const userRepository = createApiUserRepository();

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();
  const token = searchParams.get("token");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!token) {
      toast.error("Token de restablecimiento no proporcionado.");
      return;
    }

    const payload = {
      password: data.password,
      confirmPassword: data.confirmPassword,
      code: token,
    };

    console.log(payload)

    try {
      const resetPasswordFn = resetPassword(userRepository);
      const resetPasswordPromise = resetPasswordFn(payload);

      toast.promise(resetPasswordPromise, {
        loading: "Creando paciente...",
        success: "Paciente creado con éxito!",
        error: "Error al crear el Paciente",
      });
    } catch (error) {
      console.error("Error al crear el paciente", error);
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
              Nueva Contraseña
            </h1>

            {/* {errors.length > 0 && (
              <div className="alert alert-danger mt-2">
                <ul className="mb-0 text-red-500">
                  {errors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            )} */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="password">Nueva contraseña</Label>
                <PasswordInput
                  value={password}
                  {...register("password")}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">
                  Confirmar nueva contraseña
                </Label>
                <PasswordInput
                  {...register("confirmPassword")}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="confirmPassword"
                />
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

export default ResetPasswordForm;
