import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { RoomsContent } from "./rooms-content";

export const metadata: Metadata = {
  title: "Rooms & Pricing",
  description:
    "View room types, pricing, and features at Simeka Heights student residence near UNIVEN. Single and sharing rooms from R3,200/month. NSFAS accepted.",
  alternates: { canonical: "https://simekaheights.com/rooms" },
};

export default function RoomsPage() {
  return (
    <>
      <PageHeader
        title="Rooms & Pricing"
        subtitle="Two room types. Both fully furnished. Both NSFAS-accepted. Choose what fits your budget and your style."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Rooms & Pricing" },
        ]}
      />
      <RoomsContent />
    </>
  );
}
