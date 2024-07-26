import { Study } from "./Study";

export interface StudyRepository {
  getAllStudyType: () => Promise<Study[]>;
  uploadStudy: (formData: FormData) => Promise<Study>;
  getAllStudyByPatient: (idPatient: number) => Promise<Study[]>;
  getTotalStudies: () => Promise<number>;
  getTotalEcography: () => Promise<number>;
  deleteStudy: (idStudy: number) => Promise<string>;
  getUrlByPatient: (idPatient: number, locationS3: string | undefined) => Promise<string>;
}
