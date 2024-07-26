import { sleep } from "@/common/helpers/helpers";
import { Doctor } from "@/types/Doctor/Doctor";
import axiosInstance from "@/services/axiosConfig";

export const updateDoctor = async (id: number, doctor: Doctor) => {
    await sleep(2);
    const { data } = await axiosInstance.put<Doctor>(`Doctor/${id}`, doctor);
    return data;
}
