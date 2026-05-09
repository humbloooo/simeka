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
        subtitle="Don't just take our word for it — see the rooms, the spaces, and the lifestyle for yourself."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Gallery" },
        ]}
      />
      <GalleryContent />
    </>
  );
}
