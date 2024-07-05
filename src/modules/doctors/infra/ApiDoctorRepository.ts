import axiosInstance from "@/services/axiosConfig";
import { Doctor } from "../domain/Doctor";
import { DoctorRepository } from "../domain/DoctorRepository";
import axios from "axios";

export function createApiDoctorRepository(): DoctorRepository {
  async function getDoctor(id: number): Promise<Doctor> {
    const response = await axiosInstance.get(`doctor/${id}`);
    const doctor = response.data as Doctor;
    return doctor;
  }

  async function getAllDoctors(): Promise<Doctor[]> {
    const response = await axiosInstance.get(`doctor/all`);
    const doctors = response.data as Doctor[];
    return doctors;
  }

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

  async function createDoctor(newDoctor: Doctor): Promise<Doctor> {
    const response = await axiosInstance.post(`Doctor/create`, newDoctor);
    const doctor = response.data as Doctor;
    return doctor;
  }

  async function updateDoctor(
    updateDoctor: Doctor,
    idDoctor: number
  ): Promise<Doctor> {
    const response = await axiosInstance.put(
      `Doctor/${idDoctor}`,
      updateDoctor
    );
    const doctor = response.data as Doctor;
    return doctor;
  }

  async function deleteDoctor(idDoctor: number): Promise<Doctor> {
    const response = await axiosInstance.delete(`doctor/${idDoctor}`);
    const doctor = response.data as Doctor;
    return doctor;
  }

  return {
    getDoctor,
    getAllDoctors,
    createDoctor,
    updateDoctor, fetchLastDoctors,
    getTotalDoctors,
    deleteDoctor,
  };
}
