import { HealthInsurance } from "../../domain/HealthInsurance";
import { HealthInsuranceRepository } from "../../domain/HealthInsuranceRepository";

export function getAll(healthInsurance: HealthInsuranceRepository) {
  return async (): Promise<HealthInsurance[]> => {
    return await healthInsurance.getAll();
  };
}
