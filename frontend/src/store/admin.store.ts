import { create } from "zustand";

interface BearState {
  bears: number;
  increase: (by: number) => void;
}

const useAdminStore = create<BearState>()((set) => ({
  userToken: null,

  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));

export default useAdminStore;
