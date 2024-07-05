import { StudyRepository } from "../../domain/StudyRepository";
import { Study } from "../../domain/Study";

export function deleteStudy(studyRepository: StudyRepository) {
  return async (idStudy: number): Promise<string> => {
    return await studyRepository.deleteStudy(idStudy);
  };
}
