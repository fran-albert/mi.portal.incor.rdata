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
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
import ActionIcon from "@/components/Icons/action";

interface DeleteDoctorDialogProps {
  idDoctor: number;
  onDoctorDeleted?: () => void;
}

export default function DeleteDoctorDialog({
  idDoctor,
  onDoctorDeleted,
}: DeleteDoctorDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDialog = () => setIsOpen(!isOpen);

  const handleConfirmDelete = async () => {
    // try {
    //   const doctorRepository = createApiDoctorRepository();
    //   const deleteDoctorFn = deleteDoctor(doctorRepository);
    //   const doctorDeletionPromise = deleteDoctorFn(idDoctor);
    //   toast.promise(doctorDeletionPromise, {
    //     loading: "Eliminando médico...",
    //     success: "Médico eliminado con éxito!",
    //     error: "Error al eliminar el médico",
    //     duration: 3000,
    //   });
    //   if (onDoctorDeleted) {
    //     onDoctorDeleted();
    //   }
    // } catch (error) {
    //   console.error("Error al eliminar el médico", error);
    //   toast.error("Error al eliminar el médico");
    // } finally {
    //   setIsOpen(false);
    // }
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
          <DialogTitle>Eliminar Médico</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          ¿Estás seguro de que quieres eliminar el médico?
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={toggleDialog}>
            Cancelar
          </Button>
          <Button variant="incor" onClick={handleConfirmDelete}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
