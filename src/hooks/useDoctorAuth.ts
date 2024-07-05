import { create } from 'zustand';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useRoles from './useRoles';

interface AuthState {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
    isLoading: true,
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));

export const useAuthDoctorLoading = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { isPatient, isAdmin, isSecretary, isDoctor } = useRoles();
    const { isLoading, setIsLoading } = useAuthStore();

    useEffect(() => {
        if (status === 'loading') return;

        if (!session) {
            router.replace('/');
        } else if (isPatient && !isDoctor && !isAdmin && !isSecretary) {
            router.replace('/');
        } else {
            setIsLoading(false);
        }
    }, [session, status, router, isPatient, isAdmin, isSecretary, isDoctor, setIsLoading]);

    return { isLoading: isLoading || status === 'loading' };
};