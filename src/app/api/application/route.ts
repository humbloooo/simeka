import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Application } from "@/lib/models/application";
import { applicationSchema } from "@/lib/validations";
import { sendConfirmationEmail } from "@/lib/email";

const rateLimit = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now - entry.timestamp > RATE_WINDOW) {
    rateLimit.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

function sanitize(str: string): string {
  return str.replace(/<[^>]*>/g, "").trim();
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = applicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    await connectDB();

    const application = await Application.create({
      fullName: sanitize(parsed.data.fullName),
      idNumber: parsed.data.idNumber.trim(),
      dateOfBirth: parsed.data.dateOfBirth,
      gender: parsed.data.gender,
      phone: parsed.data.phone.trim(),
      email: parsed.data.email.toLowerCase().trim(),
      homeAddress: sanitize(parsed.data.homeAddress),
      university: parsed.data.university,
      studentNumber: parsed.data.studentNumber.trim(),
      yearOfStudy: parsed.data.yearOfStudy,
      faculty: sanitize(parsed.data.faculty),
      roomType: parsed.data.roomType,
      preferredMoveIn: parsed.data.preferredMoveIn,
      fundingSource: parsed.data.fundingSource,
      nsfasRef: parsed.data.nsfasRef?.trim(),
      ip,
    });

    // Generate reference and send confirmation email
    const referenceNumber = await sendConfirmationEmail({
      name: parsed.data.fullName,
      email: parsed.data.email,
      roomType: parsed.data.roomType,
      referenceNumber: "", // Will be generated
    });

    return NextResponse.json({
      success: true,
      applicationId: application._id.toString(),
      referenceNumber,
    });
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit application. Please try again." },
      { status: 500 }
    );
  }
}
