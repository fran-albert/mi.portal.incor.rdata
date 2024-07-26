import { sleep } from "@/common/helpers/helpers";
import { User } from "@/modules/users/domain/User";
import axiosInstance from "@/services/axiosConfig";

export const getRegisterBy = async (id: number) => {
    await sleep(2);
    const { data } = await axiosInstance.get<User>(`Account/${id}`);
    return data;
}
