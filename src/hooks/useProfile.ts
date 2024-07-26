import { create } from 'zustand';

interface ProfileState {
  profileData: any;
  setProfileData: (data: any) => void;
}

const useProfileStore = create<ProfileState>((set) => ({
  profileData: null,
  setProfileData: (data) => set({ profileData: data }),
}));

export default useProfileStore;
