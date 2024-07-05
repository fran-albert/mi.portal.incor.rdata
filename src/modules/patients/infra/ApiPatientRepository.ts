import axiosInstance from "@/services/axiosConfig";
import { Patient } from "../domain/Patient";
import { PatientRepository } from "../domain/PatientRepository";
import axios from "axios";

export function createApiPatientRepository(): PatientRepository {
  async function getPatient(id: number): Promise<Patient | null> {
    const response = await axiosInstance.get(`Patient/${id}`);
    const patient = response.data as Patient;
    return patient;
  }

  async function getAll(): Promise<Patient[]> {
    const response = await axiosInstance.get(`Patient/all`, {});
    const patient = response.data as Patient[];
    return patient;
  }


  async function fetchLastPatient(): Promise<number> {
    const response = await axiosInstance.get(`Patient/lastPatients`);
    const patient = response.data;
    return patient;
  }

  async function getTotalPatients(): Promise<number> {
    const response = await axiosInstance.get(`Patient/all`, {});
    const patient = response.data as Patient[];
    const totalPatient = patient.length;
    return totalPatient;
  }

  async function createPatient(newPatient: Patient): Promise<Patient> {
    const response = await axiosInstance.post(`Patient/create`, newPatient);
    const patient = response.data as Patient;
    return patient;

  }

  async function updatePatient(
    idPatient: number,
    updatePatient: Patient,
  ): Promise<Patient> {
    // const response = await axios.put(
    //   `${process.env.NEXT_PUBLIC_BACKEND_API}Patient/${idPatient}`,
    //   updatePatient,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }
    // );
    const response = await axiosInstance.put(`Patient/${idPatient}`, updatePatient);
    const patient = response.data;
    return patient;
  }

  async function deletePatient(idPatient: number): Promise<Patient> {
    const response = await axiosInstance.delete(`Patient/${idPatient}`);
    const patient = response.data as Patient;
    return patient;
  }

  return {
    getPatient, fetchLastPatient,
    getAll,
    createPatient,
    updatePatient,
    deletePatient,
    getTotalPatients,
  };
}
