import axiosInstance from "@/services/axiosConfig";

export const getTotalEcography = async (): Promise<number> => {
    // await sleep(2);

    const { data } = await axiosInstance.get(`study/all/ecografia`);
    return data;
}