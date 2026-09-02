"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ENQUIRY_TYPES,
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";
import { FORMSPREE_ENDPOINT } from "@/lib/site-config";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      organisation: "",
      timeline: "",
      message: "",
      company: "",
    },
  });

  const enquiryType = watch("enquiryType");

  const onSubmit = handleSubmit((values) => {
    // Honeypot tripped — pretend success, submit nothing.
    if (values.company) {
      toast.success("Message sent. Thanks for reaching out.");
      reset();
      return;
    }

    startTransition(async () => {
      try {
        const payload = { ...values };
        delete payload.company;
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Submission failed");

        toast.success("Message sent. Thanks for reaching out.", {
          description: "I'll get back to you as soon as I can.",
        });
        reset();
      } catch {
        toast.error(
          "Something went wrong sending your message. Please try WhatsApp or LinkedIn instead."
        );
      }
    });
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Honeypot — hidden from real users, visible to bots that fill every field */}
      <div className="hidden" aria-hidden="true">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" autoComplete="name" {...register("name")} />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="organisation">Organisation (optional)</Label>
          <Input id="organisation" {...register("organisation")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="timeline">Timeline (optional)</Label>
          <Input
            id="timeline"
            placeholder="e.g. Within a month"
            {...register("timeline")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="enquiryType">Enquiry type</Label>
        <Select
          value={enquiryType}
          onValueChange={(value) =>
            setValue("enquiryType", value as ContactFormValues["enquiryType"], {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger id="enquiryType" className="w-full">
            <SelectValue placeholder="Select an enquiry type" />
          </SelectTrigger>
          <SelectContent>
            {ENQUIRY_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.enquiryType && (
          <p className="text-xs text-destructive">
            {errors.enquiryType.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={6}
          placeholder="What are you working on, and how can I help?"
          {...register("message")}
        />
        {errors.message && (
          <p className="text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" size="lg" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send message
            <Send className="size-4" />
          </>
        )}
      </Button>
    </form>
  );
}
