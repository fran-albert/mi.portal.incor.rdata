import { User } from "@/types/User/User";
import axiosInstance from "@/services/axiosConfig";

export const forgotPassword = async (email: string) => {
    // await sleep(2);
    const { data } = await axiosInstance.post(
        `Account/forgot/password?email=${email}`,
        email
    );
    return data;
}
