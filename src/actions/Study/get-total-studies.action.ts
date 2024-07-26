import axiosInstance from "@/services/axiosConfig";

export const getTotalStudies = async (): Promise<number> => {
    // await sleep(2);

    const { data } = await axiosInstance.get(`study/all`);
    return data;
}