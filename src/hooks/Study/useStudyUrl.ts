import { getUrlByUserId } from "@/actions/Study/get-url-by-idUser.action";
import { Study } from "@/types/Study/Study";
import { useQuery } from "@tanstack/react-query";


export const useStudyUrls = (idUser: number | undefined, studies: Study[]) => {
    return useQuery({
        queryKey: ["studiesByUserId", { idUser }],
        queryFn: async () => {
            if (!idUser) return {};
            const urls: { [key: number]: string } = {};
            await Promise.all(
                studies.map(async (study) => {
                    if (study.locationS3) {
                        const url = await getUrlByUserId(idUser, study.locationS3);
                        urls[study.id] = url;
                    }
                })
            );
            return urls;
        },
        staleTime: 1000 * 60,
        enabled: !!idUser && studies.length > 0,
    });
};
