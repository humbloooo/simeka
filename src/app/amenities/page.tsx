import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { AmenitiesContent } from "./amenities-content";

export const metadata: Metadata = {
  title: "Amenities",
  description:
    "Explore our world-class amenities: 24/7 security, high-speed WiFi, gym, study lounges, braai area, and more at Simeka Heights near UNIVEN.",
  alternates: { canonical: "https://simekaheights.com/amenities" },
};

export default function AmenitiesPage() {
  return (
    <>
      <PageHeader
        title="Amenities"
        subtitle="Gym, study lounges, braai area, fibre WiFi, backup power — every detail designed for student life."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Amenities" },
        ]}
      />
      <AmenitiesContent />
    </>
  );
}
