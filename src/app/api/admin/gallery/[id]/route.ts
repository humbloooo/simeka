import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { connectDB } from "@/lib/mongodb";
import { GalleryImage } from "@/lib/models/gallery";
import cloudinary from "@/lib/cloudinary";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { id } = await params;

    const contentType = req.headers.get("content-type") || "";

    // Handle image replacement via FormData
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const caption = formData.get("caption") as string | null;
      const category = formData.get("category") as string | null;

      const existing = await GalleryImage.findById(id);
      if (!existing) {
        return NextResponse.json({ error: "Image not found" }, { status: 404 });
      }

      const updates: Record<string, unknown> = {};

      // If a new file is provided, upload to Cloudinary and delete old one
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

        const result = await cloudinary.uploader.upload(base64, {
          folder: "simeka-heights/gallery",
          resource_type: "image",
          transformation: [
            { width: 1920, height: 1080, crop: "limit", quality: "auto" },
          ],
        });

        // Delete old image from Cloudinary
        try {
          await cloudinary.uploader.destroy(existing.publicId);
        } catch (err) {
          console.error("Failed to delete old Cloudinary image:", err);
        }

        updates.url = result.secure_url;
        updates.publicId = result.public_id;
      }

      if (caption !== null) updates.caption = caption;
      if (category !== null) updates.category = category;

      const image = await GalleryImage.findByIdAndUpdate(id, updates, { new: true });
      return NextResponse.json({ image });
    }

    // Handle JSON updates (caption, category, order, featured)
    const body = await req.json();
    const allowedUpdates = ["category", "caption", "order", "featured"];
    const updates: Record<string, unknown> = {};
    for (const key of allowedUpdates) {
      if (body[key] !== undefined) updates[key] = body[key];
    }

    const image = await GalleryImage.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!image) {
      return NextResponse.json(
        { error: "Image not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ image });
  } catch {
    return NextResponse.json(
      { error: "Failed to update image" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { id } = await params;

    const image = await GalleryImage.findById(id);
    if (!image) {
      return NextResponse.json(
        { error: "Image not found" },
        { status: 404 }
      );
    }

    // Delete from Cloudinary
    try {
      await cloudinary.uploader.destroy(image.publicId);
    } catch (err) {
      console.error("Cloudinary delete error:", err);
    }

    await GalleryImage.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
