import { HealthInsurance } from '@/types/Health-Insurance/Health-Insurance';
import { create } from 'zustand';

interface HealthInsuranceState {
    healthInsurances: HealthInsurance[];
    addHealthInsurance: (healthInsurance: HealthInsurance) => Promise<void>;
    updateHealthInsurance: (id: number, healthInsurance: HealthInsurance) => Promise<void>;
    deleteHealthInsurance: (id: number) => Promise<void>;
}

export const useHealthInsuranceStore = create<HealthInsuranceState>((set) => ({
    healthInsurances: [],
    addHealthInsurance: async (healthInsurance) => {
        set((state) => ({ healthInsurances: [...state.healthInsurances, healthInsurance] }));
    },
    updateHealthInsurance: async (id, healthInsurance) => {
        set((state) => ({
            healthInsurances: state.healthInsurances.map((h) => (h.id === id ? healthInsurance : h)),
        }));
    },
    deleteHealthInsurance: async (id) => {
        set((state) => ({
            healthInsurances: state.healthInsurances.filter((h) => h.id !== id),
        }));
    },
}));
