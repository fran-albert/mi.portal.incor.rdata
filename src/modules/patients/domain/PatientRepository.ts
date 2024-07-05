import { Patient } from "./Patient";

export interface PatientRepository {
  getPatient: (id: number) => Promise<Patient | null>;
  getAll: () => Promise<Patient[]>;
  createPatient: (newPatient: Patient) => Promise<Patient | undefined>;
  updatePatient: (id: number, patient: Patient) => Promise<Patient>;
  fetchLastPatient: () => Promise<number>;
  deletePatient: (idPatient: number) => Promise<Patient>;
  getTotalPatients: () => Promise<number>;
}
