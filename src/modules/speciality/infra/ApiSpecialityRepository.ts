import axiosInstance from "@/services/axiosConfig";
import { SpecialityRepository } from "../domain/SpecialityRepository";
import { Speciality } from "../domain/Speciality";

export function createApiSpecialityRepository(): SpecialityRepository {
  async function updateSpeciality(
    idSpeciality: number,
    newSpeciality: Speciality
  ): Promise<Speciality> {
    const response = await axiosInstance.put(
      `Speciality/${idSpeciality}`,
      newSpeciality
    );
    const speciality = response.data as Speciality;
    return speciality;
  }

  async function createSpeciality(
    newSpeciality: Speciality
  ): Promise<Speciality> {
    const response = await axiosInstance.post(
      "Speciality/create",
      newSpeciality
    );
    const speciality = response.data as Speciality;
    return speciality;
  }

  async function deleteSpeciality(idSpeciality: number): Promise<Speciality> {
    const response = await axiosInstance.delete(`Speciality/${idSpeciality}`);
    const speciality = response.data as Speciality;
    return speciality;
  }

  return {
    updateSpeciality,
    createSpeciality,
    deleteSpeciality,
  };
}
