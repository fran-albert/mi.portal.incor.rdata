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
import { Speciality } from "@/modules/speciality/domain/Speciality";

interface AddSpecialityDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSpecialityAdded: (newSpeciality: Speciality) => void;
}

interface Inputs extends Speciality {}

export default function AddSpecialityDialog({
  isOpen,
  onSpecialityAdded,
  setIsOpen,
}: AddSpecialityDialogProps) {
  const toggleDialog = () => setIsOpen(!isOpen);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // try {
    //   const specialityRepository = createApiSpecialityRepository();
    //   const createSpecialityFn = createSpeciality(specialityRepository);
    //   const specialityCreationPromise = createSpecialityFn(data);

    //   toast.promise(specialityCreationPromise, {
    //     loading: "Creando especialidad...",
    //     success: "Especialidad creada con éxito!",
    //     error: "Error al crear la Especialidad",
    //   });

    //   specialityCreationPromise
    //     .then(() => {
    //       setIsOpen(false);
    //       onSpecialityAdded(data);
    //     })
    //     .catch((error) => {
    //       console.error("Error al crear la Especialidad", error);
    //     });
    // } catch (error) {
    //   console.error("Error al crear la Especialidad", error);
    // }
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Especialidad</DialogTitle>
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
