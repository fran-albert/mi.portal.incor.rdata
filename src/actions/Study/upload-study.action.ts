import { sleep } from "@/common/helpers/helpers";
import axiosInstance from "@/services/axiosConfig";
import axios from "axios";

export const uploadStudy = async (formData: FormData) => {
    await sleep(2);
    const { data } = await axiosInstance.post(
        `/Study/upload-study`,
        formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }
    )
    return data;
}
