import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ApplicationForm } from "./application-form";

export const metadata: Metadata = {
  title: "Apply Now",
  description:
    "Apply for student accommodation at Simeka Heights near UNIVEN. NSFAS accredited. Secure your room for the upcoming academic year.",
  alternates: { canonical: "https://simekaheights.com/apply" },
};

export default function ApplyPage() {
  return (
    <>
      <PageHeader
        title="Lock In Your Room"
        subtitle="5 minutes. That's all it takes to apply. Fill in the form and we'll confirm your spot."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Apply" },
        ]}
      />
      <ApplicationForm />
    </>
  );
}
