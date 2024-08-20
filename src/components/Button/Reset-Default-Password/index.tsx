"use client";

import React, { use, useState } from "react";
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
import { FaCalendar, FaCamera, FaFilePdf, FaUpload } from "react-icons/fa";
import axios from "axios";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale/es";
registerLocale("es", es);
import moment from "moment-timezone";
import { Study } from "@/types/Study/Study";
import { SubmitHandler, useForm } from "react-hook-form";
import { StudyTypeSelect } from "@/components/Select/Study/select";
import { useStudyMutations } from "@/hooks/Study/useStudyMutations";
import { useUserMutations } from "@/hooks/User/useUserMutations";
interface Props {
  idUser: number;
}

export default function ResetDefaultPasswordDialog({ idUser }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDialog = () => setIsOpen(!isOpen);
  const { resetDefaultPasswordMutation } = useUserMutations();
  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      toast.promise(resetDefaultPasswordMutation.mutateAsync(idUser), {
        loading: "Subiendo estudio...",
        success: "Estudio subido con éxito!",
        error: "Error al agregar el estudio",
      });
    } catch (error) {
      console.error("Error al agregar el estudio", error);
      toast.error("Error al agregar el estudio");
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={toggleDialog} variant={"ghost"}>
          Resetear contraseña
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Restablecer Contraseña</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          ¿Estás seguro que deseas restablecer la contraseña por defecto? La
          nueva contraseña será el DNI del usuario.
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" type="button" onClick={toggleDialog}>
            Cancelar
          </Button>
          <Button type="submit" variant="incor" onClick={onSubmit}>
            Restablecer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
