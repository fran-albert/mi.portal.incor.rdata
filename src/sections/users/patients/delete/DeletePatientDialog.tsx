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
import ActionIcon from "@/components/ui/actionIcon";
import { FaRegTrashAlt, FaEye } from "react-icons/fa";
import { toast } from "sonner";
import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import { deletePatient } from "@/modules/patients/application/delete/deletePatient";

interface DeletePatientDialogProps {
  idPatient: number;
  onPatientDeleted?: () => void;
}

export default function DeletePatientDialog({
  idPatient,
  onPatientDeleted,
}: DeletePatientDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDialog = () => setIsOpen(!isOpen);

  const handleConfirmDelete = async () => {
    try {
      const patientRepository = createApiPatientRepository();
      await deletePatient(patientRepository)(idPatient);
      toast.success("Paciente eliminado con éxito!");
      if (onPatientDeleted) {
        onPatientDeleted();
      }
    } catch (error) {
      console.error("Error al eliminar el Paciente", error);
      toast.error("Error al eliminar el Paciente");
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={toggleDialog}>
          <ActionIcon
            tooltip="Eliminar"
            icon={<FaRegTrashAlt className="w-4 h-4" color="red" />}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Eliminar Paciente</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          ¿Estás seguro de que quieres eliminar el paciente?
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
