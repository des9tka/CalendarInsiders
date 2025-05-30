import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
} from "axios";

const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig;

        if (
            error.response?.status === 401 &&
            !originalRequest.url?.includes("/auth/refresh")
        ) {
            try {
                await api.post("/auth/refresh");
                return api(originalRequest);
            } catch (refreshError) {
                if (typeof window !== "undefined") {
                    window.location.href = "/login";
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export const apiService = {
    get: <T>(url: string, config?: AxiosRequestConfig) =>
        api.get<T>(url, config),
    post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        api.post<T>(url, data, config),
    patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        api.patch<T>(url, data, config),
    delete: <T>(url: string, config?: AxiosRequestConfig) =>
        api.delete<T>(url, config),
};
