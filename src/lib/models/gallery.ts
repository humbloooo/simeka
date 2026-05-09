import mongoose, { Schema, Document } from "mongoose";

export interface IGalleryImage extends Document {
  url: string;
  publicId: string;
  category: "rooms" | "amenities" | "exterior" | "events" | "general";
  caption: string;
  order: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    category: {
      type: String,
      enum: ["rooms", "amenities", "exterior", "events", "general"],
      default: "general",
    },
    caption: { type: String, default: "" },
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const GalleryImage =
  mongoose.models.GalleryImage ||
  mongoose.model<IGalleryImage>("GalleryImage", GalleryImageSchema);
