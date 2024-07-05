import { StudyRepository } from "../../domain/StudyRepository";
import { Study } from "../../domain/Study";

export function getAllStudyByPatient(studyRepository: StudyRepository) {
  return async (idPatient: number): Promise<Study[]> => {
    return await studyRepository.getAllStudyByPatient(idPatient);
  };
}
