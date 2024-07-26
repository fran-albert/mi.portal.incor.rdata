import { Doctor } from '@/modules/doctors/domain/Doctor';
import { create } from 'zustand';
import { createApiDoctorRepository } from "@/modules/doctors/infra/ApiDoctorRepository";
import { createApiUserRepository } from '@/modules/users/infra/ApiUserRepository';
import { slugify } from '@/lib/utils';

interface DoctorState {
    doctors: Doctor[];
    selectedDoctor: Doctor | null;
    isLoading: boolean;
    registerBy: any;
    lastedDoctors: number;
    error: string | null | any;
    totalDoctors: number;
    fetchLastDoctors: () => Promise<number>;
    fetchTotalDoctors: () => Promise<number>;
}

const doctorRepository = createApiDoctorRepository();

export const useDoctorStore = create<DoctorState>((set) => ({
    doctors: [],
    selectedDoctor: null,
    registerBy: null,
    lastedDoctors: 0,
    totalDoctors: 0,
    isLoading: false,
    error: null,


    fetchTotalDoctors: async () => {
        set({ isLoading: true });
        try {
            const totalDoctors = await doctorRepository.getTotalDoctors();
            set({ totalDoctors: totalDoctors, isLoading: false });
            return totalDoctors
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : error;
            set({ error: errorMessage, isLoading: false });
            return 0;
        }
    },

    fetchLastDoctors: async () => {
        set({ isLoading: true });
        try {
            const lastedDoctors = await doctorRepository.fetchLastDoctors();
            set({ lastedDoctors: lastedDoctors, isLoading: false });
            return lastedDoctors;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : error;
            set({ error: errorMessage, isLoading: false });
            return 0;
        }
    },



}));