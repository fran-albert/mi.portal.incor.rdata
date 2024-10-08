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
import { FaTrash, FaUpload } from "react-icons/fa";
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
  idUser: number;
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
    reset,
    setValue,
  } = useForm();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { uploadStudyMutation } = useStudyMutations();
  const onSubmit: SubmitHandler<any> = async (data) => {
    const formData = new FormData();

    formData.append("StudyTypeId", data.StudyTypeId);

    if (idUser) {
      formData.append("UserId", String(idUser));
    }

    if (selectedFiles.length > 0) {
      selectedFiles.forEach((file) => {
        formData.append("StudyFiles", file);
      });
    }
    const date = data.date;
    const formattedDateISO = moment(date).toISOString();
    formData.append("Date", formattedDateISO);
    formData.append("Note", data.Note);

    try {
      toast.promise(uploadStudyMutation.mutateAsync({ formData, idUser }), {
        loading: "Subiendo estudio...",
        success: "Estudio subido con éxito!",
        error: "Error al agregar el estudio",
      });
      reset();
      setSelectedFiles([]);
      setIsOpen(false);
    } catch (error) {
      console.error("Error al agregar el estudio", error);
      toast.error("Error al agregar el estudio");
    }
  };

  const handleStudyChange = (study: Study) => {
    setSelectedStudy(study);
    setValue("StudyTypeId", study.id);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleFileRemove = (index: number) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);
      return updatedFiles;
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          onClick={toggleDialog}
          className="flex items-center justify-center w-full p-2 border border-dashed border-gray-300 rounded hover:bg-gray-50"
        >
          <FaUpload className="w-4 h-4 mr-2 text-incor" />
          <span className="text-incor">Nuevo Estudio</span>
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
              <Label htmlFor="file">Archivos</Label>
              <Input
                type="file"
                className="text-black"
                multiple
                onChange={handleFileChange}
              />
              {selectedFiles.length > 0 && (
                <div className="mt-2">
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedFiles.map((file, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center text-sm text-gray-700"
                      >
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
            <Button
              type="submit"
              variant="incor"
              disabled={uploadStudyMutation.isPending}
            >
              Agregar Estudio
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
