import { Patient } from "../../domain/Patient";
import { PatientRepository } from "../../domain/PatientRepository";

export function deletePatient(patientRepository: PatientRepository) {
  return async (idPatient: number): Promise<Patient> => {
    return await patientRepository.deletePatient(idPatient);
  };
}
