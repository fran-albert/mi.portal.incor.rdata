import { getTotalEcography } from "@/actions/Ecography/get-total-ecography.action";
import { getTotalLabs } from "@/actions/Labs/get-total-labs.action";
import { getAllStudyType } from "@/actions/Study/get-all-study-type.action";
import { getStudiesByUserId } from "@/actions/Study/get-studies-by-idUser.action";
import { getTotalStudies } from "@/actions/Study/get-total-studies.action";
import { useQuery } from "@tanstack/react-query"

interface Props {
    auth?: boolean;
    idUser?: number;
    fetchTotal?: boolean;
    fetchStudiesByUserId?: boolean;
    studyTypeAuth?: boolean;
}

export const useStudy = ({ auth = true, idUser, fetchTotal = false, fetchStudiesByUserId = false, studyTypeAuth = false }: Props) => {

    const { isLoading: isLoadingTotalStudies, isError: isErrorTotalStudies, error: errorTotalStudies, data: totalStudies = 0 } = useQuery({
        queryKey: ["totalStudies"],
        queryFn: () => getTotalStudies(),
        staleTime: 1000 * 60,
        enabled: auth && fetchTotal
    });


    const { isLoading: isLoadingTotalLabs, isError: isErrorTotalLabs, error: errorTotalLabs, data: totalLabs = 0 } = useQuery({
        queryKey: ["totalLabs"],
        queryFn: () => getTotalLabs(),
        staleTime: 1000 * 60,
        enabled: auth && fetchTotal
    });

    const { isLoading: isLoadingTotalEcography, isError: isErrorTotalEcography, error: errorTotalEcography, data: totalEcography = 0 } = useQuery({
        queryKey: ["totalEcography"],
        queryFn: () => getTotalEcography(),
        staleTime: 1000 * 60,
        enabled: auth && fetchTotal
    });

    const { isLoading: isLoadingStudiesByUserId, isError: isErrorStudiesByUserId, error: errorStudiesByUserId, data: studiesByUserId } = useQuery({
        queryKey: ["studiesByUserId", idUser],
        queryFn: () => getStudiesByUserId(Number(idUser)),
        staleTime: 1000 * 60,
        enabled: !!idUser && fetchStudiesByUserId
    });

    const { isLoading: isLoadingStudyType, isError: isErrorStudyType, error: errorStudyType, data: studyType } = useQuery({
        queryKey: ["studyType"],
        queryFn: () => getAllStudyType(),
        staleTime: 1000 * 60,
        enabled: studyTypeAuth
    });

    return {
        isLoadingTotalStudies, isErrorTotalStudies, errorTotalStudies, totalStudies,
        isLoadingTotalLabs, isErrorTotalLabs, errorTotalLabs, totalLabs,
        isLoadingTotalEcography, isErrorTotalEcography, errorTotalEcography, totalEcography,
        isLoadingStudiesByUserId, isErrorStudiesByUserId, errorStudiesByUserId, studiesByUserId,
        isLoadingStudyType, isErrorStudyType, errorStudyType, studyType
    }

}

