import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthStore {
  user: User | null;
  login: (email: string, _password: string) => void;
  signup: (email: string, password: string, firstName: string, lastName: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,

      login: (email, _password) => {
        // Fake login — any email/password works
        const name = email.split("@")[0];
        const firstName = name.charAt(0).toUpperCase() + name.slice(1);
        set({
          user: {
            email,
            firstName,
            lastName: "",
          },
        });
      },

      signup: (email, _password, firstName, lastName) => {
        set({
          user: { email, firstName, lastName },
        });
      },

      logout: () => set({ user: null }),

      updateProfile: (updates) => {
        const current = get().user;
        if (current) {
          set({ user: { ...current, ...updates } });
        }
      },
    }),
    {
      name: "commercex-auth",
    }
  )
);
