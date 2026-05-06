import mongoose, { Document, Schema } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  yearOfStudy: string;
  faculty: string;
  quote: string;
  rating: number;
  photoUrl: string;
  approved: boolean;
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true, trim: true },
    yearOfStudy: { type: String, required: true },
    faculty: { type: String, required: true },
    quote: { type: String, required: true, trim: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    photoUrl: { type: String, default: "" },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
