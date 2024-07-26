import { User } from "@/types/User/User";
import { create } from "zustand";

interface SessionState {
    session: User | null;
    setSession: (session: User) => void;
    clearSession: () => void;
}


const useSessionStore = create<SessionState>((set) => ({
    session: null,
    setSession: (session: User) => set({ session }),
    clearSession: () => set({ session: null }),
}));

export default useSessionStore;
