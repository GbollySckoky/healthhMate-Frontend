import * as z from "zod";

export const DoctorProfileSchema = z.object({
  fullName: z.string().min(1, "Input your full name"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  specialty: z.string().min(1, "Input your specialty"),
  address: z.string().min(1, "Input your address"),
  bio: z.string().min(1, "Bio is required"),
  logo: z.instanceof(File, { message: "A valid image is required" })
});

export type Profile = z.infer<typeof DoctorProfileSchema>;
