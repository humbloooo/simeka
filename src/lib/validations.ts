import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number").max(15).optional(),
  enquiryType: z.enum(["general", "availability", "pricing", "nsfas", "other"], {
    message: "Please select an enquiry type",
  }),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;

export const applicationSchema = z.object({
  // Personal
  fullName: z.string().min(2, "Full name is required").max(100),
  idNumber: z.string().min(13, "ID number must be 13 digits").max(13),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other"]),
  phone: z.string().min(10, "Valid phone number required").max(15),
  email: z.string().email("Valid email required"),
  homeAddress: z.string().min(5, "Home address is required").max(300),
  // Academic
  university: z.string().min(1, "University is required"),
  studentNumber: z.string().min(1, "Student number is required").max(20),
  yearOfStudy: z.number().min(1).max(8),
  faculty: z.string().min(1, "Faculty/Department is required"),
  // Room
  roomType: z.string().min(1, "Please select a room type"),
  preferredMoveIn: z.string().min(1, "Preferred move-in date is required"),
  // Funding
  fundingSource: z.enum(["nsfas", "bursary", "self", "parent"]),
  nsfasRef: z.string().optional(),
  // Consents
  popiConsent: z.boolean().refine(val => val === true, "POPI consent is required"),
  termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms"),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
