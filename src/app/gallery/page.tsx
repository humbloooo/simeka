import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { GalleryContent } from "./gallery-content";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Take a virtual tour of Simeka Heights student residence. View our rooms, common areas, gym, study lounges, and outdoor spaces near UNIVEN.",
  alternates: { canonical: "https://simekaheights.com/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="See what life at Simeka Heights looks like. Explore our rooms, amenities, and community spaces."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Gallery" },
        ]}
      />
      <GalleryContent />
    </>
  );
}
