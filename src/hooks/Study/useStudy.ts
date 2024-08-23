import { getAllStudyType } from "@/actions/Study/get-all-study-type.action";
import { getLastStudies } from "@/actions/Study/get-last-studies.action";
import { getStudiesByUserId } from "@/actions/Study/get-studies-by-idUser.action";
import { getTotalStudies } from "@/actions/Study/get-total-studies.action";
import { getLabsDetail } from "@/actions/Study/Lab/get-labs-detailts.action";
import { useQuery } from "@tanstack/react-query"

interface Props {
    auth?: boolean;
    idUser?: number;
    fetchTotal?: boolean;
    fetchLabsDetails?: boolean;
    idStudy?: number;
    fetchStudiesByUserId?: boolean;
    studyTypeId?: number;
    studyTypeAuth?: boolean;
}

export const useStudy = ({ auth = true, idUser, fetchTotal = false, fetchStudiesByUserId = false, studyTypeAuth = false, studyTypeId, fetchLabsDetails = false, idStudy }: Props) => {

    const { isLoading: isLoadingTotalStudies, isError: isErrorTotalStudies, error: errorTotalStudies, data: totalStudies = 0 } = useQuery({
        queryKey: ["totalStudies"],
        queryFn: () => getTotalStudies(),
        staleTime: 1000 * 60,
        enabled: auth && fetchTotal
    });


    const { isLoading: isLoadingTotalLabs, isError: isErrorTotalLabs, error: errorTotalLabs, data: totalLabs = 0 } = useQuery({
        queryKey: ["totalLabs"],
        queryFn: () => getTotalStudies(1),
        staleTime: 1000 * 60,
        enabled: auth && fetchTotal
    });

    const { isLoading: isLoadingLastLabs, isError: isErrorLastLabs, error: errorLastLabs, data: lastLabs = 0 } = useQuery({
        queryKey: ["lastLabs"],
        queryFn: () => getLastStudies(1),
        staleTime: 1000 * 60,
        enabled: auth && fetchTotal
    });

    const { isLoading: isLoadingLastStudies, isError: isErrorLastStudies, error: errorLastStudies, data: lastStudies = 0 } = useQuery({
        queryKey: ["lastStudies"],
        queryFn: () => getLastStudies(),
        staleTime: 1000 * 60,
        enabled: auth && fetchTotal
    });

    const { isLoading: isLoadingLastEcography, isError: isErrorLastEcography, error: errorLastEcography, data: lastEcography = 0 } = useQuery({
        queryKey: ["lastEcography"],
        queryFn: () => getLastStudies(2),
        staleTime: 1000 * 60,
        enabled: auth && fetchTotal
    });


    const { isLoading: isLoadingTotalEcography, isError: isErrorTotalEcography, error: errorTotalEcography, data: totalEcography = 0 } = useQuery({
        queryKey: ["totalEcography"],
        queryFn: () => getTotalStudies(2),
        staleTime: 1000 * 60,
        enabled: auth && fetchTotal
    });

    const { isLoading: isLoadingStudiesByUserId, isError: isErrorStudiesByUserId, error: errorStudiesByUserId, data: studiesByUserId } = useQuery({
        queryKey: ["studiesByUserId", idUser],
        queryFn: () => getStudiesByUserId(Number(idUser)),
        staleTime: 1000 * 60,
        enabled: !!idUser && fetchStudiesByUserId
    });

    const { isLoading: isLoadingLabsDetails, isError: isErrorLabsDetails, error: errorLabsDetails, data: LabsDetails } = useQuery({
        queryKey: ["labsDetail", idUser],
        queryFn: () => getLabsDetail(Number(idUser)),
        staleTime: 1000 * 60,
        enabled: !!idUser && fetchLabsDetails
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
        isLoadingStudyType, isErrorStudyType, errorStudyType, studyType,
        isLoadingLastLabs, isErrorLastLabs, errorLastLabs, lastLabs,
        isLoadingLastStudies, isErrorLastStudies, errorLastStudies, lastStudies,
        isLoadingLastEcography, isErrorLastEcography, errorLastEcography, lastEcography,
        isLoadingLabsDetails, isErrorLabsDetails, errorLabsDetails, LabsDetails
    }

}

