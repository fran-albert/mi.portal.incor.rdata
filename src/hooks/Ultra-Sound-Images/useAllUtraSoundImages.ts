import { useQuery } from "@tanstack/react-query";
import { getUrlByUserId } from "@/actions/Study/get-url-by-idUser.action";
import { Study } from "@/types/Study/Study";
import { getUltraSoundImages } from "@/actions/Study/Ultra-Sounds/get-ultra-sound-image.action";
import { UltraSound } from "@/types/Ultra-Sound/Ultra-Sound";

export const useAllUltraSoundImages = (idUser: number | undefined, studies: Study[]) => {
    return useQuery({
        queryKey: ["studiesByUserId", { idUser }],
        queryFn: async () => {
            if (!idUser) return {};
            const allImages: { [key: number]: string[] } = {};
            await Promise.all(
                studies.map(async (study) => {
                    if (Number(study.studyType?.id) === 2) {
                        const images: UltraSound[] = await getUltraSoundImages(study.id);
                        const imageUrls = await Promise.all(
                            images.map(async (image) => {
                                const url = await getUrlByUserId(idUser, image.locationS3);
                                return url;
                            })
                        );
                        allImages[study.id] = imageUrls;
                    }
                })
            );
            return allImages;
        },
        staleTime: 1000 * 60,
        enabled: !!idUser && studies.length > 0
    });
};
