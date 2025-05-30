"use client";
import { useCalendarStore } from "@/lib/stores/calendarStore";
import { useEventStore } from "@/lib/stores/eventStore";

import { formatDateDisplay, formatTimeDisplay } from "@/lib/utils";
import { Event } from "@/types/EventTypes";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { JSX, useState } from "react";

interface AllEventsPanelProps {
    setCurrentDate: (date: Date) => void;
}

export default function AllEventsPanel({
    setCurrentDate,
}: AllEventsPanelProps) {
    const { setShowEventDetails, selectedTheme, selectedMode, modes, themes } =
        useCalendarStore();

    const { events, setCurrentEventId, currentEventId } = useEventStore();

    const [sortMode, setSortMode] = useState<"all" | "new" | "old" | "today">(
        "all",
    );

    const handleEventClick = (eventId: string) => {
        const event = events.find((e) => e.id === eventId);
        if (event) {
            const eventDate = new Date(event.date);
            setCurrentDate(
                new Date(eventDate.getFullYear(), eventDate.getMonth(), 1),
            ); // Navigate to event's month
        }

        if (currentEventId === eventId) {
            setCurrentEventId(null);
            setShowEventDetails(false);
            return;
        }
        setCurrentEventId(eventId);
        setShowEventDetails(true);
    };

    const getColorClass = (status: "regular" | "important" | "urgent") => {
        switch (status) {
            case "regular":
                return "border-green-600";
            case "important":
                return "border-yellow-600";
            case "urgent":
                return "border-red-600";
            default:
                return "border-green-600";
        }
    };

    const getSortModeLabel = () => {
        switch (sortMode) {
            case "all":
                return "All Events";
            case "new":
                return "New Events";
            case "old":
                return "Old Events";
            case "today":
                return "Now Events";
        }
    };

    const handleSortToggle = () => {
        setSortMode((prevMode) => {
            switch (prevMode) {
                case "all":
                    return "new";
                case "new":
                    return "old";
                case "old":
                    return "today";
                case "today":
                    return "all";
                default:
                    return "all";
            }
        });
    };

    const sortedEvents = events.slice().sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        const now = new Date();

        switch (sortMode) {
            case "new":
                return dateA.getTime() - now.getTime();
            case "old":
                return now.getTime() - dateA.getTime();
            case "today":
                const isToday = (date: Date) =>
                    date.toDateString() === now.toDateString();
                if (isToday(dateA) && !isToday(dateB)) return -1;
                if (!isToday(dateA) && isToday(dateB)) return 1;
                return dateA.getTime() - dateB.getTime();
            default:
                return dateA.getTime() - dateB.getTime();
        }
    });

    return (
        <div className="relative">
            <div className="flex justify-between items-center mb-4">
                <h3
                    className={`text-xl font-bold ${modes[selectedMode].text} cursor-pointer hover:underline select-none`}
                    onClick={handleSortToggle}
                >
                    {getSortModeLabel()}{" "}
                    <FontAwesomeIcon
                        icon={faDatabase}
                        size="xs"
                        className="mb-2"
                    />
                </h3>
            </div>
            <div className="space-y-2">
                {sortedEvents.length === 0 ? (
                    <div
                        className={`text-gray-500 py-2 ${modes[selectedMode].text}`}
                    >
                        No{" "}
                        {sortMode === "old"
                            ? "past"
                            : sortMode === "new"
                            ? "upcoming"
                            : sortMode === "today"
                            ? "today's"
                            : ""}{" "}
                        events scheduled.
                    </div>
                ) : (
                    sortedEvents.reduce<JSX.Element[]>(
                        (acc, event: Event, index) => {
                            const eventDate = new Date(event.date);
                            const isNewDate =
                                index === 0 ||
                                sortedEvents[index - 1].date !== event.date;

                            if (isNewDate) {
                                acc.push(
                                    <div
                                        key={event.id + "-date"}
                                        className={`font-bold mt-4 mb-2 pt-2 border-t border-gray-200 ${modes[selectedMode].text}`}
                                    >
                                        {formatDateDisplay(eventDate)}
                                    </div>,
                                );
                            }

                            acc.push(
                                <div
                                    key={event.id}
                                    className={`p-3 ${
                                        modes[selectedMode].panelBg
                                    } rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer border-l-4 mb-2 ${getColorClass(
                                        event.status,
                                    )}`}
                                    onClick={() =>
                                        event.id && handleEventClick(event.id)
                                    }
                                >
                                    <div
                                        className={`font-semibold ${modes[selectedMode].text}`}
                                    >
                                        {formatTimeDisplay(event.time ?? "")}
                                    </div>
                                    <div className={modes[selectedMode].text}>
                                        {event.title}
                                    </div>
                                </div>,
                            );

                            return acc;
                        },
                        [],
                    )
                )}
            </div>
        </div>
    );
}
