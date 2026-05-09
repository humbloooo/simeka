"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { Fingerprint, Cctv, ShieldCheck, Lock } from "lucide-react";
import { useSiteSettings } from "@/components/providers/site-settings-provider";

const safetyFeatures = [
  {
    icon: Fingerprint,
    title: "Biometric Access",
    description: "Fingerprint-controlled entry at all gates and building access points.",
  },
  {
    icon: Cctv,
    title: "CCTV Surveillance",
    description: "24/7 camera coverage of all entrances, corridors, and common areas.",
  },
  {
    icon: ShieldCheck,
    title: "Security Personnel",
    description: "Trained guards patrolling the premises around the clock.",
  },
  {
    icon: Lock,
    title: "Controlled Entry",
    description: "Single-point entry with visitor management and electric perimeter fencing.",
  },
];

export function SafetyHighlights() {
  const settings = useSiteSettings();
  const safetyImage = settings?.homepageImages?.safetyImage || "/images/hero.png";

  return (
    <section className="overflow-hidden bg-navy py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <RevealOnScroll>
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Safety First
              </span>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                Your Safety Is Our{" "}
                <span className="text-primary">Top Priority</span>
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-white/60">
                We understand that parents and students need peace of mind. That is why
                we have invested in comprehensive security infrastructure that supports
                safe, focused daily living.
              </p>
            </RevealOnScroll>

            <div className="mt-10 space-y-6">
              {safetyFeatures.map((feature, i) => (
                <RevealOnScroll key={feature.title} delay={i * 0.1} direction="left">
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="section-shell-dark group flex items-start gap-4 p-5"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="mt-0.5 text-sm leading-7 text-white/50">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                </RevealOnScroll>
              ))}
            </div>
          </div>

          <RevealOnScroll direction="right" className="relative">
            <div className="relative overflow-hidden rounded-[28px] shadow-2xl">
              <Image
                src={safetyImage}
                alt="Simeka Heights security and safety features"
                width={700}
                height={900}
                className="h-[500px] w-full object-cover md:h-[600px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-4 left-4 rounded-[24px] bg-primary p-5 text-primary-foreground shadow-xl md:-bottom-6 md:-left-6"
            >
              <div className="font-heading text-3xl font-bold">0</div>
              <div className="text-sm font-medium">
                Security Incidents
                <br />
                This Year
              </div>
            </motion.div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
