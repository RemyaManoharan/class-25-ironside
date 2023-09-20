import { create } from "zustand";

interface BearState {
  bears: number;
  increase: (by: number) => void;
}

const useBearStore = create<BearState>()((set) => ({
  userToken: null,
  // userData: [] ;
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
  // login : (password , user)=> {

  //   axios.post.........then((response  ) => set((state) => ({ userData: response.data , userToken : reponse.token })  )

  // }
}));

export default useBearStore;
