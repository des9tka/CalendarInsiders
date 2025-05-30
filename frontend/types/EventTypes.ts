export interface Event {
    id?: string;
    title: string;
    date: Date | string;
    description: string;
    time: string;
    status: "regular" | "important" | "urgent";
    userId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
