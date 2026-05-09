import type { Metadata } from "next";
import Script from "next/script";
import { PageHeader } from "@/components/layout/page-header";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Simeka Heights student residence near UNIVEN. Send an enquiry, call us, or chat on WhatsApp. We're here to help.",
  alternates: { canonical: "https://simekaheights.com/contact" },
};

export default function ContactPage() {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Simeka Heights Student Residence",
    description:
      "Premium NSFAS-accredited student accommodation near UNIVEN in Thohoyandou, Limpopo.",
    url: "https://simekaheights.com",
    telephone: "+27 15 023 0902",
    email: "info@simekaheights.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Beuster",
      addressLocality: "Thohoyandou",
      addressRegion: "Limpopo",
      postalCode: "0950",
      addressCountry: "ZA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -22.986541,
      longitude: 30.437165,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "16:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/SimekaHeightsUnivenOffCampusResidence/",
    ],
  };

  return (
    <>
      <Script
        id="schema-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
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
