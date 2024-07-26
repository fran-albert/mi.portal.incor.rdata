import { sleep } from "@/common/helpers/helpers";
import { Doctor } from "@/modules/doctors/domain/Doctor";
import { Patient } from "@/types/Patient/Patient";
import axiosInstance from "@/services/axiosConfig";

export const createDoctor = async (doctor: Doctor) => {
    await sleep(2);
    const { data } = await axiosInstance.post<Doctor>(`/Doctor/create`, doctor);
    return data;
}
