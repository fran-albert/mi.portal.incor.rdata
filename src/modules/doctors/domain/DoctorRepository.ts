import { Doctor } from "./Doctor";

export interface DoctorRepository {
  getDoctor: (id: number) => Promise<Doctor>;
  getAllDoctors: () => Promise<Doctor[]>;
  fetchLastDoctors: () => Promise<number>;
  createDoctor: (newDoctor: Doctor) => Promise<Doctor | undefined>;
  updateDoctor: (doctor: Doctor, id: number) => Promise<Doctor>;
  deleteDoctor: (idDoctor: number) => Promise<Doctor>;
  getTotalDoctors: () => Promise<number>;
}
