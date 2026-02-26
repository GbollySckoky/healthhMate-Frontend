import * as z from "zod";

export const HospitalProfileSchema = z.object({
  hospitalName: z.string().min(1, "Hospital name is required"),
  workEmail: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  language: z.string().min(1, "Language is required"),
  // `File` is a browser global and not available during SSR. Use a safe
  // fallback so schema loading doesn't crash during Next.js prerendering.
  logo: (typeof File !== "undefined"
    ? z.instanceof(File, { message: "A valid file is required" })
    : z.any())
});

export type Profile = z.infer<typeof HospitalProfileSchema>;
