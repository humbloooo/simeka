import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { GalleryImage } from "@/lib/models/gallery";

// Public endpoint — no auth required
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const filter: Record<string, unknown> = {};
    if (category && category !== "all") filter.category = category;

    const images = await GalleryImage.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .select("url category caption featured")
      .lean();

    return NextResponse.json(
      { images },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=300, stale-while-revalidate=3600",
        },
      }
    );
  } catch (error) {
    console.error("Public gallery fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery" },
      { status: 500 }
    );
  }
}
