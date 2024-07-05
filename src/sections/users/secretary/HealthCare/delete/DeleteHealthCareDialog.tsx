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
import { toast } from "sonner";
import { HealthInsurance } from "@/modules/healthInsurance/domain/HealthInsurance";
import { createApiHealthInsuranceRepository } from "@/modules/healthInsurance/infra/ApiHealthInsuranceRepository";
import { deleteHealthInsurance } from "@/modules/healthInsurance/application/delete/deleteHealthInsurance";

interface DeleteHealthInsuranceDialogProps {
  healthInsurance: HealthInsurance;
  removeHealthInsuranceFromList?: (idHealthInsurance: number) => void;
}

export default function DeleteHealthInsuranceDialog({
  healthInsurance,
  removeHealthInsuranceFromList,
}: DeleteHealthInsuranceDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDialog = () => setIsOpen(!isOpen);

  const handleConfirmDelete = async () => {
    try {
      const healthInsuranceRepository = createApiHealthInsuranceRepository();
      const deleteHealthInsuranceFn = deleteHealthInsurance(
        healthInsuranceRepository
      );
      const healthInsuranceDeletionPromise = deleteHealthInsuranceFn(
        Number(healthInsurance.id)
      );
      toast.promise(healthInsuranceDeletionPromise, {
        loading: "Eliminando obra social...",
        success: "Obra Social eliminada con éxito!",
        error: "Error al eliminar la Obra Social",
        duration: 3000,
      });
      healthInsuranceDeletionPromise
        .then(() => {
          setIsOpen(false);
          if (removeHealthInsuranceFromList) {
            removeHealthInsuranceFromList(Number(healthInsurance.id));
          }
        })
        .catch((error) => {
          console.error("Error al crear la Obra Social", error);
        });
    } catch (error) {
      console.error("Error al crear la Obra Social", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-red-700 hover:bg-red-500 ml-2"
          onClick={toggleDialog}
        >
          Eliminar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Eliminar {healthInsurance.name}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          ¿Estás seguro de que quieres eliminar la obra social{" "}
          {healthInsurance.name}?
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={toggleDialog}>
            Cancelar
          </Button>
          <Button variant="teal" onClick={handleConfirmDelete}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
