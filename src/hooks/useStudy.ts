import { Study } from '@/modules/study/domain/Study';
import { createApiStudyRepository } from '@/modules/study/infra/ApiStudyRepository';
import { create } from 'zustand';

const studyRepository = createApiStudyRepository();

interface StudyState {
    isLoading: boolean;
    studies: Study[];
    selectedStudy: Study | null | string;
    error: string | null;
    setIsLoading: (isLoading: boolean) => void;
    fetchAllStudies: () => Promise<void>;
    fetchStudiesByPatient: (idPatient: number) => Promise<void>;
    uploadStudy: (formData: FormData) => Promise<Study>;
    deleteStudy: (idStudy: number) => Promise<void>;
    fetchStudyUrl: (idPatient: number, locationS3: string | undefined) => Promise<string>;
    addStudy: (newStudy: Study) => void;
    removeStudy: (deletedStudyId: number) => void;
}

const useStudyStore = create<StudyState>((set) => ({
    isLoading: false,
    studies: [],
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
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
            set({ error: errorMessage, isLoading: false });
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
}));

export default useStudyStore;
