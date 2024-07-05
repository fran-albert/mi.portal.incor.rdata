import { create } from 'zustand';
import { State } from '@/modules/state/domain/State';
import { createApiStateRepository } from '@/modules/state/infra/ApiStateRepository';
import { getAll } from '@/modules/state/application/get-all/getAll';

interface StateStore {
    states: State[];
    isLoading: boolean;
    error: string | null;
    fetchStates: () => Promise<void>;
}

const stateRepository = createApiStateRepository();
const loadAllStates = getAll(stateRepository);

export const useStateStore = create<StateStore>((set) => ({
    states: [],
    isLoading: false,
    error: null,

    fetchStates: async () => {
        set({ isLoading: true });
        try {
            const statesData = await loadAllStates();
            set({ states: statesData, isLoading: false });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            set({ error: errorMessage, isLoading: false });
        }
    },
}));
