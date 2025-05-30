import { Response } from "express"
import { z } from "zod"

export const userValidatorSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters").max(100, "Username max length is 100"),
  password: z.string().min(6, "Password must be at least 6 characters").max(255, "Password max length is 255"),
});

const userValidator = (user: { email: string; username: string; password: string }, res: Response) => {
  try {
    userValidatorSchema.parse(user);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: err.errors.map(e => e.message).join(", ") });
      return false;
    }
    res.status(500).json({ error: "Internal server error" });
    return false;
  }
  return true;
}

export { userValidator }

