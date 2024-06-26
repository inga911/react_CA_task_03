import { create } from "zustand";

const mainStore = create((set) => ({
  data: null,
  setData: (newData) => set(() => ({ data: newData })),
}));

export default mainStore;
