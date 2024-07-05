import { Doctor } from "../../domain/Doctor";
import { DoctorRepository } from "../../domain/DoctorRepository";

export function getAllDoctors(doctorRepository: DoctorRepository) {
  return async (): Promise<Doctor[]> => {
    return await doctorRepository.getAllDoctors();
  };
}
