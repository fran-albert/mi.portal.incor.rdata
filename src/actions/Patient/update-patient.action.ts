import { sleep } from "@/common/helpers/helpers";
import { Patient } from "@/types/Patient/Patient";
import axiosInstance from "@/services/axiosConfig";

export const updatePatient = async (id: number, patient: Patient) => {
    await sleep(2);
    const { data } = await axiosInstance.put<Patient>(`Patient/${id}`, patient);
    return data;
}
