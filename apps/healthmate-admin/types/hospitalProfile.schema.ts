import * as z from "zod";

export const HospitalProfileSchema = z.object({
  bio: z.string().min(1, "Bio is required"),
  liscenseNumber: z.string().email("Liscense Number is required"),
  address: z.string().min(1, "Address is required"),
  state: z.string().min(1, "State is required"),
  profilePicture: z.string().min(1, "Profile Picture is required"),
  website: z.string().min(1, "Website is required"),
  specializations: z.string().min(1, "Specializations is required"),
});

export type Profile = z.infer<typeof HospitalProfileSchema>;
