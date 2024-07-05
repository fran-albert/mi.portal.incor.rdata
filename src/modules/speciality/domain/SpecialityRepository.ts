import { Speciality } from "./Speciality";

export interface SpecialityRepository {
  //   getSpeciality: (id: number) => Promise<Speciality | undefined>;
  getAllSpecialities: () => Promise<Speciality[]>;
  getTotalSpecialities: () => Promise<number>;
  createSpeciality: (
    newSpeciality: Speciality
  ) => Promise<Speciality | undefined>;
  updateSpeciality: (
    idSpeciality: number,
    newSpeciality: Speciality
  ) => Promise<Speciality>;
  deleteSpeciality: (idSpeciality: number) => Promise<Speciality>;
}
