import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { FaqContent } from "./faq-content";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Simeka Heights student accommodation near UNIVEN. NSFAS, payments, room features, visitor policy, and more.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Got questions? We've got answers. Find everything you need to know about living at Simeka Heights."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FAQ" },
        ]}
      />
      <FaqContent />
    </>
  );
}
