import * as z from "zod";

export const HospitalSchema = z.object({
  hospitalName: z.string().min(1, "Hospital name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
});

export type Hospital = z.infer<typeof HospitalSchema>;
