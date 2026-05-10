"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { SectionHeading } from "@/components/shared/section-heading";
import { PageTransition } from "@/components/effects/page-transition";
import { Heart, Eye, Target } from "lucide-react";
import { team as localTeam } from "@/data/team";
import { useSiteSettings } from "@/components/providers/site-settings-provider";

const LOCAL_VALUES = [
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

const LOCAL_DIFFERENTIATORS = [
  "1.3km from UNIVEN with free shuttle service",
  "NSFAS accredited with seamless payment processing",
  "Biometric access and 24/7 CCTV security",
  "Backup power during load shedding",
  "High-speed uncapped fibre WiFi",
  "On-site gym, study lounges, and braai area",
  "Professional management team available daily",
  "Regular community events and study groups",
];

const LOCAL_STORY_TITLE = "Born From a Belief That Students Deserve Better";
const LOCAL_STORY_PARAGRAPHS = [
  'Simeka Heights is a student accommodation development by <strong>Mutodo Properties</strong>, purpose-built to accommodate University of Venda (UNIVEN) students. Completed in 2021, the privately owned residence offers premium accommodation with <strong>1,040 beds</strong> across shared and private living spaces.',
  'Nestled within the rich environment of Thohoyandou with the Mvudi river running behind it, Simeka Heights was developed in a manner that preserves and protects its natural surroundings. Every detail — from the biometric security to the study lounges to the fibre WiFi — was designed with one question in mind: “What do our students actually need to succeed?”',
  'Simeka Heights is accredited by UNIVEN and meets the standard set out by the Department of Higher Education and Training for NSFAS students. Just <strong>1.3km from UNIVEN</strong> and 5km from Thavhani Mall, it’s a student safe haven with a unique hospitality approach to service — for total peace of mind.',
];

export function AboutContent() {
  const settings = useSiteSettings();
  const about = settings?.about;

  // Story
  const storyTitle = about?.storyTitle || LOCAL_STORY_TITLE;
  const storyParagraphs =
    about?.storyParagraphs && about.storyParagraphs.length > 0
      ? about.storyParagraphs
      : null; // null = use local HTML version
  const storyImage = about?.storyImage || "/simeka images/Ammenities/DSC_0014.jpeg";

  // Mission / Vision / Values
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: about?.mission || LOCAL_VALUES[0].description,
    },
    {
      icon: Eye,
      title: "Our Vision",
      description: about?.vision || LOCAL_VALUES[1].description,
    },
    {
      icon: Heart,
      title: "Our Values",
      description: about?.values || LOCAL_VALUES[2].description,
    },
  ];

  // Differentiators
  const differentiators =
    about?.differentiators && about.differentiators.length > 0
      ? about.differentiators
      : LOCAL_DIFFERENTIATORS;

  // Team
  const teamMembers =
    about?.teamMembers && about.teamMembers.length > 0
      ? about.teamMembers.map((m, i) => ({
          id: `team-${i}`,
          name: m.name,
          role: m.role,
          bio: m.bio || "",
          image: m.image || "",
        }))
      : localTeam;

  return (
    <PageTransition>
      {/* Our Story */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            <RevealOnScroll>
              <div>
                <span className="text-amber font-semibold text-sm uppercase tracking-widest">
                  Our Story
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
                  {storyTitle.includes("Better") ? (
                    <>
                      {storyTitle.replace("Better", "")}{" "}
                      <span className="text-amber">Better</span>
                    </>
                  ) : (
                    storyTitle
                  )}
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                  {storyParagraphs
                    ? storyParagraphs.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))
                    : LOCAL_STORY_PARAGRAPHS.map((html, i) => (
                        <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
                      ))}
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={storyImage}
                  alt="Students studying together at Simeka Heights"
                  width={700}
                  height={900}
                  className="object-cover w-full h-[300px] sm:h-[450px] md:h-[550px]"
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
                  className="bg-card rounded-2xl border border-border/50 p-5 sm:p-8 text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-amber/10 text-amber mx-auto mb-3 sm:mb-5">
                    <value.icon className="h-6 w-6 sm:h-7 sm:w-7" />
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

          <div className={`flex justify-center`}>
            <div className={`grid gap-8 ${
              teamMembers.length === 1
                ? "grid-cols-1 max-w-md"
                : teamMembers.length === 2
                ? "grid-cols-1 sm:grid-cols-2 max-w-2xl"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl"
            }`}>
              {teamMembers.map((member, i) => (
                <RevealOnScroll key={member.id} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group text-center"
                  >
                    <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden mb-4 shadow-md">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, 400px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-navy/20 text-6xl font-bold text-amber/40">
                          {member.name.charAt(0)}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground text-xl">
                      {member.name}
                    </h3>
                    <p className="text-amber text-sm font-medium">{member.role}</p>
                    {member.bio && (
                      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                        {member.bio}
                      </p>
                    )}
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
