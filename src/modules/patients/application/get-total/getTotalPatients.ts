import { PatientRepository } from "../../domain/PatientRepository";

export function getTotalPatients(patientRepository: PatientRepository) {
  return async (): Promise<number> => {
    return await patientRepository.getTotalPatients();
  };
}
