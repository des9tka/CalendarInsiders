import { create } from "zustand";

import { ModeName, ThemeName } from "../../types/CalendarTypes";

interface Theme {
    primary: string;
    secondary: string;
}

interface Mode {
    background: string;
    text: string;
    panelBg: string;
    modalBg: string;
}

interface CalendarStore {
    selectedDate: Date | null;
    isReverseView: boolean;
    showEventDetails: boolean;
    showModal: boolean;
    modalMode: "create" | "edit";
    selectedTheme: ThemeName;
    selectedMode: ModeName;
    themes: Record<ThemeName, Theme>;
    modes: Record<ModeName, Mode>;
    setSelectedDate: (date: Date | null) => void;
    setReverseView: (value: boolean) => void;
    setShowEventDetails: (value: boolean) => void;
    setShowModal: (value: boolean, mode?: "create" | "edit") => void;
    setSelectedTheme: (theme: ThemeName) => void;
    setSelectedMode: (mode: ModeName) => void;
}

export const useCalendarStore = create<CalendarStore>((set) => ({
    selectedDate: null,
    isReverseView: false,
    showEventDetails: false,
    showModal: false,
    modalMode: "create",
    selectedTheme: "blue",
    selectedMode: "dark",
    themes: {
        blue: {
            primary: "bg-blue-600 hover:bg-blue-700",
            secondary: "border-blue-500",
        },
        red: {
            primary: "bg-red-600 hover:bg-red-700",
            secondary: "border-red-500",
        },
        yellow: {
            primary: "bg-yellow-600 hover:bg-yellow-700",
            secondary: "border-yellow-500",
        },
        green: {
            primary: "bg-green-600 hover:bg-green-700",
            secondary: "border-green-500",
        },
    },
    modes: {
        dark: {
            background: "bg-gray-800",
            text: "text-white",
            panelBg: "bg-gray-700",
            modalBg: "bg-gray-900/50",
        },
        light: {
            background: "bg-gray-100",
            text: "text-gray-900",
            panelBg: "bg-gray-200",
            modalBg: "bg-white/85",
        },
    },
    setSelectedDate: (date) => set({ selectedDate: date }),
    setReverseView: (value) => set({ isReverseView: value }),
    setShowEventDetails: (value) => set({ showEventDetails: value }),
    setShowModal: (value, mode = "create") =>
        set({ showModal: value, modalMode: mode }),
    setSelectedTheme: (theme) => set({ selectedTheme: theme }),
    setSelectedMode: (mode) => set({ selectedMode: mode }),
}));
