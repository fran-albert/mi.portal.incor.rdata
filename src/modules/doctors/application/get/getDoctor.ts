import { Doctor } from "../../domain/Doctor";
import { DoctorRepository } from "../../domain/DoctorRepository";

export function getDoctor(doctorRepository: DoctorRepository) {
  return async (idDoctor: number): Promise<Doctor> => {
    return await doctorRepository.getDoctor(idDoctor);
  };
}
