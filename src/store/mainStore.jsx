import { create } from "zustand";

const mainStore = create((set) => {
  const user = localStorage.getItem("user");
  const secret = localStorage.getItem("secret");

  return {
    data: null,
    setData: (newData) => set(() => ({ data: newData })),

    error: null,
    setError: (error) => set({ error }),

    logged: user && secret ? user : null,
    setLogged: (newUser) => set(() => ({ logged: newUser })),

    pages: 0,
    setPages: (pages) => set(() => ({ pages })),

    currentPage: 1,
    setCurrentPage: (page) => set(() => ({ currentPage: page })),

    favCount: JSON.parse(localStorage.getItem("favorites") || "[]").length,
    setFavCount: (count) => set(() => ({ favCount: count })),
  };
});

export default mainStore;
