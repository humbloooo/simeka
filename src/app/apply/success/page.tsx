import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { SuccessCelebration } from "./success-celebration";

export const metadata: Metadata = {
  title: "Application Submitted",
};

export default function ApplicationSuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const ref = searchParams?.ref as string;

  return (
    <section className="min-h-screen flex items-center justify-center bg-background py-20">
      <div className="mx-auto max-w-lg px-4 text-center">
        <SuccessCelebration />

        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
          Application Submitted!
        </h1>

        <p className="text-lg text-muted-foreground mb-2">
          Thank you for applying to Simeka Heights.
        </p>
        <p className="text-muted-foreground mb-4">
          Our team will review your application and get back to you within 48 hours.
          Check your email for a confirmation.
        </p>

        {ref && (
          <div className="bg-amber/10 border border-amber/20 rounded-xl p-4 mb-8">
            <p className="text-sm text-amber font-medium mb-1">Your Reference Number</p>
            <p className="text-2xl font-heading font-bold text-navy tracking-wider">{ref}</p>
            <p className="text-xs text-muted-foreground mt-2">Please save this number for tracking your application status.</p>
          </div>
        )}

        <div className="bg-card rounded-xl border border-border/50 p-6 mb-8">
          <h3 className="font-heading font-semibold text-foreground mb-3">What Happens Next?</h3>
          <ol className="text-sm text-muted-foreground space-y-2 text-left">
            <li className="flex gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber text-navy text-xs font-bold shrink-0 mt-0.5">1</span>
              We review your application (2-3 business days)
            </li>
            <li className="flex gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber text-navy text-xs font-bold shrink-0 mt-0.5">2</span>
              You receive an offer letter via email
            </li>
            <li className="flex gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber text-navy text-xs font-bold shrink-0 mt-0.5">3</span>
              Accept the offer and pay the deposit
            </li>
            <li className="flex gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber text-navy text-xs font-bold shrink-0 mt-0.5">4</span>
              Move in and start your Simeka Heights journey!
            </li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild className="bg-amber hover:bg-amber-dim text-navy font-semibold">
            <Link href="/">
              Back to Home
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp Us
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
