import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { connectDB } from "@/lib/mongodb";
import { Testimonial } from "@/lib/models/testimonial";

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const approved = searchParams.get("approved");

    const filter: Record<string, unknown> = {};
    if (approved === "true") filter.approved = true;
    if (approved === "false") filter.approved = false;

    const testimonials = await Testimonial.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ testimonials });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await req.json();

    const testimonial = await Testimonial.create({
      name: body.name,
      yearOfStudy: body.yearOfStudy,
      faculty: body.faculty,
      quote: body.quote,
      rating: body.rating || 5,
      photoUrl: body.photoUrl || "",
      approved: body.approved ?? true,
    });

    return NextResponse.json({ testimonial }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
