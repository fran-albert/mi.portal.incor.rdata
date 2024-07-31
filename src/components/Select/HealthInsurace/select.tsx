import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHealthInsurance } from "@/hooks/Health-Insurance/useHealthInsurance";
import { HealthInsurance } from "@/types/Health-Insurance/Health-Insurance";
import { useEffect, useCallback } from "react";

interface HealthInsuranceSelectProps {
  selected?: HealthInsurance;
  onHealthInsuranceChange: (value: HealthInsurance) => void;
}

export const HealthInsuranceSelect = ({
  selected,
  onHealthInsuranceChange,
}: HealthInsuranceSelectProps) => {
  const { healthInsurances } = useHealthInsurance({});

  const handleHealthInsuranceChange = useCallback(
    (value: HealthInsurance) => {
      onHealthInsuranceChange(value);
    },
    [onHealthInsuranceChange]
  );

  useEffect(() => {
    if (!selected && healthInsurances.length > 0) {
      handleHealthInsuranceChange(healthInsurances[0]);
    }
  }, [healthInsurances, selected, handleHealthInsuranceChange]);

  return (
    <Select
      value={selected?.id.toString()}
      onValueChange={(selectedId) => {
        const selectedHealthInsurance = healthInsurances.find(
          (hi) => String(hi.id) === selectedId
        );
        if (selectedHealthInsurance) {
          handleHealthInsuranceChange(selectedHealthInsurance);
        }
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Seleccionar la obra..." />
      </SelectTrigger>
      <SelectContent>
        {healthInsurances.map((hi) => (
          <SelectItem key={String(hi.id)} value={String(hi.id)}>
            {hi.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
