import { Doctor } from '@/modules/doctors/domain/Doctor';
import { create } from 'zustand';
import { createApiDoctorRepository } from "@/modules/doctors/infra/ApiDoctorRepository";
import { getAllDoctors } from "@/modules/doctors/application/get-all/getAllDoctors";
import { getDoctor } from '@/modules/doctors/application/get/getDoctor';
import { createDoctor } from '@/modules/doctors/application/create/createDoctor';
import { updateDoctor } from '@/modules/doctors/application/update/updateDoctor';
import { deleteDoctor } from '@/modules/doctors/application/delete/deleteDoctor';
import { createApiUserRepository } from '@/modules/users/infra/ApiUserRepository';
import { getUser } from '@/modules/users/application/get/getUser';

interface DoctorState {
    doctors: Doctor[];
    selectedDoctor: Doctor | null;
    isLoading: boolean;
    registerBy: any;
    lastedDoctors: number;
    error: string | null | any;
    totalDoctors: number;
    fetchDoctors: () => Promise<void>;
    fetchLastDoctors: () => Promise<number>;
    fetchTotalDoctors: () => Promise<number>;
    getDoctorById: (id: number) => Promise<void>;
    createDoctor: (doctor: Doctor) => Promise<void>;
    updateDoctor: (doctor: Doctor, id: number) => Promise<void>;
    deleteDoctor: (id: number) => Promise<void>;
}

const doctorRepository = createApiDoctorRepository();
const userRepository = createApiUserRepository();
const loadAllDoctors = getAllDoctors(doctorRepository);
const loadDoctorFn = getDoctor(doctorRepository);
const createDoctorFn = createDoctor(doctorRepository);
const updateDoctorFn = updateDoctor(doctorRepository);
const deleteDoctorFn = deleteDoctor(doctorRepository);
const loadUserFn = getUser(userRepository);

export const useDoctorStore = create<DoctorState>((set) => ({
    doctors: [],
    selectedDoctor: null,
    registerBy: null,
    lastedDoctors: 0,
    totalDoctors: 0,
    isLoading: false,
    error: null,

    fetchDoctors: async () => {
        set({ isLoading: true });
        try {
            const doctorData = await loadAllDoctors();
            set({ doctors: doctorData, isLoading: false });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : error;
            set({ error: errorMessage, isLoading: false });
        }
    },

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

    getDoctorById: async (id) => {
        set({ isLoading: true });
        try {
            const doctorData = await loadDoctorFn(id);
            const registerBy = await loadUserFn(Number(doctorData.registeredById));
            set({ selectedDoctor: doctorData, registerBy, isLoading: false });
        } catch (error) {
            set({ error, isLoading: false });
        }
    },

    createDoctor: async (doctor) => {
        set({ isLoading: true });
        try {
            await createDoctorFn(doctor);
            set({ isLoading: false });
        } catch (error) {
            set({ error, isLoading: false });
        }
    },

    updateDoctor: async (doctor, id) => {
        set({ isLoading: true });
        try {
            await updateDoctorFn(doctor, id);
            set({ isLoading: false });
        } catch (error) {
            set({ error, isLoading: false });
        }
    },

    deleteDoctor: async (id) => {
        set({ isLoading: true });
        try {
            await deleteDoctorFn(id);
            set({ isLoading: false });
        } catch (error) {
            set({ error, isLoading: false });
        }
    },

}));