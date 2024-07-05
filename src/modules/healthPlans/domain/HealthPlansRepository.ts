import { HealthPlans } from "./HealthPlan";

export interface HealthPlansRepository {
  getAll: () => Promise<HealthPlans[]>;
  getByHealthInsurance: (id: number) => Promise<HealthPlans[] | undefined>;
}
