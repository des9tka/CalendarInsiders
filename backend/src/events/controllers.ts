import { and, eq, like, sql } from "drizzle-orm"
import { Request, Response } from "express"

import { db } from "src/config/db"
import { events, eventsStatusEnum } from "src/config/schema"
import { bodyRequestHandler } from "src/utils/dataCheck"
import { eventsMissingFields } from "src/utils/missingFields"
import { eventValidator } from "src/validators/eventValidator"

const validStatuses = eventsStatusEnum.enumValues;

import { or } from "drizzle-orm"; // не забудь импортировать or

const GetAllUsersEventsController = async (
    req: Request,
    res: Response,
): Promise<Response | void> => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const { status, title, description, key } = req.query;

    const conditions = [eq(events.userId, Number(req.user.userId))];

    if (typeof status === "string") {
        if (
            !validStatuses.includes(
                status as (typeof eventsStatusEnum.enumValues)[number],
            )
        ) {
            return res.status(400).json({
                error: `Invalid status. Valid statuses: ${validStatuses.join(", ")}`,
            });
        }
        conditions.push(
            eq(
                events.status,
                status as (typeof eventsStatusEnum.enumValues)[number],
            ),
        );
    }

    if (typeof title === "string" && title.trim()) {
        conditions.push(like(events.title, `%${title.trim()}%`));
    }

    if (typeof description === "string" && description.trim()) {
        conditions.push(like(events.description, `%${description.trim()}%`));
    }

    if (typeof key === "string" && key.trim()) {
        const trimmedKey = `%${key.trim()}%`;

        const orConditions = [
            like(events.title, trimmedKey),
            like(events.description, trimmedKey),
            like(sql`${events.status}::text`, trimmedKey), // приводим enum к тексту
            like(sql`${events.date}::text`, trimmedKey),
            like(sql`${events.time}::text`, trimmedKey),
        ].filter(Boolean);

        if (orConditions.length > 0) {
            const orCondition = or(...orConditions);
            if (orCondition) {
                conditions.push(orCondition);
            }
        }
    }

    const usersEvents = await db
        .select()
        .from(events)
        .where(and(...conditions))
        .execute();

    res.status(200).json(usersEvents);
};


const CreateEventController = async (
    req: Request,
    res: Response,
): Promise<Response | void> => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    if (!bodyRequestHandler(req, res)) return;
    if (!eventsMissingFields(req.body, res)) return;
    if (!eventValidator(req.body, res)) return;

    const { title, description, date, time, status } = req.body;

    const newEvent = await db
        .insert(events)
        .values({
            userId: Number(req.user.userId),
            title,
            date,
            time,
            description,
            status,
        })
        .returning()
        .execute();

    res.status(201).json(newEvent[0]);
};

const UpdateEventStatusController = async (
    req: Request,
    res: Response,
): Promise<Response | void> => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (!bodyRequestHandler(req, res)) return;

    const eventId = Number(req.params.eventId);

    if (!eventId) {
        return res.status(400).json({ error: "Missing eventId" });
    }

    const { status, description, title, time, date } = req.body;

    if (!eventValidator(req.body, res)) return;

    const updateData: Partial<{
        status: (typeof eventsStatusEnum.enumValues)[number];
        description: string;
        title: string;
        time: string;
        date: string;
    }> = {};

    if (status) updateData.status = status;
    if (description) updateData.description = description;
    if (title) updateData.title = title;
    if (time) updateData.time = time;
    if (date) updateData.date = date;

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: "No fields to update" });
    }

    const returnEvent = await db
        .update(events)
        .set(updateData)
        .where(
            and(
                eq(events.id, eventId),
                eq(events.userId, Number(req.user.userId))
            )
        )
        .returning();

    if (returnEvent.length === 0)
        return res.status(404).json({ error: "Event not found or forbidden." });

    res.status(200).json(returnEvent[0]);
};

const DeleteEventController = async (
    req: Request,
    res: Response,
): Promise<Response | void> => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const eventId = Number(req.params.eventId);
    if (!eventId) {
        return res.status(400).json({ error: "Missing eventId" });
    }

    const event = await db
        .select()
        .from(events)
        .where(eq(events.id, eventId))
        .execute();

    if (event.length === 0) {
        return res.status(404).json({ error: "Event not found" });
    } else if (event[0].userId !== Number(req.user.userId)) {
        return res.status(403).json({ error: "Forbidden to delete." });
    }

    await db.delete(events).where(eq(events.id, eventId)).execute();

    res.status(204).send();
};

export {
    CreateEventController,
    DeleteEventController,
    GetAllUsersEventsController,
    UpdateEventStatusController
}

