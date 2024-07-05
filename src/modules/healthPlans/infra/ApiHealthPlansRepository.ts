import axiosInstance from "@/services/axiosConfig";
import { HealthPlansRepository } from "../domain/HealthPlansRepository";
import { HealthPlans } from "../domain/HealthPlan";

export function createApiHealthPlansRepository(): HealthPlansRepository {
  async function getAll(): Promise<HealthPlans[]> {
    const response = await axiosInstance.get(`HealthPlan/all`);
    const healthInsurance = response.data as HealthPlans[];
    return healthInsurance;
  }

  async function getByHealthInsurance(id: number): Promise<HealthPlans[]> {
    const response = await axiosInstance.get(`HealthPlan/byHealthInsurance/${id}`);
    const healthInsurance = response.data as HealthPlans[];
    return healthInsurance;
  }

  return {
    getByHealthInsurance,
    getAll,
  };
}
