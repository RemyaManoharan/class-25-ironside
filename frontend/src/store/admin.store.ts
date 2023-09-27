import { create } from 'zustand';
import api from '../api';

interface BearState {
  currentUser: any | null;
  fetchCurrentUser: (uid: string) => Promise<void>;
}

const useAdminStore = create<BearState>()((set) => ({
  currentUser: null,

  fetchCurrentUser: async (uid: string) => {
    const currentUser = await api.get(`/user/${uid}`);
    set({ currentUser });
  },
}));

export default useAdminStore;
