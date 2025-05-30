import { create } from "zustand";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { apiService } from "../services/axiosService";

interface User {
    id: string;
    username: string;
    email: string;
}

interface UserStore {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    login: (
        email: string,
        password: string,
        router: AppRouterInstance,
    ) => Promise<void>;
    register: (
        email: string,
        username: string,
        password: string,
        router: AppRouterInstance,
    ) => Promise<void>;
    fetchUser: () => Promise<void>;
    updateUser: (userData: Partial<User>) => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
    user: null,
    isLoading: false,
    error: null,

    login: async (email, password, router) => {
        set({ isLoading: true, error: null });
        try {
            await apiService.post("/auth/login", { email, password });
            await get().fetchUser();
            set({ isLoading: false });
            router.push("/calendar");
        } catch (error) {
            set({ error: "Login failed", isLoading: false });
            throw error;
        }
    },

    register: async (email, username, password, router) => {
        set({ isLoading: true, error: null });
        try {
            await apiService.post("/auth", { email, username, password });
            set({ isLoading: false });
            router.push("/auth/signin");
        } catch (error) {
            set({ error: "Registration failed", isLoading: false });
            throw error;
        }
    },

    fetchUser: async () => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await apiService.get<User>("/users");
            set({ user: data, isLoading: false });
        } catch (error) {
            set({ error: "Failed to fetch user", isLoading: false });
            throw error;
        }
    },

    updateUser: async (userData) => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await apiService.patch<User>("/users", userData);
            set({ user: data, isLoading: false });
        } catch (error) {
            set({ error: "Failed to update user", isLoading: false });
            throw error;
        }
    },
}));
