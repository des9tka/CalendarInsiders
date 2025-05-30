import { create } from "zustand";
import { Event } from "../../types/EventTypes";
import { eventService } from "../services/eventService";

interface EventStore {
    events: Event[];
    currentEventId: string | null;
    isLoading: boolean;
    error: string | null;
    fetchEvents: () => Promise<void>;
    addEvent: (eventData: Event) => Promise<void>;
    editEvent: (eventId: string, eventData: Event) => Promise<void>;
    deleteEvent: (eventId: string) => Promise<void>;
    setCurrentEventId: (id: string | null) => void;
}

export const useEventStore = create<EventStore>((set, get) => ({
    events: [],
    currentEventId: null,
    isLoading: false,
    error: null,
    fetchEvents: async () => {
        set({ isLoading: true, error: null });
        try {
            const events = await eventService.getAllEvents();
            set({ events, isLoading: false });
        } catch (error) {
            set({ error: "Failed to fetch events", isLoading: false });
        }
    },
    addEvent: async (eventData) => {
        set({ isLoading: true, error: null });
        try {
            console.log("Adding new event:", eventData);
            const newEvent = await eventService.createEvent(eventData);
            console.log("New event added:", newEvent);
            set((state) => ({
                events: [...state.events, newEvent],
                isLoading: false,
            }));
        } catch (error) {
            console.error("Error adding event:", error);
            set({ error: "Failed to add event", isLoading: false });
        }
    },
    editEvent: async (eventId, eventData) => {
        set({ isLoading: true, error: null });
        try {
            const updatedEvent = await eventService.updateEvent(
                eventId,
                eventData,
            );
            set((state) => ({
                events: state.events.map((e) =>
                    e.id === eventId ? updatedEvent : e,
                ),
                isLoading: false,
            }));
        } catch (error) {
            set({ error: "Failed to update event", isLoading: false });
        }
    },
    deleteEvent: async (eventId) => {
        set({ isLoading: true, error: null });
        try {
            await eventService.deleteEvent(eventId);
            set((state) => ({
                events: state.events.filter((e) => e.id !== eventId),
                isLoading: false,
            }));
        } catch (error) {
            set({ error: "Failed to delete event", isLoading: false });
        }
    },
    setCurrentEventId: (id) => set({ currentEventId: id }),
}));
