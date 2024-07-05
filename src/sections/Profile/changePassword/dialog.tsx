"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ActionIcon from "@/components/ui/actionIcon";
import { FaTrashAlt } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/passwordInput";
import { User } from "@/modules/users/domain/User";
import { toast } from "sonner";
import axios from "axios";
import { createApiUserRepository } from "@/modules/users/infra/ApiUserRepository";
import { changePassword } from "@/modules/users/application/change-password/changePassword";

interface ChangePasswordDialogProps {
  id: number;
}
const userRepository = createApiUserRepository();
export default function ChangePasswordDialog({
  id,
}: ChangePasswordDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
    control,
  } = useForm<User>();
  const toggleDialog = () => setIsOpen(!isOpen);

  const changePasswordFn = changePassword(userRepository);

  const handleChangePassword = async (data: User) => {
    const dataToSend: any = {
      userId: id,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    };

    try {
      const response = await changePasswordFn(dataToSend);
      if (response) {
        toast.success("Contraseña cambiada correctamente");
        toggleDialog();
        clearErrors();
        reset();
      }
    } catch (error) {
      clearErrors();
      if (axios.isAxiosError(error) && error.response) {
        toast.error(`Error al cambiar la contraseña: ${error.response.data || 'Error desconocido'}`);
      } else {
        toast.error("Error al cambiar la contraseña: Error desconocido");
      }
      console.error(error);
    }
    
    
  };

  const onSubmit = handleSubmit((dataToSend) => {
    handleChangePassword(dataToSend);
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={toggleDialog} variant="outline" type="button">
          Cambiar Contraseña
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cambiar contraseña</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <form
            className="flex flex-col gap-6 mx-auto p-8"
            id="passwordForm"
            onSubmit={onSubmit}
          >
            {/* Contraseña Actual */}
            <div>
              <Label htmlFor="currentPassword">Contraseña Actual</Label>
              <Controller
                name="currentPassword"
                control={control}
                render={({ field }) => <PasswordInput {...field} />}
              />
            </div>

            {/* Nueva Contraseña */}
            <div>
              <Label htmlFor="newPassword">Nueva Contraseña</Label>
              <Controller
                name="newPassword"
                control={control}
                render={({ field }) => <PasswordInput {...field} />}
              />
            </div>

            {/* Confirmar Nueva Contraseña */}
            <div>
              <Label htmlFor="confirmPassword">
                Confirmar Nueva Contraseña
              </Label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => <PasswordInput {...field} />}
              />
            </div>

            {/* Botones */}
            <DialogFooter className="flex justify-end gap-4 mt-4">
              <Button
                variant="outline"
                type="button"
                onClick={toggleDialog}
                form="passwordForm"
              >
                Cancelar
              </Button>
              <Button variant="default" type="submit">
                Confirmar
              </Button>
            </DialogFooter>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
