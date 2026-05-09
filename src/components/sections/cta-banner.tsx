"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { useSiteSettings } from "@/components/providers/site-settings-provider";

export function CtaBanner() {
  const settings = useSiteSettings();
  const nextYear = new Date().getFullYear() + 1;
  const whatsappNumber = settings?.whatsapp || SITE_CONFIG.whatsapp;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi! I'd like to apply for accommodation at Simeka Heights."
  )}`;

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 pattern-radial-dots" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <RevealOnScroll>
          <motion.div
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy tracking-tight">
              Secure Your Room for {nextYear}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-navy/70">
              Spaces fill up fast. Don&apos;t miss out on premium student living
              steps from UNIVEN campus. Apply today or chat with us.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-13 bg-navy px-8 text-base font-bold text-white shadow-lg hover:bg-navy-light"
              >
                <Link href="/apply">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 border-navy/30 bg-white/10 px-8 text-base font-semibold text-navy hover:bg-navy/10"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
