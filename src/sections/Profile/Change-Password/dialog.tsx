"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PasswordInput } from "@/components/Input/Password/input";
import { ChangePasswordSchema } from "@/validators/user.schema";
import { useUserMutations } from "@/hooks/User/useUserMutations";
import { toast } from "sonner";

interface ChangePasswordDialogProps {
  idUser: number;
}

export default function ChangePasswordDialog({
  idUser,
}: ChangePasswordDialogProps) {
  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { changePasswordMutation } = useUserMutations();

  const toggleDialog = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      form.reset();
      setErrorMessage(null); // Clear the error message when the dialog is closed
    }
  };

  async function onSubmit(data: z.infer<typeof ChangePasswordSchema>) {
    const dataToSend: any = {
      userId: String(idUser),
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    };

    try {
      await changePasswordMutation.mutateAsync(dataToSend);
      toast.success("Contraseña cambiada correctamente");
      form.reset();
      toggleDialog();
    } catch (error: any) {
      setErrorMessage(error.response?.data || "Error al cambiar la contraseña");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggleDialog}>
      <DialogTrigger asChild>
        <Button
          onClick={toggleDialog}
          variant="outline"
          type="button"
          className="sm:w-auto"
        >
          Cambiar Contraseña
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <CardHeader>
          <CardTitle>Cambiar contraseña</CardTitle>
          <CardDescription>
            Ingresa tu contraseña actual y la nueva contraseña para actualizar
            tus credenciales.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {errorMessage && <div className="text-red-600">{errorMessage}</div>}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
              id="passwordForm"
            >
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                        Contraseña Actual
                      </FormLabel>
                      <FormControl>
                        <PasswordInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                        Nueva Contraseña
                      </FormLabel>
                      <FormControl>
                        <PasswordInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                        Confirmar Nueva Contraseña
                      </FormLabel>
                      <FormControl>
                        <PasswordInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <CardFooter className="flex justify-end gap-2">
                <div>
                  <Button
                    variant="outline"
                    type="button"
                    form="passwordForm"
                    onClick={toggleDialog}
                  >
                    Cancelar
                  </Button>
                </div>
                <Button variant={"incor"} type="submit" form="passwordForm">
                  Guardar
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
}
