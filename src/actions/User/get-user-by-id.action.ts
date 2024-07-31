import { sleep } from "@/common/helpers/helpers";
import { Patient } from "@/types/Patient/Patient";
import axiosInstance from "@/services/axiosConfig";
import { getRegisterBy } from "../User/get-register-by-id.action";
import { slugify } from "@/lib/utils";
import { User } from "@/types/User/User";

export const getUserById = async (id: number) => {
    // await sleep(2);
    const { data } = await axiosInstance.get<User>(`Account/${id}`);
    return data;
}
