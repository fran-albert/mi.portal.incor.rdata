import { sleep } from "@/common/helpers/helpers";
import axiosInstance from "@/services/axiosConfig";
import { Doctor } from "@/modules/doctors/domain/Doctor";

export const deleteDoctor = async (id: number) => {
    await sleep(2);
    const { data } = await axiosInstance.delete<Doctor>(`Doctor/${id}`);
    return data;
}
