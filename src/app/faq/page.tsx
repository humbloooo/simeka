import type { Metadata } from "next";
import Script from "next/script";
import { PageHeader } from "@/components/layout/page-header";
import { FaqContent } from "./faq-content";
import { faqs } from "@/data/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Simeka Heights student accommodation near UNIVEN. NSFAS, payments, room features, visitor policy, and more.",
  alternates: { canonical: "https://simekaheights.com/faq" },
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
