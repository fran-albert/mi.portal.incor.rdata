import { Speciality } from "../../domain/Speciality";
import { SpecialityRepository } from "../../domain/SpecialityRepository";

export function deleteSpeciality(specialityRepository: SpecialityRepository) {
  return async (idSpeciality: number): Promise<Speciality> => {
    return await specialityRepository.deleteSpeciality(idSpeciality);
  };
}
