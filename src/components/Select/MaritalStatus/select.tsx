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
import { useForm, Controller } from "react-hook-form";

interface MaritalStatusSelectProps {
  defaultValue?: string;
  control: any;
}
export const MaritalStatusSelect = ({
  control,
  defaultValue,
}: MaritalStatusSelectProps) => {
  const maritalStatus = [
    { id: "Soltero", name: "Soltero" },
    { id: "Casado", name: "Casado" },
    { id: "Divorciado", name: "Divorciado" },
  ];

  return (
    <Controller
      name="maritalStatus"
      defaultValue={defaultValue || ""}
      control={control}
      // rules={{ required: "Este campo es obligatorio" }}
      render={({ field }) => (
        <div>
          <Select
            value={field.value}
            onValueChange={(value) => field.onChange(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione el estado civil.." />
            </SelectTrigger>
            <SelectContent>
              {maritalStatus.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    />
  );
};
