"use client";

import { useCalendarStore } from "@/lib/stores/calendarStore";
import { useEventStore } from "@/lib/stores/eventStore";

import { formatDateKey } from "@/lib/utils";

interface CalendarDayProps {
    day: number;
    currentDate: Date;
}

export default function CalendarDay({ day, currentDate }: CalendarDayProps) {
    const {
        selectedDate,
        setSelectedDate,
        selectedTheme,
        selectedMode,
        themes,
        modes,
    } = useCalendarStore();
    const { events } = useEventStore();

    const currentCellDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day,
    );
    const dateKey = formatDateKey(currentCellDate);
    const today = new Date();
    const isToday =
        today.getDate() === day &&
        today.getMonth() === currentDate.getMonth() &&
        today.getFullYear() === currentDate.getFullYear();
    const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();

    const dayEvents = events.filter(
        (event) => formatDateKey(new Date(event.date)) === dateKey,
    );

    const handleClick = () => {
        setSelectedDate(currentCellDate);
    };

    const getColorClass = (status: "regular" | "important" | "urgent") => {
        switch (status) {
            case "regular":
                return "bg-green-600";
            case "important":
                return "bg-yellow-600";
            case "urgent":
                return "bg-red-600";
            default:
                return "bg-green-600";
        }
    };

    return (
        <div
            className={`calendar-day h-24 bg-gray-700 rounded-lg relative p-1 transition-colors ${
                isSelected && !isToday ? "border-3 border-white" : ""
            } ${
                isToday
                    ? `border-3 ${themes[selectedTheme].secondary.replace(
                          "border-",
                          "border-",
                      )}`
                    : ""
            }`}
            onClick={handleClick}
        >
            <div
                className={`text-right font-semibold p-1 ${modes[selectedMode].text}`}
            >
                {day}
            </div>
            <div className="flex flex-wrap mt-1">
                {dayEvents.map((event) => (
                    <div
                        key={event.id}
                        className={`event-indicator rounded-full ${getColorClass(
                            event.status,
                        )}`}
                    />
                ))}
            </div>
        </div>
    );
}
