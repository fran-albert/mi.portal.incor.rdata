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
    setIsLoading: (isLoading: any) => set({ isLoading }),
}));


export const useAuthSecretaryLoading = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { isAdmin, isSecretary} = useRoles();
    const { isLoading, setIsLoading } = useAuthStore();

    useEffect(() => {
        if (status === "loading") return;
        if (!session || (!isSecretary && !isAdmin)) {
          router.replace("/inicio");
        } else {
          setIsLoading(false);
        }
      }, [session, status, router, isSecretary, isAdmin, setIsLoading]);

    return { isLoading: isLoading || status === 'loading' };
};