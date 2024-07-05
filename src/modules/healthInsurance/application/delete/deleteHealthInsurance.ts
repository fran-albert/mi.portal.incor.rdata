import { HealthInsurance } from "../../domain/HealthInsurance";
import { HealthInsuranceRepository } from "../../domain/HealthInsuranceRepository";

export function deleteHealthInsurance(healthInsurance: HealthInsuranceRepository) {
    return async (idHealthInsurance: number): Promise<HealthInsurance> => {
        return await healthInsurance.deleteHealthInsurance(idHealthInsurance);
    };
}
