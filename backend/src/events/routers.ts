import { RequestHandler, Router } from "express"
import { loginMiddleware } from "src/middlewares.ts"
import {
    CreateEventController,
    DeleteEventController,
    GetAllUsersEventsController,
    UpdateEventStatusController,
} from "./controllers"

const eventsRouter = Router();

eventsRouter.get(
    "/",
    loginMiddleware as RequestHandler,
    GetAllUsersEventsController as RequestHandler,
);

eventsRouter.post(
    "/",
    loginMiddleware as RequestHandler,
    CreateEventController as RequestHandler,
);

eventsRouter.patch(
    "/:eventId",
    loginMiddleware as RequestHandler,
    UpdateEventStatusController as RequestHandler,
);

eventsRouter.delete(
    "/:eventId",
    loginMiddleware as RequestHandler,
    DeleteEventController as RequestHandler,
);

export default eventsRouter;
