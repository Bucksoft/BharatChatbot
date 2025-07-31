import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      token: null,
      user: null,
      activePlan: null,
      allUrls: [],
      darkMode: false,
      allPlans: [],

      setIsLoggedIn: () => set(() => ({ isLoggedIn: true })),

      login: (user, token) => {
        localStorage.setItem("token", token);
        set({ user, token, isLoggedIn: true });
      },

      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null, isLoggedIn: false });
      },

      setUser: (user) => set({ user }),
      setActivePlan: (activePlan) => set({ activePlan }),
      setAllUrls: (urls) => set({ allUrls: urls }),
      setAllPlans: (plans) => set({ allPlans: plans }),
      addUrl: (url) => set((state) => ({ allUrls: [...state.allUrls, url] })),
      setDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        activePlan: state.activePlan,
        darkMode: state.darkMode,
        allUrls: state.allUrls,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
