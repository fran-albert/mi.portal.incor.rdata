import { getTotalEcography } from "@/actions/Ecography/get-total-ecography.action";
import { getTotalLabs } from "@/actions/Labs/get-total-labs.action";
import { getTotalStudies } from "@/actions/Study/get-total-studies.action";
import { useQuery } from "@tanstack/react-query"

interface Props {
    auth?: boolean;
}

export const useStudy = ({ auth }: Props) => {

    const { isLoading: isLoadingTotalStudies, isError: isErrorTotalStudies, error: errorTotalStudies, data: totalStudies = 0 } = useQuery({
        queryKey: ["totalStudies"],
        queryFn: () => getTotalStudies(),
        staleTime: 1000 * 60,
        enabled: auth
    });


    const { isLoading: isLoadingTotalLabs, isError: isErrorTotalLabs, error: errorTotalLabs, data: totalLabs = 0 } = useQuery({
        queryKey: ["totalLabs"],
        queryFn: () => getTotalLabs(),
        staleTime: 1000 * 60,
        enabled: auth
    });

    const { isLoading: isLoadingTotalEcography, isError: isErrorTotalEcography, error: errorTotalEcography, data: totalEcography = 0 } = useQuery({
        queryKey: ["totalEcography"],
        queryFn: () => getTotalEcography(),
        staleTime: 1000 * 60,
        enabled: auth
    });

    return {
        isLoadingTotalStudies, isErrorTotalStudies, errorTotalStudies, totalStudies,
        isLoadingTotalLabs, isErrorTotalLabs, errorTotalLabs, totalLabs,
        isLoadingTotalEcography, isErrorTotalEcography, errorTotalEcography, totalEcography,
    }

}