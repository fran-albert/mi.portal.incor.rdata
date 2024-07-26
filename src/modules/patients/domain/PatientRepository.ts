import { Patient } from "./Patient";

export interface PatientRepository {
  fetchLastPatient: () => Promise<number>;
  getTotalPatients: () => Promise<number>;
}
