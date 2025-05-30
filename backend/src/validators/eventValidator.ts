import { Response } from "express"
import { IEvent } from "src/types/eventsTypes"
import { z } from "zod"

const eventStatusEnum = ["regular", "important", "urgent"] as const;

export const eventValidatorSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character").max(50, "Title max length is 50"),
  description: z.string().min(1, "Description must be at least 1 character").max(250, "Description max length is 250"),
  status: z.enum(eventStatusEnum, {
    errorMap: () => ({ message: `Status must be one of: ${eventStatusEnum.join(", ")}` }),
  }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in format YYYY-MM-DD"),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, "Time must be in format HH:mm or HH:mm:ss"),
});

const eventValidator = (event: IEvent, res: Response) => {
	try {
		eventValidatorSchema.parse(event);
	} catch (err) {
		if (err instanceof z.ZodError) {
			res.status(400).json({ error: err.errors.map(e => e.message).join(", ") });
		} else res.status(500).json({ error: "Internal server error" });
		return false;
	}
	return true;
}

export { eventValidator }

