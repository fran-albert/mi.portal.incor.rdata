import axiosInstance from "@/services/axiosConfig";
import { sleep } from "@/common/helpers/helpers";
import { UltraSound } from "@/types/Ultra-Sound/Ultra-Sound";

export const getUltraSoundImages = async (idStudy: number) => {
    await sleep(2);
    const { data } = await axiosInstance.get<UltraSound[]>(`Study/ultrasoundImages/byStudy/${idStudy}`);
    return data;
}
