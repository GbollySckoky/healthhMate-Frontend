import * as z from "zod";

export const AddAdminSchema = z.object({
  fullName: z.string().min(1, "Hospital name is required"),
  emailAddress: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  role: z.string("Select a role"),
});

export type Admin = z.infer<typeof AddAdminSchema>;
