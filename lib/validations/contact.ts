import { z } from "zod";

export const ENQUIRY_TYPES = [
  "Consulting",
  "Data Analytics",
  "Data Science",
  "Aviation Analytics",
  "Research",
  "Training",
  "Speaking",
  "Collaboration",
  "Other",
] as const;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(120),
  email: z.string().trim().email("Enter a valid email address."),
  organisation: z.string().trim().max(160).optional().or(z.literal("")),
  enquiryType: z.enum(ENQUIRY_TYPES, {
    message: "Select an enquiry type.",
  }),
  timeline: z.string().trim().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Tell me a bit more (at least 20 characters).")
    .max(4000),
  // Honeypot: real users never fill this in. Bots that fill every field do.
  company: z.string().max(0, "").optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
