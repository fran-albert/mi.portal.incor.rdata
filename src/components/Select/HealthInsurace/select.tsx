import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHealthInsurance } from "@/hooks/Health-Insurance/useHealthInsurance";
import { HealthInsurance } from "@/modules/healthInsurance/domain/HealthInsurance";
import { useEffect } from "react";

interface HealthInsuranceSelectProps {
  selected?: HealthInsurance;
  onHealthInsuranceChange: (value: HealthInsurance) => void;
}

export const HealthInsuranceSelect = ({
  selected,
  onHealthInsuranceChange,
}: HealthInsuranceSelectProps) => {
  const { healthInsurances } = useHealthInsurance({});

  useEffect(() => {
    if (!selected && healthInsurances.length > 0) {
      onHealthInsuranceChange(healthInsurances[0]);
    }
  }, [healthInsurances]);

  return (
    <Select
      value={selected?.id.toString()}
      onValueChange={(selectedId) => {
        const selectedHealthInsurance = healthInsurances.find(
          (hi) => String(hi.id) === selectedId
        );
        if (onHealthInsuranceChange && selectedHealthInsurance) {
          onHealthInsuranceChange(selectedHealthInsurance);
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
