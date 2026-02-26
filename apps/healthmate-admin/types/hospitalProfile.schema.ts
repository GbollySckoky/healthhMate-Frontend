import * as z from "zod";

export const HospitalProfileSchema = z.object({
  hospitalName: z.string().min(1, "Hospital name is required"),
  workEmail: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  language: z.string().min(1, "Language is required"),
  // logo: z.instanceof(File, { message: "A valid file is required" })
});

export type Profile = z.infer<typeof HospitalProfileSchema>;
