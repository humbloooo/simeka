import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms & Conditions"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms & Conditions" }]}
      />
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-neutral max-w-none">
          <p className="text-muted-foreground text-sm mb-8">Last updated: May 2026</p>

          <h2 className="font-heading text-xl font-bold mb-3">1. Application & Acceptance</h2>
          <p className="text-muted-foreground mb-6">
            Submitting an application does not guarantee accommodation. All applications are subject
            to availability and approval. An offer of accommodation is only valid once confirmed in
            writing by Simeka Heights management.
          </p>

          <h2 className="font-heading text-xl font-bold mb-3">2. Lease Agreement</h2>
          <p className="text-muted-foreground mb-6">
            Upon acceptance, residents must sign a formal lease agreement. The lease period typically
            covers one academic year. Early termination requires 30 days written notice and may incur fees.
          </p>

          <h2 className="font-heading text-xl font-bold mb-3">3. Payment Terms</h2>
          <p className="text-muted-foreground mb-6">
            Rent is due on the 1st of each month. A refundable deposit equal to one month&apos;s rent
            is required upon signing. NSFAS-funded students&apos; payments are processed directly with NSFAS.
          </p>

          <h2 className="font-heading text-xl font-bold mb-3">4. House Rules</h2>
          <p className="text-muted-foreground mb-6">
            Residents must comply with all house rules including visitor policies, noise regulations,
            and communal area usage guidelines. Violation may result in warnings or lease termination.
          </p>

          <h2 className="font-heading text-xl font-bold mb-3">5. Liability</h2>
          <p className="text-muted-foreground mb-6">
            Simeka Heights is not liable for loss or damage to personal property. Residents are
            encouraged to obtain personal contents insurance. Residents are liable for any damage
            to their assigned room beyond normal wear and tear.
          </p>

          <h2 className="font-heading text-xl font-bold mb-3">6. Governing Law</h2>
          <p className="text-muted-foreground">
            These terms are governed by the laws of the Republic of South Africa. Any disputes
            shall be resolved in the courts of Limpopo Province.
          </p>
        </div>
      </section>
    </>
  );
}
