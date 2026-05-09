import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { LocationContent } from "./location-content";

export const metadata: Metadata = {
  title: "Location",
  description:
    "Simeka Heights is located in Thohoyandou — 1.3km from UNIVEN campus with free shuttle service. Find distances to shops, clinics, and transport.",
  alternates: { canonical: "https://simekaheights.com/location" },
};

export default function LocationPage() {
  return (
    <>
      <PageHeader
        title="Our Location"
        subtitle="Right where you need to be — steps from UNIVEN campus and everything Thohoyandou has to offer."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Location" },
        ]}
      />
      <LocationContent />
    </>
  );
}
