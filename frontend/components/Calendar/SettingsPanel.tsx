"use client";

import { useCalendarStore } from "@/lib/stores/calendarStore";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SettingsPanelProps {
    onClose: () => void;
}

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
    const {
        selectedTheme,
        selectedMode,
        setSelectedTheme,
        setSelectedMode,
        themes,
    } = useCalendarStore();

    const themeColors: { name: string; color: string }[] = [
        { name: "blue", color: "bg-blue-600" },
        { name: "red", color: "bg-red-600" },
        { name: "green", color: "bg-green-600" },
        { name: "yellow", color: "bg-yellow-600" },
    ];

    return (
        <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-gray-900/85 rounded-xl w-full max-w-md p-6 text-white">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Settings</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2">Theme</h4>
                    <div className="grid grid-cols-7 gap-2">
                        {themeColors.map((theme) => (
                            <button
                                key={theme.name}
                                className={`w-8 h-8 rounded ${theme.color} ${
                                    selectedTheme === theme.name
                                        ? "ring-2 ring-white"
                                        : ""
                                }`}
                                onClick={() =>
                                    setSelectedTheme(theme.name as any)
                                }
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-2">Mode</h4>
                    <div className="flex space-x-2">
                        <button
                            className={`px-4 py-2 rounded ${
                                selectedMode === "dark"
                                    ? themes[selectedTheme].primary
                                    : "bg-gray-600"
                            } text-white`}
                            onClick={() => setSelectedMode("dark")}
                        >
                            Dark
                        </button>
                        <button
                            className={`px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed ${
                                selectedMode === "light"
                                    ? themes[selectedTheme].primary
                                    : "bg-gray-600"
                            } text-white`}
                            onClick={() => setSelectedMode("light")}
                            disabled
                        >
                            Light
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
