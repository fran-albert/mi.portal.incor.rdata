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
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
import { createApiSpecialityRepository } from "@/modules/speciality/infra/ApiSpecialityRepository";
import { deleteSpeciality } from "@/modules/speciality/application/delete/deleteSpeciality";
import { Speciality } from "@/modules/speciality/domain/Speciality";

interface DeleteSpecialityDialogProps {
  speciality: Speciality;
  removeSpecialityFromList?: (idSpeciality: number) => void;
}

export default function DeleteSpecialityDialog({
  speciality,
  removeSpecialityFromList,
}: DeleteSpecialityDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDialog = () => setIsOpen(!isOpen);

  const handleConfirmDelete = async () => {
    try {
      const specialityRepository = createApiSpecialityRepository();
      const deleteSpecialityFn = deleteSpeciality(specialityRepository);
      const specialityDeletionPromise = deleteSpecialityFn(
        Number(speciality.id)
      );
      toast.promise(specialityDeletionPromise, {
        loading: "Eliminando especialidad...",
        success: "Especialidad eliminada con éxito!",
        error: "Error al eliminar la Especialidad",
        duration: 3000,
      });
      specialityDeletionPromise
        .then(() => {
          setIsOpen(false);
          if (removeSpecialityFromList) {
            removeSpecialityFromList(Number(speciality.id));
          }
        })
        .catch((error) => {
          console.error("Error al crear la Especialidad", error);
        });
    } catch (error) {
      console.error("Error al crear la Especialidad", error);
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
          <DialogTitle>Eliminar {speciality.name}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          ¿Estás seguro de que quieres eliminar la especialidad{" "}
          {speciality.name}?
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
