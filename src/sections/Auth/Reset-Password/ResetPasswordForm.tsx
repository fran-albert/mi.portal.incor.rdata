"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import { PasswordInput } from "@/components/Input/Password/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
interface Inputs {
  password: string;
  confirmPassword: string;
}

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
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

    // try {
    //   const resetPasswordFn = resetPassword(userRepository);
    //   const resetPasswordPromise = resetPasswordFn(payload);

    //   toast.promise(resetPasswordPromise, {
    //     loading: "Cambiando contraseña...",
    //     success: "Contraseña cambiada con éxito!",
    //     error: "Error al cambiar la contraseña",
    //   });
    //   router.push("/iniciar-sesion");
    // } catch (error) {
    //   console.error("Error al cambiar la contraseña", error);
    // }
  };

  return (
    <Card className="w-full max-w-md mt-10">
      <CardHeader>
        <CardTitle>Nueva contraseña</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="newPassword">Nueva contraseña</Label>
            <PasswordInput
              value={password}
              {...register("password")}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
            <PasswordInput
              {...register("confirmPassword")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="confirmPassword"
            />
          </div>
          <CardFooter className="flex justify-center gap-2">
            <Button type="submit" variant={"incor"}>
              Confirmar
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}

export default ResetPasswordForm;
