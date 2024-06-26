import { create } from "zustand";

const mainStore = create((set) => {
  const user = localStorage.getItem("user");
  const secret = localStorage.getItem("secret");

  return {
    data: null,
    setData: (newData) => set(() => ({ data: newData })),

    error: "",
    setError: (newError) => set(() => ({ error: newError })),

    logged: user && secret ? user : null,
    setLogged: (newUser) => set(() => ({ logged: newUser })),
  };
});

export default mainStore;
