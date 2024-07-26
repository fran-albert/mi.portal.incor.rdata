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
interface AddStudyProps {
  idUser: number | null;
}

export default function StudyDialog({ idUser }: AddStudyProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDialog = () => setIsOpen(!isOpen);
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { uploadStudyMutation } = useStudyMutations();
  const onSubmit: SubmitHandler<any> = async (data) => {
    const formData = new FormData();

    formData.append("StudyTypeId", data.StudyTypeId);

    if (idUser) {
      formData.append("UserId", String(idUser));
    }

    if (selectedFile) {
      formData.append("StudyFile", selectedFile);
    }
    const date = data.date;
    const formattedDateISO = moment(date).toISOString();
    formData.append("Date", formattedDateISO);
    formData.append("Note", data.Note);

    try {
      toast.promise(uploadStudyMutation.mutateAsync(formData), {
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

  const handleStudyChange = (study: Study) => {
    setSelectedStudy(study);
    setValue("StudyTypeId", study.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          onClick={toggleDialog}
          className="flex items-center justify-center w-full p-2 border border-dashed border-gray-300 rounded hover:bg-gray-50"
        >
          <FaUpload className="w-4 h-4 mr-2 text-teal-600" />
          <span className="text-teal-600">Nuevo Estudio</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Estudio</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label
                htmlFor="studyType"
                className="block text-black font-medium mb-2"
              >
                Tipo de Estudio
              </Label>
              <StudyTypeSelect onStudyChange={handleStudyChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file">Archivo</Label>
              <Input
                type="file"
                className="text-black"
                onChange={(e) =>
                  setSelectedFile(e.target.files && e.target.files[0])
                }
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="comment"
                className="block text-black font-medium mb-2"
              >
                Comentario
              </Label>
              <Input
                {...register("Note", { required: true })}
                placeholder="Ingresar un comentario..."
                className="text-black"
              />
            </div>
            <div className="space-y-2">
              <Label className="mb-2" htmlFor="date">
                Fecha
              </Label>
              <Input
                id="date"
                type="date"
                {...register("date", { required: true })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={toggleDialog}>
              Cancelar
            </Button>
            <Button type="submit" variant="incor">
              Agregar Estudio
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
