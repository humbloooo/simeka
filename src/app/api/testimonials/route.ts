import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Testimonial } from "@/lib/models/testimonial";

export async function GET() {
  try {
    await connectDB();

    const testimonials = await Testimonial.find({ approved: true })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return NextResponse.json(testimonials, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Testimonials fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
