import { User } from "../../types/UserTypes";
import { apiService } from "./axiosService";

export const userService = {
    login: async (email: string, password: string): Promise<void> => {
        await apiService.post("/auth/login", { email, password });
    },

    logout: async (): Promise<void> => {
        await apiService.post("/auth/logout");
    },

    refreshToken: async (): Promise<void> => {
        await apiService.get("/auth/refresh");
    },

    getUser: async (): Promise<User> => {
        const { data } = await apiService.get<User>("/users");
        return data;
    },

    updateUser: async (userData: Partial<User>): Promise<User> => {
        const { data } = await apiService.patch<User>("/users", userData);
        return data;
    },
};
