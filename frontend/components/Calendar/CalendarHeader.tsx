"use client";

import { useCalendarStore } from "@/lib/stores/calendarStore";
import {
    faCalendarDay,
    faChevronLeft,
    faChevronRight,
    faCog,
    faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import SettingsPanel from "./SettingsPanel";

interface CalendarHeaderProps {
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
}

export default function CalendarHeader({
    currentDate,
    setCurrentDate,
}: CalendarHeaderProps) {
    const { setReverseView, isReverseView, selectedTheme, themes } =
        useCalendarStore();
    const [showSettings, setShowSettings] = useState(false);
    const monthYear = currentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
    });

    const handlePrevMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
        );
    };

    const handleNextMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
        );
    };

    const handleCurrentMonth = () => {
        setCurrentDate(new Date());
    };

    return (
        <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
                <h2 className="text-2xl font-bold"> {monthYear}</h2>
                <div className="ml-4">
                    <button
                        onClick={handlePrevMonth}
                        className="p-2 rounded hover:bg-gray-700"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                        onClick={handleNextMonth}
                        className="p-2 rounded hover:bg-gray-700"
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                    <button
                        onClick={handleCurrentMonth}
                        className="p-2 rounded hover:bg-gray-700"
                    >
                        <FontAwesomeIcon icon={faCalendarDay} />
                    </button>
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className={`text-white p-2  hover:bg-gray-700 rounded`}
                    >
                        <FontAwesomeIcon icon={faCog} />
                    </button>
                </div>
            </div>
            <div className="flex items-center">
                <button
                    onClick={() => setReverseView(!isReverseView)}
                    className={`${themes[selectedTheme].primary} text-white px-4 py-2 rounded-lg flex items-center mr-2`}
                >
                    <FontAwesomeIcon icon={faExchangeAlt} className="mr-2" />
                    Toggle Events
                </button>
            </div>
            {showSettings && (
                <SettingsPanel onClose={() => setShowSettings(false)} />
            )}
        </div>
    );
}
