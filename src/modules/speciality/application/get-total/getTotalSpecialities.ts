import { SpecialityRepository } from "../../domain/SpecialityRepository";

export function getTotalSpecialities(specialityRepository: SpecialityRepository) {
  return async (): Promise<number> => {
    return await specialityRepository.getTotalSpecialities();
  };
}
