import axiosInstance from "@/services/axiosConfig";
import { StudyRepository } from "../domain/StudyRepository";
import { Study } from "../domain/Study";
import axios from "axios";

export function createApiStudyRepository(): StudyRepository {
  async function getAllStudyType(): Promise<Study[]> {
    const response = await axiosInstance.get("StudyType/all");
    const studies = response.data as Study[];
    return studies;
  }

  async function uploadStudy(formData: FormData): Promise<Study> {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API}Study/upload-study`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  async function getAllStudyByPatient(idPatient: number): Promise<Study[]> {
    const response = await axiosInstance.get(`Study/byPatient/${idPatient}`);
    const studies = response.data as Study[];
    return studies;
  }

  async function deleteStudy(idStudy: number): Promise<string> {
    const response = await axiosInstance.delete(`Study/${idStudy}`);
    const studies = response.data;
    return studies;
  }

  async function getUrlByPatient(idPatient: number, locationS3: string | undefined): Promise<string> {
    const response = await axiosInstance.get(`Study/getUrl/${idPatient}?fileName=${locationS3}`);
    const studies = response.data;
    return studies;
  }

  async function getTotalStudies(): Promise<number> {
    const response = await axiosInstance.get("Study/all");
    const totalStudies = response.data;
    return totalStudies;
  }

  async function getTotalEcography(): Promise<number> {
    const response = await axiosInstance.get("Study/all/ecografia");
    const totalStudies = response.data;
    return totalStudies;
  }


  return {
    getAllStudyType, getUrlByPatient, deleteStudy,
    getAllStudyByPatient, getTotalStudies, getTotalEcography,
    uploadStudy,
  };
}
