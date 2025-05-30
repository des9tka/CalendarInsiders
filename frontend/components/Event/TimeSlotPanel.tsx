"use client";

import { useCalendarStore } from "@/lib/stores/calendarStore";
import { useEventStore } from "@/lib/stores/eventStore";
import {
    formatDateDisplay,
    formatDateKey,
    formatTimeDisplay,
} from "@/lib/utils";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TimeSlotPanel() {
    const {
        selectedDate,
        setShowModal,
        setShowEventDetails,
        selectedTheme,
        selectedMode,
        themes,
        modes,
    } = useCalendarStore();

    const { events, currentEventId, setCurrentEventId } = useEventStore();

    if (!selectedDate) return null;

    const dateKey = formatDateKey(selectedDate);
    const dayEvents = events
        .filter((event) => String(event.date) === dateKey)
        .sort((a, b) => (a.time || "").localeCompare(b.time || ""));

    const handleAddEvent = () => {
        setCurrentEventId(null);
        setShowModal(true, "create");
    };

    const handleEventClick = (eventId: string) => {
        if (eventId === currentEventId) {
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

    return (
        <div>
            <h3
                className={`text-xl font-bold mb-4 ${modes[selectedMode].text}`}
            >
                {formatDateDisplay(selectedDate)}
            </h3>
            <div className="mb-6">
                <h4
                    className={`text-lg font-semibold mb-2 ${modes[selectedMode].text}`}
                >
                    Time
                </h4>
                <div className="grid gap-2">
                    {dayEvents.length === 0 ? (
                        <div
                            className={`text-gray-500 py-2 ${modes[selectedMode].text}`}
                        >
                            No events scheduled for this day.
                        </div>
                    ) : (
                        dayEvents.map((event) => (
                            <div
                                key={event.id}
                                className={`p-3 ${
                                    modes[selectedMode].panelBg
                                } rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer border-l-4 ${getColorClass(
                                    event.status,
                                )} mb-2`}
                                onClick={() =>
                                    event.id && handleEventClick(event.id)
                                }
                            >
                                <div
                                    className={`font-semibold ${modes[selectedMode].text}`}
                                >
                                    {event.time &&
                                        formatTimeDisplay(event.time)}
                                </div>
                                <div className={modes[selectedMode].text}>
                                    {event.title}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <button
                onClick={handleAddEvent}
                className={`w-full ${themes[selectedTheme].primary} text-white py-2 rounded-lg mb-4`}
            >
                <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Event
            </button>
        </div>
    );
}
