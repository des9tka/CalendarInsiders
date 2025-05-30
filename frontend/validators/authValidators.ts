import { z } from "zod"

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z
	.string()
	.min(3, "Username must be at least 3 characters")
	.max(100, "Username max length is 100"),
  password: z
	.string()
	.min(6, "Password must be at least 6 characters")
	.max(255, "Password max length is 255"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
	.string()
	.min(6, "Password must be at least 6 characters")
	.max(255, "Password max length is 255"),
});

type registerFormData = z.infer<typeof registerSchema>;
type loginFormData = z.infer<typeof loginSchema>;

export { registerSchema, loginSchema }
export type { registerFormData, loginFormData }

