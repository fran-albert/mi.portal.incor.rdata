import { sleep } from "@/common/helpers/helpers";
import { slugify } from "@/lib/utils";
import { Patient } from "@/types/Patient/Patient";
import axiosInstance from "@/services/axiosConfig";

export const getPatients = async (page?: number): Promise<Patient[]> => {
    // await sleep(2);

    const params = new URLSearchParams();
    params.append('page', `${page}`);
    params.append('per_page', '5');

    const { data } = await axiosInstance.get<Patient[]>(`Patient/all`, { params });
    const patientsWithSlugs = data.map(patient => ({
        ...patient,
        slug: slugify(`${patient.firstName} ${patient.lastName}`, patient.userId)
    }));

    return patientsWithSlugs;
}
