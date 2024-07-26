import { sleep } from "@/common/helpers/helpers";
import { Patient } from "@/modules/patients/domain/Patient";
import axiosInstance from "@/services/axiosConfig";

export const deletePatient = async (id: number) => {
    await sleep(2);
    const { data } = await axiosInstance.delete<Patient>(`Patient/${id}`);
    return data;
}
