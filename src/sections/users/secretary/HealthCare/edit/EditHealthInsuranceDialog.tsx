import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { DialogTrigger } from "@radix-ui/react-dialog";
import ActionIcon from "@/components/ui/actionIcon";
import { FaPencil } from "react-icons/fa6";
import { HealthInsurance } from "@/modules/healthInsurance/domain/HealthInsurance";
import { createApiHealthInsuranceRepository } from "@/modules/healthInsurance/infra/ApiHealthInsuranceRepository";
import { createHealthInsurance } from "@/modules/healthInsurance/application/create/createHealthInsurance";
import { updateHealthInsurance } from "@/modules/healthInsurance/application/update/updateHealthInsurance";

interface EditHealthCareDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  healthInsurance: HealthInsurance;
  updateHealthInsuranceInList: (
    updatedSpeciality: HealthInsurance
  ) => void | undefined;
}
const healthInsuranceRepository = createApiHealthInsuranceRepository();
interface Inputs extends HealthInsurance {}

export default function EditHealthInsuranceDialog({
  isOpen,
  setIsOpen,
  healthInsurance,
  updateHealthInsuranceInList,
}: EditHealthCareDialogProps) {
  const toggleDialog = () => setIsOpen(!isOpen);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (isOpen && healthInsurance) {
      reset(healthInsurance);
    }
  }, [isOpen, healthInsurance, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data: HealthInsurance) => {
    try {
      const updateHCFn = updateHealthInsurance(healthInsuranceRepository);
      const specialityCreationPromise = updateHCFn(
        Number(healthInsurance.id),
        data
      );

      toast.promise(specialityCreationPromise, {
        loading: "Editando obra social...",
        success: "Obra Social editada con éxito!",
        error: "Error al editar la Obra Social",
      });

      specialityCreationPromise
        .then(() => {
          setIsOpen(false);
          if (updateHealthInsuranceInList) updateHealthInsuranceInList(data);
        })
        .catch((error) => {
          console.error("Error al editar la Obra Social", error);
        });
    } catch (error) {
      console.error("Error al editar la Obra Social", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Obra Social</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogDescription>
            <div className="flex flex-row mt-2">
              <div className="flex-1 pr-1">
                <div className="mb-2 block ">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    {...register("name", { required: true })}
                    className="bg-gray-200 text-gray-700"
                  />
                </div>
              </div>
            </div>
          </DialogDescription>
          <DialogFooter>
            <Button variant="outline" onClick={toggleDialog}>
              Cancelar
            </Button>
            <Button variant="teal" type="submit">
              Confirmar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
