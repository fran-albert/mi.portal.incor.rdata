import { Study } from "./Study";

export interface StudyRepository {
  getAllStudyType: () => Promise<Study[]>;
  uploadStudy: (formData: FormData) => Promise<Study>;
  getAllStudyByPatient: (idPatient: number) => Promise<Study[]>;
  deleteStudy: (idStudy: number) => Promise<string>;
  getUrlByPatient: (idPatient: number, locationS3: string | undefined) => Promise<string>;
}
