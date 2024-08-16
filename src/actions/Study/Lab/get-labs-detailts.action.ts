import axiosInstance from "@/services/axiosConfig";
import { sleep } from "@/common/helpers/helpers";
import { Lab } from "@/types/Lab/Lab";

export const getLabsDetail = async (idStudy: number) => {
    await sleep(2);
    const { data } = await axiosInstance.get<Lab[]>(`Study/laboratories/${idStudy}`);
    return data;
}
