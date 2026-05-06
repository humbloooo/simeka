import mongoose, { Document, Schema } from "mongoose";

export interface IApplication extends Document {
  fullName: string;
  idNumber: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  phone: string;
  email: string;
  homeAddress: string;
  university: string;
  studentNumber: string;
  yearOfStudy: number;
  faculty: string;
  roomType: string;
  preferredMoveIn: string;
  fundingSource: "nsfas" | "bursary" | "self" | "parent";
  nsfasRef?: string;
  status: "pending" | "reviewing" | "approved" | "rejected" | "waitlisted";
  notes: string;
  ip: string;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    fullName: { type: String, required: true, trim: true },
    idNumber: { type: String, required: true, trim: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true, enum: ["male", "female", "other"] },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    homeAddress: { type: String, required: true, trim: true },
    university: { type: String, default: "University of Venda" },
    studentNumber: { type: String, required: true, trim: true },
    yearOfStudy: { type: Number, required: true },
    faculty: { type: String, required: true, trim: true },
    roomType: { type: String, required: true },
    preferredMoveIn: { type: String, required: true },
    fundingSource: {
      type: String,
      required: true,
      enum: ["nsfas", "bursary", "self", "parent"],
    },
    nsfasRef: { type: String, trim: true },
    status: {
      type: String,
      enum: ["pending", "reviewing", "approved", "rejected", "waitlisted"],
      default: "pending",
    },
    notes: { type: String, default: "" },
    ip: { type: String },
  },
  { timestamps: true }
);

export const Application =
  mongoose.models.Application ||
  mongoose.model<IApplication>("Application", ApplicationSchema);
