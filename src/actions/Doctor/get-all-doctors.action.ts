import { sleep } from "@/common/helpers/helpers";
import { slugify } from "@/lib/utils";
import { Doctor } from "@/modules/doctors/domain/Doctor";
import axiosInstance from "@/services/axiosConfig";

export const getDoctors = async (page?: number): Promise<Doctor[]> => {
    // await sleep(2);

    const params = new URLSearchParams();
    params.append('page', `${page}`);
    params.append('per_page', '5');

    const { data } = await axiosInstance.get<Doctor[]>(`Doctor/all`, { params });
    const doctorWithSlugs = data.map(doctor => ({
        ...doctor,
        slug: slugify(`${doctor.firstName} ${doctor.lastName}`, doctor.userId)
    }));

    return doctorWithSlugs;
}
