import { Speciality } from "../../domain/Speciality";
import { SpecialityRepository } from "../../domain/SpecialityRepository";

export function updateSpeciality(specialityRepository: SpecialityRepository) {
  return async (
    idSpeciality: number,
    newSpeciality: Speciality
  ): Promise<Speciality | undefined> => {
    return await specialityRepository.updateSpeciality(
      idSpeciality,
      newSpeciality
    );
  };
}
