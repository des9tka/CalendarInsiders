"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

import CalendarGrid from "@/components/Calendar/CalendarGrid";
import AllEventsPanel from "@/components/Event/AllEventsPanel";
import EventDetails from "@/components/Event/EventDetails";
import EventModal from "@/components/Event/EventModal";
import StartPanel from "@/components/Event/StartPanel";
import TimeSlotPanel from "@/components/Event/TimeSlotPanel";
import Loader from "@/components/UI/Loader";
import { useCalendarStore } from "@/lib/stores/calendarStore";
import { useEventStore } from "@/lib/stores/eventStore";
import { useUserStore } from "@/lib/stores/userStore";

export default function Calendar() {
    const { selectedDate, isReverseView, themes, selectedTheme } =
        useCalendarStore();

    const { user, fetchUser, isLoading, error } = useUserStore();
    const { events, fetchEvents } = useEventStore();

    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const router = useRouter();

    useEffect(() => {
        const loadUser = async () => {
            try {
                await fetchUser();
            } catch (err) {
                router.push("/auth/signin");
            }
        };

        const loadEvents = async () => {
            try {
                await fetchEvents();
            } catch (err) {
                console.error("Failed to fetch events:", err);
            }
        };

        if (!user) loadUser();
        if (events.length === 0) loadEvents();

        const scrollPadding = document.createElement("div");
        scrollPadding.style.height = "1px";
        scrollPadding.style.position = "absolute";
        scrollPadding.style.bottom = "-2px";
        scrollPadding.style.opacity = "0";
        scrollPadding.style.pointerEvents = "none";
        document.body.appendChild(scrollPadding);

        return () => {
            if (document.body.contains(scrollPadding)) {
                document.body.removeChild(scrollPadding);
            }
        };
    }, [fetchUser, router]);

    const containerVariants = {
        hidden: {
            opacity: 0,
            y: -50,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.1,
            },
        },
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                {error}
                <button
                    className={"m-4 w-[250px] py-2 px-4 rounded-lg"}
                    onClick={() => window.location.reload()}
                >
                    Reload App
                </button>
            </div>
        );
    }

    return (
        <>
            <motion.div
                className="max-w-6xl w-full rounded-xl overflow-hidden"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div
                    className={`w-[300px] h-[300px] ${themes[selectedTheme].primary} absolute -z-50 left-1/2 top-1/2 rounded-full blur-3xl opacity-75 shadow-2xl`}
                ></div>

                <div className="flex justify-between z-50 text-white mb-10 mt-2">
                    <div
                        className="flex py-2 px-4 rounded-md justify-center items-center shadow-lg"
                        style={{
                            backgroundColor: "rgba(25, 25, 25, 0.7)",
                        }}
                    >
                        <FaUser size={30} />
                        <div className="flex flex-col ml-4">
                            <span className="text-xl">{user?.email}</span>
                            <span className="text-lg italic text-gray-500 opacity-100">
                                @{user?.username || "Guest"}
                            </span>
                        </div>
                    </div>

                    <button
                        className="flex px-6 bg-red-600 hover:bg-red-700 text-white rounded-lg items-center justify-center transition-colors duration-200 shadow-lg font-bold"
                        onClick={() => router.push("/auth/signin")}
                    >
                        <span className="mr-2">Sign Out</span>
                        <FaSignOutAlt size={20} />
                    </button>
                </div>

                <div className="flex flex-col md:flex-row">
                    <div
                        style={{ backgroundColor: "rgba(25, 25, 25, 0.5)" }}
                        className="w-full md:w-2/3 calendar-container p-6 text-white transition-transform duration-300 ease-in-out"
                    >
                        <CalendarGrid
                            currentDate={currentDate}
                            setCurrentDate={setCurrentDate}
                        />
                    </div>

                    <div
                        style={{ backgroundColor: "rgba(25, 25, 25, 0.7)" }}
                        className="w-full md:w-1/3 p-6 text-white border-t-3 md:border-t-0 md:border-l-3 border-gray-500"
                    >
                        {!selectedDate && !isReverseView && <StartPanel />}
                        {selectedDate && !isReverseView && <TimeSlotPanel />}
                        {isReverseView && (
                            <AllEventsPanel setCurrentDate={setCurrentDate} />
                        )}
                    </div>
                </div>

                <EventDetails />
                <EventModal />
            </motion.div>
        </>
    );
}
