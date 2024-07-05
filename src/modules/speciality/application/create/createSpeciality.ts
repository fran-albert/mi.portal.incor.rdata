import { Speciality } from "../../domain/Speciality";
import { SpecialityRepository } from "../../domain/SpecialityRepository";

export function createSpeciality(specialityRepository: SpecialityRepository) {
  return async (newSpeciality: Speciality): Promise<Speciality | undefined> => {
    return await specialityRepository.createSpeciality(newSpeciality);
  };
}
