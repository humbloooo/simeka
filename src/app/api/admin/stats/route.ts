import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { connectDB } from "@/lib/mongodb";
import { Application } from "@/lib/models/application";
import { Enquiry } from "@/lib/models/enquiry";
import { Newsletter } from "@/lib/models/newsletter";
import { Testimonial } from "@/lib/models/testimonial";
import { GalleryImage } from "@/lib/models/gallery";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    const [
      totalApplications,
      pendingApplications,
      approvedApplications,
      totalEnquiries,
      newEnquiries,
      totalSubscribers,
      totalTestimonials,
      pendingTestimonials,
      totalImages,
    ] = await Promise.all([
      Application.countDocuments(),
      Application.countDocuments({ status: "pending" }),
      Application.countDocuments({ status: "approved" }),
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: "new" }),
      Newsletter.countDocuments(),
      Testimonial.countDocuments(),
      Testimonial.countDocuments({ approved: false }),
      GalleryImage.countDocuments(),
    ]);

    return NextResponse.json({
      applications: { total: totalApplications, pending: pendingApplications, approved: approvedApplications },
      enquiries: { total: totalEnquiries, new: newEnquiries },
      subscribers: totalSubscribers,
      testimonials: { total: totalTestimonials, pending: pendingTestimonials },
      gallery: totalImages,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
