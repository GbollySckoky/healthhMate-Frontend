import * as z from "zod";

export const PersonalInformationSchema = z.object({
  specialization: z.string().min(1, "Your Specialization is required"),
  experience: z.string().min(1, "Your Experience is required"),
  bio: z.string().min(1, "Bio is required"),
});

export type PersonalInformation = z.infer<typeof PersonalInformationSchema>;
