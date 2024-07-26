import { create } from 'zustand';
import { Speciality } from '@/modules/speciality/domain/Speciality';
import { createApiSpecialityRepository } from '@/modules/speciality/infra/ApiSpecialityRepository';


interface SpecialityState {
    specialities: Speciality[];
    selectedSpeciality: Speciality | null;
    isLoading: boolean;
    error: string | null | any;
    totalSpecialities: number;
    createSpeciality: (speciality: Speciality) => Promise<void>;
    updateSpeciality: (id: number, updateSpeciality: Speciality) => Promise<void>;
    deleteSpeciality: (id: number) => Promise<void>;
    addSpecialityToList: (speciality: Speciality) => void;
    updateSpecialityInList: (speciality: Speciality) => void;
    removeSpecialityFromList: (id: number) => void;
}

const specialityRepository = createApiSpecialityRepository();

export const useSpecialityStore = create<SpecialityState>((set) => ({
    specialities: [],
    selectedSpeciality: null,
    totalSpecialities: 0,
    isLoading: false,
    error: null,


    createSpeciality: async (speciality) => {
        set({ isLoading: true });
        try {
            await specialityRepository.createSpeciality(speciality);
            set({ isLoading: false });
            set((state) => ({ specialities: [...state.specialities, speciality] }));
        } catch (error) {
            set({ error: String(error), isLoading: false });
        }
    },

   
    updateSpeciality: async (id, speciality) => {
        set({ isLoading: true });
        try {
            await specialityRepository.updateSpeciality(id, speciality);
            set({ isLoading: false });
            set((state) => ({
                specialities: state.specialities.map((s) =>
                    String(s.id) === String(id) ? speciality : s
                ),
            }));
        } catch (error) {
            set({ error: String(error), isLoading: false });
        }
    },

    deleteSpeciality: async (id) => {
        set({ isLoading: true });
        try {
            await specialityRepository.deleteSpeciality(id);
            set({ isLoading: false });
            set((state) => ({
                specialities: state.specialities.filter((s) => String(s.id) !== String(id)),
            }));
        } catch (error) {
            set({ error: String(error), isLoading: false });
        }
    },

    addSpecialityToList: (speciality) => {
        set((state) => ({
            specialities: [...state.specialities, speciality],
        }));
    },

    updateSpecialityInList: (speciality) => {
        set((state) => ({
            specialities: state.specialities.map((s) =>
                s.id === speciality.id ? speciality : s
            ),
        }));
    },

    removeSpecialityFromList: (id) => {
        set((state) => ({
            specialities: state.specialities.filter((s) => String(s.id) !== String(id)),
        }));
    },
}));