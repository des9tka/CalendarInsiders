import { Event } from "../../types/EventTypes";
import { apiService } from "./axiosService";

export const eventService = {
    getAllEvents: async (): Promise<Event[]> => {
        const { data } = await apiService.get<Event[]>("/events");
        return data;
    },

    createEvent: async (eventData: Event): Promise<Event> => {
        const { data } = await apiService.post<Event>("/events", eventData);
        return data;
    },

    updateEvent: async (
        eventId: string,
        eventData: Partial<Event>,
    ): Promise<Event> => {
        const { data } = await apiService.patch<Event>(
            `/events/${eventId}`,
            eventData,
        );
        return data;
    },

    deleteEvent: async (eventId: string): Promise<void> => {
        await apiService.delete(`/events/${eventId}`);
    },
};
