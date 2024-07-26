import { HealthInsurance } from "./HealthInsurance";

export interface HealthInsuranceRepository {
  updateHealthInsurance: (idSpeciality: number, newSpeciality: HealthInsurance) => Promise<HealthInsurance>;
  createHealthInsurance: (newSpeciality: HealthInsurance) => Promise<HealthInsurance>;
  deleteHealthInsurance: (idSpeciality: number) => Promise<HealthInsurance>;
}
