import { sleep } from "@/common/helpers/helpers";
import { Patient } from "@/types/Patient/Patient";
import axiosInstance from "@/services/axiosConfig";
import { getRegisterBy } from "../User/get-register-by-id.action";
import { slugify } from "@/lib/utils";

export const getPatientById = async (id: number) => {
    // await sleep(2);
    const { data } = await axiosInstance.get<Patient>(`Patient/${id}`);
    const slug = slugify(`${data.firstName} ${data.lastName}`, data.userId)
    const patient = {
        ...data,
        slug: slug,
    }
    return patient;
}
