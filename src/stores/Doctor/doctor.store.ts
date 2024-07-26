import { Doctor } from '@/modules/doctors/domain/Doctor';
import { create } from 'zustand';

interface DoctorState {
    doctors: Doctor[];
    addDoctor: (doctor: Doctor) => void;
    updateDoctor: (id: number, doctor: Doctor) => void;
    deleteDoctor: (id: number) => void;
}

export const useDoctorStore = create<DoctorState>((set) => ({
    doctors: [],
    addDoctor: (doctor) => set((state) => ({ doctors: [...state.doctors, doctor] })),
    updateDoctor: (id, doctor) => set((state) => ({
        doctors: state.doctors.map((p) => (p.id === id ? doctor : p)),
    })),
    deleteDoctor: (id) => set((state) => ({
        doctors: state.doctors.filter((p) => p.id !== id),
    })),
}));