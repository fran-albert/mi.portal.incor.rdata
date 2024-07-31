import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HealthPlans } from "@/modules/healthPlans/domain/HealthPlan";
import { createApiHealthPlansRepository } from "@/modules/healthPlans/infra/ApiHealthPlansRepository";
import { useEffect, useState, useCallback } from "react";

interface HealthPlanSelectProps {
  selected?: HealthPlans;
  onPlanChange: (value: HealthPlans | null) => void;
  idHealthInsurance: number;
}

export const HealthPlanSelect = ({
  selected,
  onPlanChange,
  idHealthInsurance,
}: HealthPlanSelectProps) => {
  const [healthPlans, setHealthPlans] = useState<HealthPlans[]>([]);
  const healthPlansRepository = createApiHealthPlansRepository();
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>(
    selected?.id.toString()
  );

  const handlePlanChange = useCallback(
    (value: HealthPlans | null) => {
      onPlanChange(value);
    },
    [onPlanChange]
  );

  useEffect(() => {
    const loadHealthPlans = async () => {
      const loadedHealthPlans =
        await healthPlansRepository.getByHealthInsurance(idHealthInsurance);
      setHealthPlans(loadedHealthPlans || []);
      if (loadedHealthPlans && loadedHealthPlans.length > 0) {
        const firstPlan = loadedHealthPlans[0];
        handlePlanChange(firstPlan);
        setSelectedPlanId(firstPlan.id.toString());
      } else {
        handlePlanChange(null);
        setSelectedPlanId(undefined);
      }
    };

    if (idHealthInsurance) {
      loadHealthPlans();
    } else {
      setHealthPlans([]);
      handlePlanChange(null);
      setSelectedPlanId(undefined);
    }
  }, [idHealthInsurance, healthPlansRepository, handlePlanChange]);

  useEffect(() => {
    if (selected) {
      setSelectedPlanId(selected.id.toString());
    }
  }, [selected]);

  const handleValueChange = (idHI: string) => {
    const healthPlan = healthPlans.find((c) => c.id === Number(idHI));
    if (healthPlan) {
      handlePlanChange(healthPlan);
      setSelectedPlanId(idHI);
    }
  };

  return (
    <Select value={selectedPlanId} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Seleccione el plan..." />
      </SelectTrigger>
      <SelectContent>
        {healthPlans?.map((healthPlan) => (
          <SelectItem key={healthPlan.id} value={String(healthPlan.id)}>
            {healthPlan.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
