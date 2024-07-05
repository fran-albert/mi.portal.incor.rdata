import { HealthInsurance } from "./HealthInsurance";

export interface HealthInsuranceRepository {
  getAll: () => Promise<HealthInsurance[]>;
  getTotalHealthInsurances: () => Promise<number>;
  updateHealthInsurance: (idSpeciality: number, newSpeciality: HealthInsurance) => Promise<HealthInsurance>;
  createHealthInsurance: (newSpeciality: HealthInsurance) => Promise<HealthInsurance>;
  deleteHealthInsurance: (idSpeciality: number) => Promise<HealthInsurance>;
}
