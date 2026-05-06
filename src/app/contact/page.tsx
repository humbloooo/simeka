import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Simeka Heights student residence near UNIVEN. Send an enquiry, call us, or chat on WhatsApp. We're here to help.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Have a question about rooms, pricing, or NSFAS? We'd love to hear from you."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />
      <ContactContent />
    </>
  );
}
