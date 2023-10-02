import { create } from 'zustand';
import api from '../api';

interface UserState {
  user: any | null;
  fetchCurrentUser: (uid: string) => Promise<void>;
  resetUser: () => void;
}

const useAdminStore = create<UserState>()((set) => ({
  user: null,
  fetchCurrentUser: async (uid: string) => {
    try {
      const request = await api();
      const response = await request.get(`/user/${uid}`);
      const user = await response.data;

      set({ user });
    } catch (err) {
      console.error(err);
    }
  },
  resetUser: () => {
    const user = null;
    set({ user });
  },
}));
export default useAdminStore;
