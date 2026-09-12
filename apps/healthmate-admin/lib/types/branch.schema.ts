import * as z from "zod";

export const BranchSchema = z.object({
  branchName: z.string().min(1, "Branch name is required"),
  branchAddress: z.string("Branch address is requied"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  city: z.string().min(1, "City is required"),
});

export type Branch = z.infer<typeof BranchSchema>;
