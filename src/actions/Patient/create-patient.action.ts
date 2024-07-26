import { sleep } from "@/common/helpers/helpers";
import { Patient } from "@/types/Patient/Patient";
import axiosInstance from "@/services/axiosConfig";

export const createPatient = async (patient: Patient) => {
    await sleep(2);
    const { data } = await axiosInstance.post<Patient>(`/Patient/create`, patient);
    return data;
}
