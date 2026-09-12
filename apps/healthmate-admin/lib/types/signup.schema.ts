import * as z from "zod";

export const SignUpSchema = z.object({
  hospitalName: z.string().min(2, "Hospital name is required"),
  dateOfEstablishment: z.string().min(2, "Date Of Hospital Establishment is required"),
  workEmail: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters long"),
});

export type Signup = z.infer<typeof SignUpSchema>;
