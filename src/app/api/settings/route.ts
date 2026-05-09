import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { SiteSettings } from "@/lib/models/site-settings";

// Public endpoint – cached for 60s
export const revalidate = 60;

export async function GET() {
  try {
    await connectDB();

    let settings = await SiteSettings.findOne().lean();
    if (!settings) {
      settings = await SiteSettings.create({});
      settings = settings.toObject();
    }

    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}
