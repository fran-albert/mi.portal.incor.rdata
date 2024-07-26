import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createApiStudyRepository } from "@/modules/study/infra/ApiStudyRepository";
import { Study } from "@/modules/study/domain/Study";
import { useForm } from "react-hook-form";

interface StudySelectProps {
  selected?: Study;
  onStudyChange?: (value: Study) => void;
}

export const StudyTypeSelect = ({
  selected,
  onStudyChange,
}: StudySelectProps) => {
  const [studies, setStudies] = useState<Study[]>([]);
  const studyRepository = createApiStudyRepository();

  useEffect(() => {
    const loadStudies = async () => {
      try {
        const studies = await studyRepository.getAllStudyType();
        setStudies(studies);
      } catch (error) {
        console.error("Error al obtener los estados:", error);
      }
    };

    loadStudies();
  }, []);

  const handleValueChange = (selectedId: string) => {
    const selectedState = studies.find(
      (state) => String(state.id) === selectedId
    );
    if (onStudyChange && selectedState) {
      onStudyChange(selectedState);
    }
  };

  return (
    <Select value={selected?.id.toString()} onValueChange={handleValueChange}>
      <SelectTrigger className=" text-black">
        <SelectValue placeholder="Seleccione tipo de estudio..." />
      </SelectTrigger>
      <SelectContent>
        {studies.map((studie) => (
          <SelectItem key={String(studie.id)} value={String(studie.id)}>
            {studie.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
