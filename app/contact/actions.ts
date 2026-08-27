"use server";

import { Resend } from "resend";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";
import { createServiceRoleClient } from "@/lib/supabase/server";

export type ContactActionResult =
  | { status: "success" }
  | { status: "error"; message: string };

export async function submitContactForm(
  values: ContactFormValues
): Promise<ContactActionResult> {
  const parsed = contactFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
    };
  }

  const { company, ...data } = parsed.data;

  // Honeypot tripped — pretend success, do nothing.
  if (company) {
    return { status: "success" };
  }

  try {
    const supabase = createServiceRoleClient();
    const { error } = await supabase.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      organisation: data.organisation || null,
      enquiry_type: data.enquiryType,
      timeline: data.timeline || null,
      message: data.message,
    });

    if (error) throw error;
  } catch (error) {
    console.error("Failed to store contact submission:", error);
    return {
      status: "error",
      message:
        "Something went wrong saving your message. Please try WhatsApp or LinkedIn instead.",
    };
  }

  // Email notification is best-effort — a failure here shouldn't fail the
  // submission, since the enquiry is already safely stored in Supabase.
  if (process.env.RESEND_API_KEY && process.env.CONTACT_NOTIFICATION_EMAIL) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Portfolio Contact Form <onboarding@resend.dev>",
        to: process.env.CONTACT_NOTIFICATION_EMAIL,
        replyTo: data.email,
        subject: `New enquiry: ${data.enquiryType} (${data.name})`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Organisation: ${data.organisation || "N/A"}`,
          `Enquiry type: ${data.enquiryType}`,
          `Timeline: ${data.timeline || "N/A"}`,
          "",
          data.message,
        ].join("\n"),
      });
    } catch (error) {
      console.error("Failed to send contact notification email:", error);
    }
  }

  return { status: "success" };
}
