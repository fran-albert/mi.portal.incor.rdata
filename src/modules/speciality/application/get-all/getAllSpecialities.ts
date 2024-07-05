import { Speciality } from "../../domain/Speciality";
import { SpecialityRepository } from "../../domain/SpecialityRepository";

export function getAllSpecialities(specialityRepository: SpecialityRepository) {
  return async (): Promise<Speciality[]> => {
    return await specialityRepository.getAllSpecialities();
  };
}
