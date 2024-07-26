import React, { useState } from "react";
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
import { HealthInsurance } from "@/modules/healthInsurance/domain/HealthInsurance";
import { createApiHealthInsuranceRepository } from "@/modules/healthInsurance/infra/ApiHealthInsuranceRepository";
import { createHealthInsurance } from "@/modules/healthInsurance/application/create/createHealthInsurance";

interface AddHealthInsuranceDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onHealthInsuranceAdded: (newHealthInsurance: HealthInsurance) => void;
}

interface Inputs extends HealthInsurance {}

const healthInsuranceRepository = createApiHealthInsuranceRepository();

export default function AddHealthInsuranceDialog({
  isOpen,
  onHealthInsuranceAdded,
  setIsOpen,
}: AddHealthInsuranceDialogProps) {
  const toggleDialog = () => setIsOpen(!isOpen);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const createHCFn = createHealthInsurance(healthInsuranceRepository);
      const hcCreationPromise = createHCFn(data);

      toast.promise(hcCreationPromise, {
        loading: "Creando Obra Social...",
        success: "Obra Social creada con éxito!",
        error: "Error al crear la Obra Social",
      });

      hcCreationPromise
        .then(() => {
          setIsOpen(false);
          reset();
          onHealthInsuranceAdded(data);
        })
        .catch((error) => {
          console.error("Error al crear la Obra Social", error);
        });
    } catch (error) {
      console.error("Error al crear la Obra Social", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Obra Social</DialogTitle>
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
            <Button variant="incor" type="submit">
              Confirmar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
