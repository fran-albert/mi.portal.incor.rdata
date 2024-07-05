import { HealthInsurance } from "../../domain/HealthInsurance";
import { HealthInsuranceRepository } from "../../domain/HealthInsuranceRepository";

export function updateHealthInsurance(healthInsurance: HealthInsuranceRepository) {
  return async (
    idHC: number,
    newHC: HealthInsurance
  ): Promise<HealthInsurance | undefined> => {
    return await healthInsurance.updateHealthInsurance(
      idHC,
      newHC
    );
  };
}
