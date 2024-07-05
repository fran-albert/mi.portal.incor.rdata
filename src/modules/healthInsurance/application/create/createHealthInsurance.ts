import { HealthInsurance } from "../../domain/HealthInsurance";
import { HealthInsuranceRepository } from "../../domain/HealthInsuranceRepository";


export function createHealthInsurance(healthInsuranceRepository: HealthInsuranceRepository) {
  return async (newHC: HealthInsurance): Promise<HealthInsurance | undefined> => {
    return await healthInsuranceRepository.createHealthInsurance(newHC);
  };
}
