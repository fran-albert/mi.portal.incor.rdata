import axiosInstance from "@/services/axiosConfig";
import { Doctor } from "../domain/Doctor";
import { DoctorRepository } from "../domain/DoctorRepository";
import axios from "axios";

export function createApiDoctorRepository(): DoctorRepository {




  async function fetchLastDoctors(): Promise<number> {
    const response = await axiosInstance.get(`doctor/lastDoctors`);
    const doctors = response.data;
    return doctors;
  }

  async function getTotalDoctors(): Promise<number> {
    const response = await axiosInstance.get(`doctor/all`);
    const doctor = response.data as Doctor[];
    const totalDoctor = doctor.length;
    return totalDoctor;
  }


  return {
    fetchLastDoctors,
    getTotalDoctors,
  };
}
