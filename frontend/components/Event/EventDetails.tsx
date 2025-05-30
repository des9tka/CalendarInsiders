"use client";

import { useCalendarStore } from "@/lib/stores/calendarStore";
import { useEventStore } from "@/lib/stores/eventStore";

import { formatTimeDisplay } from "@/lib/utils";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function EventDetails() {
    const {
        showEventDetails,
        setShowEventDetails,
        setShowModal,
        selectedTheme,
        selectedMode,
        themes,
        modes,
    } = useCalendarStore();

    const { currentEventId, events, deleteEvent } = useEventStore();

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const event = currentEventId
        ? events.find((e) => e.id === currentEventId)
        : null;

    const handleEdit = () => {
        setShowModal(true, "edit");
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        if (currentEventId) {
            deleteEvent(currentEventId);
        }
        setShowDeleteModal(false);
        setShowEventDetails(false);
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    const handleClose = () => {
        setShowEventDetails(false);
    };

    // Instead of returning null, we'll use AnimatePresence to control the animation
    return (
        <AnimatePresence>
            {showEventDetails && event && (
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    <div
                        style={{ backgroundColor: "rgba(25, 25, 25, 0.9)" }}
                        className={`border-t-3 border-gray-500 ${
                            modes[selectedMode].background
                        } ${modes[selectedMode].text} p-6 w-full ${
                            showDeleteModal ? "backdrop-blur-sm" : ""
                        }`}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <motion.div
                                className="md:col-span-2 space-y-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <h3 className="text-2xl font-bold">
                                    {event.title}
                                </h3>
                                <div className="text-xl">
                                    {event.time && formatTimeDisplay(event.time)}
                                </div>
                                <div className={modes[selectedMode].text}>
                                    {event.description ||
                                        "No description provided"}
                                </div>
                            </motion.div>
                        </div>
                        <div className="mt-6 flex justify-start">
                            <button
                                onClick={handleClose}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg mr-2 transition-colors duration-200"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleEdit}
                                className={`${themes[selectedTheme].primary} text-white px-4 py-2 rounded-lg mr-2 transition-colors duration-200`}
                            >
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    className="mr-1"
                                />{" "}
                                Edit
                            </button>
                            <button
                                onClick={handleDeleteClick}
                                className={`${themes[selectedTheme].primary} text-white px-4 py-2 rounded-lg transition-colors duration-200`}
                            >
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="mr-1"
                                />{" "}
                                Delete
                            </button>
                        </div>
                    </div>

                    <AnimatePresence>
                        {showDeleteModal && (
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center bg-gray-950/50 backdrop-blur-sm z-50"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    className={`${modes[selectedMode].background} ${modes[selectedMode].text} p-6 rounded-lg shadow-lg max-w-sm w-full`}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeOut",
                                    }}
                                >
                                    <h3 className="text-xl font-bold mb-4">
                                        Confirm Delete
                                    </h3>
                                    <p className="mb-6">
                                        Are you sure you want to delete this
                                        event?
                                    </p>
                                    <div className="flex justify-end space-x-4">
                                        <button
                                            onClick={handleCancelDelete}
                                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleConfirmDelete}
                                            className={`${themes[selectedTheme].primary} text-white px-4 py-2 rounded-lg transition-colors duration-200`}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
