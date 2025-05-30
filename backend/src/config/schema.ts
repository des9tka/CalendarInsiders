import { sql } from "drizzle-orm"
import {
    date,
    integer,
    pgEnum,
    pgTable,
    serial,
    text,
    time,
    varchar
} from "drizzle-orm/pg-core"


export const eventsStatusEnum = pgEnum("event_status", [
    "regular",
    "important",
    "urgent",
]);

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    username: varchar("username", { length: 100 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
});

export const events = pgTable("events", {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
        .notNull()
        .references(() => users.id),
    title: varchar("title", { length: 255 }).notNull(),
    description: varchar("description", { length: 1000 }).notNull(),
    date: date("date").notNull().default(sql`CURRENT_DATE`),
    time: time("time").notNull().default(sql`TIME '12:00'`),
    status: eventsStatusEnum("status").notNull().default("regular"),
});