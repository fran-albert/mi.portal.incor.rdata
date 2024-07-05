import { Doctor } from "../../domain/Doctor";
import { DoctorRepository } from "../../domain/DoctorRepository";

export function createDoctor(doctorRepository: DoctorRepository) {
  return async (newDoctor: Doctor): Promise<Doctor | undefined> => {
    return await doctorRepository.createDoctor(newDoctor);
  };
}
