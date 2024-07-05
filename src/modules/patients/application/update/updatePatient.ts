import { Patient } from "../../domain/Patient";
import { PatientRepository } from "../../domain/PatientRepository";

export function updatePatient(patientRepository: PatientRepository) {
  return async (id: number, updatePatient: Patient): Promise<Patient | undefined> => {
    return await patientRepository.updatePatient(id, updatePatient);
  };
}
