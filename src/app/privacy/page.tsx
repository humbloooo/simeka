import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-neutral max-w-none">
          <p className="text-muted-foreground text-sm mb-8">Last updated: May 2026</p>

          <h2 className="font-heading text-xl font-bold mb-3">1. Information We Collect</h2>
          <p className="text-muted-foreground mb-6">
            We collect personal information that you voluntarily provide when applying for accommodation
            or submitting enquiries, including your name, email, phone number, ID number, student number,
            and funding details.
          </p>

          <h2 className="font-heading text-xl font-bold mb-3">2. How We Use Your Information</h2>
          <p className="text-muted-foreground mb-6">
            Your information is used to process accommodation applications, respond to enquiries,
            manage your tenancy, and communicate important updates. We may also use aggregated,
            anonymized data for improving our services.
          </p>

          <h2 className="font-heading text-xl font-bold mb-3">3. Data Protection</h2>
          <p className="text-muted-foreground mb-6">
            We implement appropriate technical and organizational measures to protect your personal
            information in accordance with the Protection of Personal Information Act (POPIA).
          </p>

          <h2 className="font-heading text-xl font-bold mb-3">4. Third-Party Sharing</h2>
          <p className="text-muted-foreground mb-6">
            We do not sell your personal information. We may share relevant details with NSFAS
            or bursary providers for payment processing purposes, with your consent.
          </p>

          <h2 className="font-heading text-xl font-bold mb-3">5. Your Rights</h2>
          <p className="text-muted-foreground mb-6">
            Under POPIA, you have the right to access, correct, or delete your personal information.
            Contact us at info@simekaheights.co.za to exercise these rights.
          </p>

          <h2 className="font-heading text-xl font-bold mb-3">6. Contact</h2>
          <p className="text-muted-foreground">
            For privacy-related concerns, contact our Information Officer at info@simekaheights.co.za.
          </p>
        </div>
      </section>
    </>
  );
}
