import { Patient } from "../../domain/Patient";
import { PatientRepository } from "../../domain/PatientRepository";

export function getAllPatients(patientRepository: PatientRepository) {
  return async (): Promise<Patient[]> => {
    return await patientRepository.getAll();
  };
}
