import { create } from "zustand";

const mainStore = create((set) => {
  const user = localStorage.getItem("user");
  const secret = localStorage.getItem("secret");
  const userKey = user ? `favorites_${user}` : "favorites";

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

    favCount: JSON.parse(localStorage.getItem(userKey) || "[]").length,
    setFavCount: (count) => set(() => ({ favCount: count })),

    items: [],
    setItems: (newItems) => set(() => ({ items: newItems })),

    foundPostCount: 0,
    setFoundPostCount: (count) => set(() => ({ foundPostCount: count })),
  };
});

export default mainStore;
