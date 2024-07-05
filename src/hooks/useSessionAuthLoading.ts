import { create } from 'zustand';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface AuthState {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}
const useAuthStore = create<AuthState>((set) => ({
    isLoading: true,
    setIsLoading: (isLoading: any) => set({ isLoading }),
}));


export const useAuthSessionLoading = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { isLoading, setIsLoading } = useAuthStore();

    useEffect(() => {
        if (status === 'loading') return;
        if (!session) {
            router.replace('/inicio');
        } else {
            setIsLoading(false);
        }
    }, [session, status, router, setIsLoading]);

    return { isLoading: isLoading || status === 'loading' };
};