import axiosInstance from "@/services/axiosConfig";

export const getTotalLabs = async (): Promise<number> => {
    // await sleep(2);

    const { data } = await axiosInstance.get(`study/all/laboratories`);
    return data;
}