import { sleep } from "@/common/helpers/helpers";
import { slugify } from "@/lib/utils";
import { HealthInsurance } from "@/modules/healthInsurance/domain/HealthInsurance";
import { Patient } from "@/modules/patients/domain/Patient";
import axiosInstance from "@/services/axiosConfig";

export const getHealthInsurances = async (page?: number): Promise<HealthInsurance[]> => {
    // await sleep(2);

    const params = new URLSearchParams();
    params.append('page', `${page}`);
    params.append('per_page', '5');

    const { data } = await axiosInstance.get<HealthInsurance[]>(`HealthInsurance/all`, { params });


    return data;
}
