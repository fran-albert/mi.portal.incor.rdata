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
import { FaRegTrashAlt, FaEye } from "react-icons/fa";
import { toast } from "sonner";
import ActionIcon from "@/components/Icons/action";
import { usePatientMutations } from "@/hooks/Patient/usePatientMutation";
import { usePatients } from "@/hooks/Patient/usePatients";
import { usePatientStore } from "@/stores/Patient/patient.store";

interface DeletePatientDialogProps {
  idPatient: number;
}

export default function DeletePatientDialog({
  idPatient,
}: DeletePatientDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDialog = () => setIsOpen(!isOpen);
  const { deletePatientMutation } = usePatientMutations();
  const deletePatientFromStore = usePatientStore(
    (state) => state.deletePatient
  );
  const handleConfirmDelete = async () => {
    const deletePromise = deletePatientMutation.mutateAsync(idPatient);

    toast.promise(deletePromise, {
      loading: "Eliminando paciente...",
      success: "Paciente eliminado con éxito!",
      error: (err) => {
        console.error("Error al eliminar el Paciente", err);
        return "Error al eliminar el Paciente";
      },
    });

    try {
      await deletePromise;
      deletePatientFromStore(idPatient);
    } catch (error) {
      console.error("Error al eliminar el Paciente", error);
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
          <Button
            variant="incor"
            onClick={handleConfirmDelete}
            disabled={deletePatientMutation.isPending}
          >
            {deletePatientMutation.isPending ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
