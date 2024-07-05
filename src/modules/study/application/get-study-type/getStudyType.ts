import { StudyRepository } from "../../domain/StudyRepository";
import { Study } from "../../domain/Study";

export function getAllStudyType(studyRepository: StudyRepository) {
  return async (): Promise<Study[]> => {
    return await studyRepository.getAllStudyType();
  };
}
