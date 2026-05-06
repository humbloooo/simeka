import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ApplicationForm } from "./application-form";

export const metadata: Metadata = {
  title: "Apply Now",
  description:
    "Apply for student accommodation at Simeka Heights near UNIVEN. NSFAS accredited. Secure your room for the upcoming academic year.",
};

export default function ApplyPage() {
  return (
    <>
      <PageHeader
        title="Apply Now"
        subtitle="Secure your spot at Simeka Heights. Complete the application form below and we'll be in touch."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Apply" },
        ]}
      />
      <ApplicationForm />
    </>
  );
}
