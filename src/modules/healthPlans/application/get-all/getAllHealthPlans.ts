import { HealthPlans } from "../../domain/HealthPlan";
import { HealthPlansRepository } from "../../domain/HealthPlansRepository";

export function getAll(healthPlans: HealthPlansRepository) {
  return async (): Promise<HealthPlans[]> => {
    return await healthPlans.getAll();
  };
}
