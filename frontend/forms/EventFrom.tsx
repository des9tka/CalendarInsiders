"use client";

import { useEventStore } from "@/lib/stores/eventStore";
import { Event } from "@/types/EventTypes";
import {
    eventFormData,
    eventValidatorSchema,
} from "@/validators/eventValidators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface EventFormProps {
    modalMode: "create" | "edit";
    event?: Event;
    onCancel: () => void;
    onSubmitSuccess?: () => void;
}

export default function EventForm({
    modalMode,
    event,
    onCancel,
    onSubmitSuccess,
}: EventFormProps) {
    const { addEvent, editEvent } = useEventStore();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<eventFormData>({
        resolver: zodResolver(eventValidatorSchema),
        defaultValues: {
            title: event?.title || "",
            description: event?.description || "",
            date: event?.date
                ? event.date instanceof Date
                    ? event.date.toISOString().slice(0, 10)
                    : event.date
                : "",
            time: event?.time || "",
            status: event?.status || "regular",
        },
    });

    const selectedColor = watch("status");

    const onSubmit = async (data: eventFormData) => {
        try {
            if (modalMode === "create") {
                await addEvent(data);
            } else if (event?.id) {
                await editEvent(event.id, data);
            }
            onSubmitSuccess?.();
        } catch (error) {
            console.error("Failed to save event:", error);
        }
    };

    const colorOptions = [
        { name: "regular", color: "bg-green-600", label: "Regular" },
        { name: "important", color: "bg-yellow-600", label: "Important" },
        { name: "urgent", color: "bg-red-600", label: "Urgent" },
    ] as const;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label
                    htmlFor="eventNameInput"
                    className="block text-sm font-medium text-gray-300 mb-1"
                >
                    Event Name
                </label>
                <input
                    id="eventNameInput"
                    type="text"
                    {...register("title")}
                    placeholder="Enter event name"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.title && (
                    <p className="text-red-300 text-sm mt-1">
                        {errors.title.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="eventTimeInput"
                    className="block text-sm font-medium text-gray-300 mb-1"
                >
                    Time
                </label>
                <input
                    id="eventTimeInput"
                    type="time"
                    {...register("time")}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.time && (
                    <p className="text-red-300 text-sm mt-1">
                        {errors.time.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="eventDateInput"
                    className="block text-sm font-medium text-gray-300 mb-1"
                >
                    Date
                </label>
                <input
                    id="eventDateInput"
                    type="date"
                    {...register("date")}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.date && (
                    <p className="text-red-300 text-sm mt-1">
                        {errors.date.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="eventDescInput"
                    className="block text-sm font-medium text-gray-300 mb-1"
                >
                    Description
                </label>
                <textarea
                    id="eventDescInput"
                    {...register("description")}
                    rows={3}
                    placeholder="Enter event description"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.description && (
                    <p className="text-red-300 text-sm mt-1">
                        {errors.description.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                    Event Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {colorOptions.map((option) => (
                        <button
                            key={option.name}
                            type="button"
                            className={`w-full py-2 rounded ${option.color} ${
                                selectedColor === option.name
                                    ? "ring-2 ring-white"
                                    : ""
                            } text-white text-sm font-medium`}
                            onClick={() => setValue("status", option.name)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
                {errors.status && (
                    <p className="text-red-300 text-sm mt-1">
                        {errors.status.message}
                    </p>
                )}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                >
                    {modalMode === "create" ? "Save Event" : "Update Event"}
                </button>
            </div>
        </form>
    );
}
