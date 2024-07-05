import { HealthInsuranceRepository } from "../../domain/HealthInsuranceRepository";

export function getTotalHealthInsurances(healthInsurance: HealthInsuranceRepository) {
    return async (): Promise<number> => {
        return await healthInsurance.getTotalHealthInsurances();
    };
}
