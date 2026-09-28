import { z } from "zod";
export const membershipSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  registerNumber: z.string().min(2),
  year: z.string().optional(),
  section: z.string().optional(),
  department: z.string().optional(),
  skillsText: z.string().optional(),
  interests: z.string().optional(),
  experience: z.string().optional()
});
