import { create } from 'zustand';
import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import { getAllPatients } from "@/modules/patients/application/get-all/getAllPatients";
import { Patient } from '@/modules/patients/domain/Patient';
import { createApiUserRepository } from '@/modules/users/infra/ApiUserRepository';
import { getUser } from '@/modules/users/application/get/getUser';
import { createPatient } from '@/modules/patients/application/create/createPatient';
import { getPatient } from '@/modules/patients/application/get/getPatient';
import { updatePatient } from '@/modules/patients/application/update/updatePatient';
import { deletePatient } from '@/modules/patients/application/delete/deletePatient';
interface PatientState {
    patients: Patient[];
    selectedPatient: Patient | null;
    isLoading: boolean;
    totalPatients: number;
    lastedPatients: number;
    registerBy: any;
    error: string | null | any;
    fetchPatients: () => Promise<void>;
    fetchTotalPatients: () => Promise<number>;
    fetchLastPatients: () => Promise<number>;
    getPatientById: (id: number) => Promise<Patient | null>;
    createPatient: (patient: Patient) => Promise<void>;
    updatePatient: (id: number, updatePatient: Patient) => Promise<void>;
    deletePatient: (id: number) => Promise<void>;
}

const patientRepository = createApiPatientRepository();
const userRepository = createApiUserRepository();
const loadAllPatients = getAllPatients(patientRepository);
const loadPatientFn = getPatient(patientRepository);
const createPatientFn = createPatient(patientRepository);
const updatePatientFn = updatePatient(patientRepository);
const deletePatientFn = deletePatient(patientRepository);
const loadUserFn = getUser(userRepository);

export const usePatient = create<PatientState>((set) => ({
    patients: [],
    selectedPatient: null,
    registerBy: null,
    totalPatients: 0,
    lastedPatients: 0,
    isLoading: false,
    error: null,

    fetchPatients: async () => {
        set({ isLoading: true });
        try {
            const patientData = await loadAllPatients();
            set({ patients: patientData, isLoading: false });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : error;
            set({ error: errorMessage, isLoading: false });
        }
    },

    fetchTotalPatients: async () => {
        set({ isLoading: true });
        try {
            const totalPatients = await patientRepository.getTotalPatients();
            set({ totalPatients: totalPatients, isLoading: false });
            return totalPatients
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : error;
            set({ error: errorMessage, isLoading: false });
            return 0;
        }
    },

    fetchLastPatients: async () => {
        set({ isLoading: true });
        try {
            const lastedPatients = await patientRepository.fetchLastPatient();
            set({ lastedPatients: lastedPatients, isLoading: false });
            return lastedPatients
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : error;
            set({ error: errorMessage, isLoading: false });
            return 0
        }
    },

    getPatientById: async (id) => {
        set({ isLoading: true });
        try {
            const patientData = await loadPatientFn(id);
            if (patientData) {
                const registerBy = await loadUserFn(Number(patientData.registeredById));
                set({ selectedPatient: patientData, registerBy, isLoading: false });
                return patientData;
            } else {
                set({ selectedPatient: null, registerBy: null, isLoading: false });
                return null;
            }
        } catch (error) {
            set({ error, isLoading: false });
            return null;
        }
    },

    createPatient: async (patient) => {
        set({ isLoading: true });
        try {
            await createPatientFn(patient);
            set({ isLoading: false });
        } catch (error) {
            set({ error, isLoading: false });
        }
    },

    updatePatient: async (id, patient) => {
        set({ isLoading: true });
        try {
            await updatePatientFn(id, patient);
            set({ isLoading: false });
        } catch (error) {
            set({ error, isLoading: false });
        }
    },

    deletePatient: async (id) => {
        set({ isLoading: true });
        try {
            await deletePatientFn(id);
            set({ isLoading: false });
        } catch (error) {
            set({ error, isLoading: false });
        }
    },
}));