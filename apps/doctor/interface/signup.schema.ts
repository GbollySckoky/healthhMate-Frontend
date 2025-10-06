import * as z from "zod";

export const SignUpSchema = z.object({
  fullName: z.string().min(1, "Your full name is required"),
  workEmail: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  password: z.string().min(1, "Password is required"),
  confirmPassword: z.string().min(1, "Password is not correct"),
  dob: z.string("Date of Birth is required"),
  gender: z.string("Gender is required"),
});

export type Signup = z.infer<typeof SignUpSchema>;
