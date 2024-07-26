import { Labs } from '@/modules/labs/domain/Labs';
import { createApiLabRepository } from '@/modules/labs/infra/ApiLabRepository';
import { createApiUserRepository } from '@/modules/users/infra/ApiUserRepository';
import { create } from 'zustand';

const userRepository = createApiUserRepository();

interface ReportState {
    isLoading: boolean;
    error: any;
    setIsLoading: (isLoading: boolean) => void;
    createReport: (data: any) => Promise<void>;
}

const useReportStore = create<ReportState>((set) => ({
    isLoading: false,
    error: null,
    setIsLoading: (isLoading: boolean) => set({ isLoading }),

    createReport: async (data) => {
        set({ isLoading: true });
        try {
            await userRepository.requestSupport(data);
            set({ isLoading: false });
        } catch (error) {
            set({ error, isLoading: false });
        }
    },

}));

export default useReportStore;
