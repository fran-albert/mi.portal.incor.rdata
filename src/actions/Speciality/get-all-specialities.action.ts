import { Speciality } from "@/modules/speciality/domain/Speciality";
import axiosInstance from "@/services/axiosConfig";

export const getSpecialities = async (): Promise<Speciality[]> => {
    // await sleep(2);
    const { data } = await axiosInstance.get<Speciality[]>(`speciality/all`);
    return data
}
