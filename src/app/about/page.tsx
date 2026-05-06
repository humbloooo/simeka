import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Simeka Heights — our story, mission, values, and the team dedicated to providing premium student accommodation near UNIVEN in Thohoyandou.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Simeka Heights"
        subtitle="More than a residence — a community built on care, safety, and student success."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />
      <AboutContent />
    </>
  );
}
