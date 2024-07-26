import { Labs } from '@/modules/labs/domain/Labs';
import { createApiLabRepository } from '@/modules/labs/infra/ApiLabRepository';
import { create } from 'zustand';

const labRepository = createApiLabRepository();

interface LabsState {
    isLoading: boolean;
    error: string | null;
    totalLabs: number;
    labsDetails: Labs[];
    setIsLoading: (isLoading: boolean) => void;
    // fetchAllStudies: () => Promise<void>;
    fetchTotalLabs: () => Promise<number>;
    fetchLabsDetails: (idUser: number) => Promise<void>;
}

const useLabStore = create<LabsState>((set) => ({
    isLoading: false,
    totalLabs: 0,
    labsDetails: [],
    error: null,
    setIsLoading: (isLoading: boolean) => set({ isLoading }),

    fetchTotalLabs: async () => {
        set({ isLoading: true, error: null });
        try {
            const totalLabs = await labRepository.getTotalLabs();
            set({ totalLabs, isLoading: false });
            return totalLabs;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
            set({ error: errorMessage, isLoading: false });
            return 0;
        }
    },

    fetchLabsDetails: async (idUser: number) => {
        set({ isLoading: true, error: null });
        try {
            const labsDetails = await labRepository.getLabsDetail(idUser);
            set({ labsDetails, isLoading: false });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
            set({ error: errorMessage, isLoading: false });
        }
    },

}));

export default useLabStore;
