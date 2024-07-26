import { getDoctorById } from "@/actions/Doctor/get-doctor-by-id.action";
import { getPatientById } from "@/actions/Patient/get-patient-by-id.action";
import { useQuery } from "@tanstack/react-query"

interface Props {
    auth?: boolean;
    id: number
}

export const useDoctor = ({ auth, id }: Props) => {

    const { isLoading, isError, error, data: doctor, isFetching } = useQuery({
        queryKey: ['doctor', id],
        queryFn: () => getDoctorById(id),
        staleTime: 1000 * 60,
        enabled: auth
    });


    return {
        doctor,
        error,
        isLoading,
        isError, isFetching,
    }

}