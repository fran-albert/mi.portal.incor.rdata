import { Study } from '@/modules/study/domain/Study';
import { createApiStudyRepository } from '@/modules/study/infra/ApiStudyRepository';
import { create } from 'zustand';

const studyRepository = createApiStudyRepository();

interface StudyState {
    isLoading: boolean;
    studies: Study[];
    selectedStudy: Study | null | string;
    totalEcography: number;
    error: string | null;
    totalStudies: number;
    setIsLoading: (isLoading: boolean) => void;
    fetchAllStudies: () => Promise<void>;
    fetchTotalStudies: () => Promise<number>;
    fetchTotalEcography: () => Promise<number>;
    fetchStudiesByPatient: (idPatient: number) => Promise<Study[]>;
    uploadStudy: (formData: FormData) => Promise<Study>;
    deleteStudy: (idStudy: number) => Promise<void>;
    fetchStudyUrl: (idPatient: number, locationS3: string | undefined) => Promise<string>;
    addStudy: (newStudy: Study) => void;
    removeStudy: (deletedStudyId: number) => void;
    clearStudies: () => void;
}

const useStudyStore = create<StudyState>((set) => ({
    isLoading: false,
    studies: [],
    totalStudies: 0,
    totalEcography: 0,
    selectedStudy: null,
    error: null,
    setIsLoading: (isLoading: boolean) => set({ isLoading }),

    fetchAllStudies: async () => {
        set({ isLoading: true, error: null });
        try {
            const studies = await studyRepository.getAllStudyType();
            set({ studies, isLoading: false });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
            set({ error: errorMessage, isLoading: false });
        }
    },

    fetchStudiesByPatient: async (idPatient) => {
        set({ isLoading: true, error: null });
        try {
            const studies = await studyRepository.getAllStudyByPatient(idPatient);
            set({ studies, isLoading: false });
            return studies;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
            set({ error: errorMessage, isLoading: false });
            return [];
        }
    },

    fetchTotalStudies: async () => {
        set({ isLoading: true, error: null });
        try {
            const totalStudies = await studyRepository.getTotalStudies();
            set({ totalStudies, isLoading: false });
            return totalStudies;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
            set({ error: errorMessage, isLoading: false });
            return 0;
        }
    },

    fetchTotalEcography: async () => {
        set({ isLoading: true, error: null });
        try {
            const totalEcography = await studyRepository.getTotalEcography();
            set({ totalEcography, isLoading: false });
            return totalEcography;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
            set({ error: errorMessage, isLoading: false });
            return 0;
        }
    },

    uploadStudy: async (formData) => {
        set({ isLoading: true, error: null });
        try {
            const newStudy = await studyRepository.uploadStudy(formData);
            set((state) => ({
                studies: [...state.studies, newStudy],
                isLoading: false
            }));
            return newStudy;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
            set({ error: errorMessage, isLoading: false });
            throw error;
        }
    },

    deleteStudy: async (idStudy) => {
        set({ isLoading: true, error: null });
        try {
            await studyRepository.deleteStudy(idStudy);
            set((state) => ({
                studies: state.studies.filter((study) => study.id !== idStudy),
                isLoading: false
            }));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
            set({ error: errorMessage, isLoading: false });
        }
    },

    fetchStudyUrl: async (idPatient, locationS3) => {
        try {
            const url = await studyRepository.getUrlByPatient(idPatient, locationS3);
            return url;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
            set({ error: errorMessage });
            return '';
        }
    },

    addStudy: (newStudy) => {
        set((state) => ({ studies: [...state.studies, newStudy] }));
    },

    removeStudy: (deletedStudyId) => {
        set((state) => ({ studies: state.studies.filter((study) => study.id !== deletedStudyId) }));
    },

    clearStudies: () => set({ studies: [] }),
}));

export default useStudyStore;
