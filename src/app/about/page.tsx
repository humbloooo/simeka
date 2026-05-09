import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Simeka Heights — our story, mission, values, and the team dedicated to providing premium student accommodation near UNIVEN in Thohoyandou.",
  alternates: { canonical: "https://simekaheights.com/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Simeka Heights"
        subtitle="Purpose-built by Mutodo Properties for UNIVEN students. 1,040 beds, zero compromises."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />
      <AboutContent />
    </>
  );
}
