"use client";

import { useCalendarStore } from "@/lib/stores/calendarStore";
import { useEventStore } from "@/lib/stores/eventStore";
import { formatDateKey } from "@/lib/utils";
import { FormEvent, useEffect, useState } from "react";
import EventForm from "@/forms/EventFrom"

export default function EventModal() {
    const {
        showModal,
        modalMode,
        selectedDate,
        setShowModal,
        selectedMode,
        modes,
    } = useCalendarStore();

    const { currentEventId, events } = useEventStore();

    const [date, setDate] = useState<string>(selectedDate ? formatDateKey(selectedDate) : "");

    const event = currentEventId ? events.find((e) => e.id === currentEventId) : null;

    useEffect(() => {
        if (modalMode === "edit" && event) {
            setDate(formatDateKey(event.date));
        } else if (selectedDate) {
            setDate(formatDateKey(selectedDate));
        }
    }, [modalMode, event, selectedDate]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        console.log("Form submitted", e);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 backdrop-blur-sm">
            <div
                className={`${modes[selectedMode].modalBg} rounded-xl w-full max-w-md max-h-screen overflow-y-auto p-6 ${modes[selectedMode].text}`}
            >
                <h3 className={`text-xl font-bold mb-4`}>
                    {modalMode === "create" ? "Create New Event" : "Edit Event"}
                </h3>
                <EventForm modalMode={modalMode} event={event ?? undefined} onCancel={handleCancel}/>
            </div>
        </div>
    );
}
