import { getLabsDetail } from "@/actions/Study/Lab/get-labs-detailts.action";
import { useQuery } from "@tanstack/react-query"

interface Props {
    auth?: boolean;
    idUser?: number;
    fetchLabsDetails?: boolean;
    idStudy?: number;
}

export const useLab = ({ auth = true, idUser, fetchLabsDetails = false }: Props) => {

    const { isLoading: isLoadingLabsDetails, isError: isErrorLabsDetails, error: errorLabsDetails, data: labsDetails } = useQuery({
        queryKey: ["labsDetail", idUser],
        queryFn: () => getLabsDetail(Number(idUser)),
        staleTime: 1000 * 60,
        enabled: !!idUser && fetchLabsDetails
    });


    return {

        isLoadingLabsDetails, isErrorLabsDetails, errorLabsDetails, labsDetails
    }

}

