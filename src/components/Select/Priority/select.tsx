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

interface PrioritySelectProps {
  selected?: string;
  control: any;
  defaultValue?: string;
  onPriority?: (value: string) => void;
}
export const PrioritySelect = ({
  selected,
  control,
  defaultValue,
  onPriority,
}: PrioritySelectProps) => {
  const handleValueChange = (selected: string) => {
    if (onPriority) {
      onPriority(selected);
    }
  };

  return (
    <Controller
      name="priority"
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
              <SelectValue placeholder="Seleccione la prioridad..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Baja">Baja</SelectItem>
              <SelectItem value="Media">Media</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    />
  );
};
