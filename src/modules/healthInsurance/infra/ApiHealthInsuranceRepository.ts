import axiosInstance from "@/services/axiosConfig";
import { HealthInsuranceRepository } from "../domain/HealthInsuranceRepository";
import { HealthInsurance } from "../domain/HealthInsurance";

export function createApiHealthInsuranceRepository(): HealthInsuranceRepository {
  async function getAll(): Promise<HealthInsurance[]> {
    const response = await axiosInstance.get(`HealthInsurance/all`);
    const healthInsurance = response.data as HealthInsurance[];
    return healthInsurance;
  }

  async function getTotalHealthInsurances(): Promise<number> {
    const response = await axiosInstance.get(`HealthInsurance/all`, {});
    const hc = response.data as HealthInsurance[];
    const totalHC = hc.length;
    return totalHC;
  }

  async function updateHealthInsurance(
    idHc: number,
    newHC: HealthInsurance
  ): Promise<HealthInsurance> {
    const response = await axiosInstance.put(
      `HealthInsurance/${idHc}`,
      newHC
    );
    const HC = response.data as HealthInsurance;
    return HC;
  }

  async function createHealthInsurance(
    newHC: HealthInsurance
  ): Promise<HealthInsurance> {
    const response = await axiosInstance.post(
      "HealthInsurance/create",
      newHC
    );
    const hc = response.data as HealthInsurance;
    return hc;
  }

  async function deleteHealthInsurance(idHealthInsurance: number): Promise<HealthInsurance> {
    const response = await axiosInstance.delete(`HealthInsurance/${idHealthInsurance}`);
    const healthInsurance = response.data as HealthInsurance;
    return healthInsurance;
  }


  return {
    getAll, getTotalHealthInsurances, updateHealthInsurance, createHealthInsurance, deleteHealthInsurance
  };
}
