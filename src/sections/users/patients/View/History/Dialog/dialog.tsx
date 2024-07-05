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
import "react-quill/dist/quill.snow.css";
import ActionIcon from "@/components/ui/actionIcon";
import { FaCamera, FaFilePdf, FaPlus, FaUpload } from "react-icons/fa";
import axios from "axios";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale/es";
registerLocale("es", es);
import { Patient } from "@/modules/patients/domain/Patient";
import moment from "moment-timezone";
import { StudyTypeSelect } from "@/components/Select/Study/select";
import { Study } from "@/modules/study/domain/Study";
import { SubmitHandler, useForm } from "react-hook-form";
import { createApiStudyRepository } from "@/modules/study/infra/ApiStudyRepository";
import { uploadStudy } from "@/modules/study/application/upload-study/uploadStudy";
import dynamic from "next/dynamic";
import "./dialog.style.css";
import { Textarea } from "@/components/ui/textarea";

interface HistoryDialogProps {
  //   idPatient: number | null;
  //   onStudyAdded?: (newStudy: Study) => void;
}

export default function HistoryDialog({}: //   idPatient,
//   onStudyAdded,
HistoryDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const toggleDialog = () => setIsOpen(!isOpen);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const handleDateChange = (date: Date) => {
    const dateInArgentina = moment(date).tz("America/Argentina/Buenos_Aires");
    const formattedDateISO = dateInArgentina.format();
    setStartDate(date);
    setValue("Date", formattedDateISO);
  };

  const closeDialog = () => {
    reset();
    toggleDialog();
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);

    //   try {
    //     const uploadStudyPromise = uploadStudyFn(formData);

    //     toast.promise(uploadStudyPromise, {
    //       loading: "Subiendo estudio...",
    //       success: (responseText) => {
    //         toggleDialog();
    //         return responseText;
    //       },
    //       error: "Error al subir el estudio",
    //     });
    //   } catch (error) {
    //     console.error("Error al subir el estudio", error);
    //     toast.error("Error al subir el estudio");
    //   }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          onClick={toggleDialog}
          className="flex items-center justify-center w-full p-2 border border-dashed border-gray-300 rounded hover:bg-gray-50"
        >
          <FaPlus className="w-4 h-4 mr-2 text-teal-600" />
          <span className="text-teal-600">Nuevo Antecedente</span>
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-lg dialog-content w-full max-w-md mx-auto px-4 py-2 sm:px-6 md:max-w-lg text-black">
        <DialogHeader>
          <DialogTitle>Nuevo Antecedente</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogDescription>
            <div className="space-y-4 mt-4 text-black">
              <div>
                <Label htmlFor="diagnostico1">Diagnostico</Label>
                <Input id="diagnostico1" />
              </div>
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  className="min-h-[100px]"
                  id="description"
                  placeholder="Ingrese una descripción..."
                />
              </div>
              {/* <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fecha-inicio">Fecha Inicio</Label>
                  <Input id="fecha-inicio" placeholder="Fecha Inicio" />
                </div>
                <div>
                  <Label htmlFor="fecha-fin">Fecha Fin</Label>
                  <Input id="fecha-fin" placeholder="Fecha Fin" />
                </div>
              </div> */}
              {/* <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gravedad">Gravedad</Label>
                  <Input id="gravedad" placeholder="Gravedad" />
                </div>
                <div>
                  <Label htmlFor="estado">Estado</Label>
                  <Input id="estado" placeholder="Estado" />
                </div>
              </div> */}
              <div>
                <Label htmlFor="observacion">Observacion</Label>
                <Input id="observacion" placeholder="Observacion" />
              </div>
            </div>
          </DialogDescription>
          <DialogFooter>
            <div className="mx-auto items-center mt-4">
              <Button variant="teal" type="submit">
                Confirmar
              </Button>
              <Button
                variant="outline"
                type="button"
                className="ml-2"
                onClick={closeDialog}
              >
                Cancelar
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
