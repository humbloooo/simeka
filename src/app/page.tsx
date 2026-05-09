import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { FeaturesOverview } from "@/components/sections/features-overview";
import { RoomPreview } from "@/components/sections/room-preview";
import { SafetyHighlights } from "@/components/sections/safety-highlights";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { CtaBanner } from "@/components/sections/cta-banner";
import Script from "next/script";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "StudentAccommodation",
    "name": "Simeka Heights",
    "description": "Premium NSFAS-accredited student accommodation 1.3km from UNIVEN campus in Thohoyandou, Limpopo. 1,040 beds developed by Mutodo Properties.",
    "url": "https://simekaheights.com",
    "telephone": "+27 15 023 0902",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Beuster",
      "addressLocality": "Thohoyandou",
      "addressRegion": "Limpopo",
      "postalCode": "0950",
      "addressCountry": "ZA"
    },
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "High-Speed WiFi", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Backup Power", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "24/7 Security", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Biometric Access", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Free UNIVEN Shuttle", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Gym", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "PC Lab", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Sports Ground", "value": true }
    ],
    "numberOfRooms": 1040,
    "priceRange": "ZAR 3200 - 4200"
  };

  return (
    <>
      <Script
        id="schema-student-accommodation"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <StatsBar />
      <FeaturesOverview />
      <RoomPreview />
      <SafetyHighlights />
      <TestimonialsCarousel />
      <CtaBanner />
    </>
  );
}
