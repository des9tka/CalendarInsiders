import { Response } from "express"
import { IEvent } from "src/types/eventsTypes"
import { IUser } from "src/types/userTypes"

const eventsMissingFields = (event: IEvent, res: Response): boolean => {
    const missingFields = [];

    const { title, description, date, time, status } = event;

    if (!title) missingFields.push("title");
    if (!description) missingFields.push("description");
    if (!date) missingFields.push("date");
    if (!time) missingFields.push("time");
    if (!status) missingFields.push("status");

    if (missingFields.length > 0) {
        res.status(400).json({
            error: `Missing required fields: ${missingFields.join(", ")}.`
        });
        return false;
    }
    return true;
}

const authLoginMissingFields = (user: IUser, res: Response): boolean => {
    const missingFields = [];

    const { email, password } = user;

    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");

    if (missingFields.length > 0) {
        res.status(400).json({
            error: `Missing required fields: ${missingFields.join(", ")}.`
        });
        return false;
    }
    return true;
} 

const authRegisterMissingFields = (auth: IUser, res: Response): boolean => {
    const missingFields = [];

    const { username, email, password } = auth;

    if (!username) missingFields.push("username");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");

    if (missingFields.length > 0) {
        res.status(400).json({
            error: `Missing required fields: ${missingFields.join(", ")}.`
        });
        return false;
    }
    return true;
}

export { authLoginMissingFields, authRegisterMissingFields, eventsMissingFields }
