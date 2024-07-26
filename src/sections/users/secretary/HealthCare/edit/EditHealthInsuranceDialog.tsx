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
import { HealthInsurance } from "@/types/Health-Insurance/Health-Insurance";
import { useHealthInsuranceStore } from "@/stores/Health-Insurance/health-insurance.store";
import { useHealthInsuranceMutations } from "@/hooks/Health-Insurance/useHealthInsuranceMutation";

interface EditHealthCareDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  healthInsurance: HealthInsurance;
}
interface Inputs extends HealthInsurance {}

export default function EditHealthInsuranceDialog({
  isOpen,
  setIsOpen,
  healthInsurance,
}: EditHealthCareDialogProps) {
  const updateHealthInsuranceToStore = useHealthInsuranceStore(
    (state) => state.updateHealthInsurance
  );
  const { updateHealthInsuranceMutation } = useHealthInsuranceMutations();
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
      const specialityCreationPromise =
        updateHealthInsuranceMutation.mutateAsync({
          id: healthInsurance.id,
          healthInsurance: data,
        });

      toast.promise(specialityCreationPromise, {
        loading: "Editando obra social...",
        success: "Obra Social editada con éxito!",
        error: "Error al editar la Obra Social",
      });

      specialityCreationPromise
        .then((data) => {
          setIsOpen(false);
          updateHealthInsuranceToStore(data.id, data);
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
            <Button variant="incor" type="submit">
              Confirmar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
