import * as z from "zod";

export const DoctorProfileSchema = z.object({
  yearsOfExperience: z.number().min(1, "Input your years of experience"),
  specialization: z.string().min(1, "Specialization is required"),
  liscenceNumber: z.string().min(1, "Liscence number is required"),
  consultationFee: z.number().min(1, "Consultation Fee is required"),
  // address: z.string().min(1, "Input your address"),
  bio: z.string().min(1, "Bio is required"),
  logo: z.instanceof(File, { message: "A valid image is required" }),
  // consultationType: z.string().min(1, "Consultation Type is required"),
  // branchName: z.string().min(1, "Branch name is required"),
  // availableTimeSlots: z.array(z.string('Available Time Slots')),
  // availableDays: z.array(z.string('Available Days'))
});

export type Profile = z.infer<typeof DoctorProfileSchema>;
