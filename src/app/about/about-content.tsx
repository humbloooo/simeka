"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { SectionHeading } from "@/components/shared/section-heading";
import { PageTransition } from "@/components/effects/page-transition";
import { Heart, Eye, Target } from "lucide-react";
import { team } from "@/data/team";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To provide safe, modern, and affordable student accommodation that empowers University of Venda students to focus on what matters most — their education and growth.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description: "To be the most trusted and preferred student residence in Limpopo, setting the standard for premium off-campus living across South Africa.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description: "Safety first, community always. We believe every student deserves a space where they feel secure, supported, and inspired to reach their full potential.",
  },
];

const differentiators = [
  "1.3km from UNIVEN with free shuttle service",
  "NSFAS accredited with seamless payment processing",
  "Biometric access and 24/7 CCTV security",
  "Backup power during load shedding",
  "High-speed uncapped fibre WiFi",
  "On-site gym, study lounges, and braai area",
  "Professional management team available daily",
  "Regular community events and study groups",
];

export function AboutContent() {
  return (
    <PageTransition>
      {/* Our Story */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <RevealOnScroll>
              <div>
                <span className="text-amber font-semibold text-sm uppercase tracking-widest">
                  Our Story
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
                  Born From a Belief That Students Deserve{" "}
                  <span className="text-amber">Better</span>
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Simeka Heights is a student accommodation development by{" "}
                    <span className="text-foreground font-semibold">Mutodo Properties</span>,
                    purpose-built to accommodate University of Venda (UNIVEN) students.
                    Completed in 2021, the privately owned residence offers premium
                    accommodation with{" "}
                    <span className="text-foreground font-semibold">1,040 beds</span>{" "}
                    across shared and private living spaces.
                  </p>
                  <p>
                    Nestled within the rich environment of Thohoyandou with the Mvudi
                    river running behind it, Simeka Heights was developed in a manner that
                    preserves and protects its natural surroundings. Every detail — from
                    the biometric security to the study lounges to the fibre WiFi — was
                    designed with one question in mind: &ldquo;What do our students
                    actually need to succeed?&rdquo;
                  </p>
                  <p>
                    Simeka Heights is accredited by UNIVEN and meets the standard set out
                    by the Department of Higher Education and Training for NSFAS students.
                    Just{" "}
                    <span className="text-foreground font-semibold">1.3km from UNIVEN</span>
                    {" "}and 5km from Thavhani Mall, it&apos;s a student safe haven with a
                    unique hospitality approach to service — for total peace of mind.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/study-lounge.png"
                  alt="Students studying together at Simeka Heights"
                  width={700}
                  height={900}
                  className="object-cover w-full h-[450px] md:h-[550px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What Drives Us"
            subtitle="Our purpose goes beyond providing rooms. We're building a foundation for student success."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <RevealOnScroll key={value.title} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-card rounded-2xl border border-border/50 p-8 text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber/10 text-amber mx-auto mb-5">
                    <value.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Meet Our Team"
            subtitle="Dedicated professionals who make Simeka Heights feel like home."
          />

          <div className="flex justify-center">
            <div className="grid grid-cols-1 gap-8 max-w-md">
              {team.map((member, i) => (
                <RevealOnScroll key={member.id} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group text-center"
                  >
                    <div className="relative h-80 w-full rounded-2xl overflow-hidden mb-4 shadow-md">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground text-xl">
                      {member.name}
                    </h3>
                    <p className="text-amber text-sm font-medium">{member.role}</p>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                      {member.bio}
                    </p>
                  </motion.div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Simeka Heights */}
      <section className="py-16 md:py-24 bg-navy">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Why Choose Simeka Heights?"
            subtitle="Here's what sets us apart from every other student accommodation in Thohoyandou."
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {differentiators.map((item, i) => (
              <RevealOnScroll key={i} delay={i * 0.05}>
                <div className="flex items-center gap-3 bg-white/5 rounded-xl px-5 py-4 border border-white/5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber text-navy text-sm font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm text-white/80">{item}</span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
