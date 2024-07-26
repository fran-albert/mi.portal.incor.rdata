import { sleep } from "@/common/helpers/helpers";
import axiosInstance from "@/services/axiosConfig";
import { getRegisterBy } from "../User/get-register-by-id.action";
import { slugify } from "@/lib/utils";
import { Doctor } from "@/types/Doctor/Doctor";

export const getDoctorById = async (id: number) => {
    await sleep(2);
    const { data } = await axiosInstance.get<Doctor>(`Doctor/${id}`);
    const registerBy = await getRegisterBy(Number(data.registeredById));
    const slug = slugify(`${data.firstName} ${data.lastName}`, data.userId)
    const doctor = {
        ...data,
        slug: slug,
        registerBy: registerBy
    }
    return doctor;
}
