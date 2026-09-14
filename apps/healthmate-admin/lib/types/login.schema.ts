import z from "zod";

const LoginSchema = z.object({
    workEmail: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
})

export type Login = z.infer<typeof LoginSchema>;