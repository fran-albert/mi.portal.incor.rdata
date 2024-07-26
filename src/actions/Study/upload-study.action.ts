import { sleep } from "@/common/helpers/helpers";
import axios from "axios";

export const uploadStudy = async (formData: FormData) => {
    await sleep(2);
    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}Study/upload-study`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return data;
}
