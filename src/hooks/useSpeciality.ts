import { create } from 'zustand';
import { Speciality } from '@/modules/speciality/domain/Speciality';
import { createSpeciality } from '@/modules/speciality/application/create/createSpeciality';
import { createApiSpecialityRepository } from '@/modules/speciality/infra/ApiSpecialityRepository';
import { getAllSpecialities } from '@/modules/speciality/application/get-all/getAllSpecialities';
import { updateSpeciality } from '@/modules/speciality/application/update/updateSpeciality';
import { deleteSpeciality } from '@/modules/speciality/application/delete/deleteSpeciality';

interface SpecialityState {
    specialities: Speciality[];
    selectedSpeciality: Speciality | null;
    isLoading: boolean;
    error: string | null | any;
    fetchSpecialities: () => Promise<void>;
    createSpeciality: (speciality: Speciality) => Promise<void>;
    updateSpeciality: (id: number, updateSpeciality: Speciality) => Promise<void>;
    deleteSpeciality: (id: number) => Promise<void>;
    addSpecialityToList: (speciality: Speciality) => void;
    updateSpecialityInList: (speciality: Speciality) => void;
    removeSpecialityFromList: (id: number) => void;
}

const specialityRepository = createApiSpecialityRepository();
const loadAllSpecialities = getAllSpecialities(specialityRepository);
const createSpecialityFn = createSpeciality(specialityRepository);
const updateSpecialityFn = updateSpeciality(specialityRepository);
const deleteSpecialityFn = deleteSpeciality(specialityRepository);

export const useSpecialityStore = create<SpecialityState>((set) => ({
    specialities: [],
    selectedSpeciality: null,
    isLoading: false,
    error: null,

    fetchSpecialities: async () => {
        set({ isLoading: true });
        try {
            const specialityData = await loadAllSpecialities();
            set({ specialities: specialityData, isLoading: false });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            set({ error: errorMessage, isLoading: false });
        }
    },

    createSpeciality: async (speciality) => {
        set({ isLoading: true });
        try {
            await createSpecialityFn(speciality);
            set({ isLoading: false });
            set((state) => ({ specialities: [...state.specialities, speciality] }));
        } catch (error) {
            set({ error: String(error), isLoading: false });
        }
    },
    updateSpeciality: async (id, speciality) => {
        set({ isLoading: true });
        try {
            await updateSpecialityFn(id, speciality);
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
            await deleteSpecialityFn(id);
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