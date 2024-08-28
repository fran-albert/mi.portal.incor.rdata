import create from 'zustand';

interface LoadingStore {
    initialLoadComplete: boolean;
    setInitialLoadComplete: (status: boolean) => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
    initialLoadComplete: false,
    setInitialLoadComplete: (status) => set({ initialLoadComplete: status }),
}));
