import { HealthPlans } from "../../domain/HealthPlan";
import { HealthPlansRepository } from "../../domain/HealthPlansRepository";

export function getByHealthInsurance(healthPlans: HealthPlansRepository) {
  return async (id: number): Promise<HealthPlans[]> => {
    return (await healthPlans.getByHealthInsurance(id)) || [];
  };
}
