import { Patient } from '@/types/Patient/Patient';
import { create } from 'zustand';

interface PatientState {
    patients: Patient[];
    addPatient: (patient: Patient) => Promise<void>;
    updatePatient: (id: number, patient: Patient) => Promise<void>;
    deletePatient: (id: number) => Promise<void>;
}

export const usePatientStore = create<PatientState>((set) => ({
    patients: [],
    addPatient: async (patient) => {
        set((state) => ({ patients: [...state.patients, patient] }));
    },
    updatePatient: async (id, patient) => {
        set((state) => ({
            patients: state.patients.map((p) => (p.id === id ? patient : p)),
        }));
    },
    deletePatient: async (id) => {
        set((state) => ({
            patients: state.patients.filter((p) => p.id !== id),
        }));
    },
}));