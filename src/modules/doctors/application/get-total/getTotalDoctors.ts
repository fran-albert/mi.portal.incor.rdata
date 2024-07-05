import { DoctorRepository } from "../../domain/DoctorRepository";

export function getTotalPatients(doctorRepository: DoctorRepository) {
  return async (): Promise<number> => {
    return await doctorRepository.getTotalDoctors();
  };
}
