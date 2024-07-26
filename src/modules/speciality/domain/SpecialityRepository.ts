import { Speciality } from "./Speciality";

export interface SpecialityRepository {
  createSpeciality: (
    newSpeciality: Speciality
  ) => Promise<Speciality | undefined>;
  updateSpeciality: (
    idSpeciality: number,
    newSpeciality: Speciality
  ) => Promise<Speciality>;
  deleteSpeciality: (idSpeciality: number) => Promise<Speciality>;
}
