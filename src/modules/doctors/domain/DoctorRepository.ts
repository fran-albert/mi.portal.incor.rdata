import { Doctor } from "./Doctor";

export interface DoctorRepository {
  fetchLastDoctors: () => Promise<number>;
  getTotalDoctors: () => Promise<number>;
}
