import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
interface ServiceSelectProps {
  selected?: string;
  control: any;
  defaultValue?: string;
  onService?: (value: string) => void;
}
export const ServiceSelect = ({
  selected,
  onService,
  control,
  defaultValue,
}: ServiceSelectProps) => {
  const handleValueChange = (selected: string) => {
    if (onService) {
      onService(selected);
    }
  };

  return (
    <Controller
      name="module"
      control={control}
      rules={{ required: "Este campo es obligatorio" }}
      defaultValue={defaultValue ? String(defaultValue) : ""}
      render={({ field }) => (
        <div>
          <Select
            {...field}
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value);
              handleValueChange(value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione el servicio..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pacientes">Pacientes</SelectItem>
              <SelectItem value="Médicos">Médicos</SelectItem>
              <SelectItem value="Estudios">Estudios</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    />
  );
};
