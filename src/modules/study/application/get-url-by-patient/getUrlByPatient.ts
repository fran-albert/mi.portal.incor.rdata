import { Study } from "../../domain/Study";
import { StudyRepository } from "../../domain/StudyRepository";

export function getUrlByPatient(studyRepository: StudyRepository) {
  return async (idPatient: number, locationS3: string | undefined): Promise<string> => {
    return await studyRepository.getUrlByPatient(idPatient, locationS3);
  };
}
