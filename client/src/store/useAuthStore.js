import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: { name: "Soham", _id: 123, age: 22 },
  isLoggedIn: false,

  login: () => {
    set({isLoggedIn: true})
    console.log("we just logged in");
  },
}));
