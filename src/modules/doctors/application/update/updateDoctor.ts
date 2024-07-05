import { Doctor } from "../../domain/Doctor";
import { DoctorRepository } from "../../domain/DoctorRepository";

export function updateDoctor(doctorRepository: DoctorRepository) {
  return async (updateDoctor: Doctor, id: number): Promise<Doctor> => {
    return await doctorRepository.updateDoctor(updateDoctor, id);
  };
}
