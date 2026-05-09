"use client";

import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  Shield,
  Wifi,
  Dumbbell,
  BookOpen,
  Flame,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "24/7 Security",
    description: "Biometric entry, CCTV everywhere, and guards on-site 24/7. Your parents can sleep easy — so can you.",
  },
  {
    icon: Wifi,
    title: "100Mbps Fibre WiFi",
    description: "Uncapped. In every room. No buffering during assignments, no data stress. Just fast, reliable internet.",
  },
  {
    icon: Dumbbell,
    title: "On-Site Gym",
    description: "Cardio and weights downstairs. No gym membership needed — stay sharp without leaving the building.",
  },
  {
    icon: BookOpen,
    title: "24/7 Study Lounges",
    description: "Quiet, dedicated study spaces for when your room is too comfortable and the library is too far.",
  },
  {
    icon: Flame,
    title: "Braai & Social Spaces",
    description: "Weekend braais, chill areas, and social lounges. Because university isn't only about textbooks.",
  },
  {
    icon: Users,
    title: "Real Community",
    description: "Study groups, events, and 1,040+ students who get it. This isn't just accommodation — it's your people.",
  },
];

export function FeaturesOverview() {
  return (
    <section className="bg-background py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Built for How Students Actually Live"
          subtitle="Not a hostel. Not a commune. A purpose-built residence where every detail exists because students asked for it."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {features.map((feature, i) => (
            <RevealOnScroll key={feature.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="group relative flex h-full flex-col rounded-2xl sm:rounded-[26px] border border-border/60 bg-card p-5 sm:p-7 shadow-[0_16px_50px_-40px_rgba(15,27,45,0.1)] dark:shadow-none transition-all duration-300 hover:border-primary/25 hover:shadow-[0_28px_80px_-50px_rgba(15,27,45,0.2)] dark:hover:shadow-none"
              >
                <div className="mb-3 sm:mb-5 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="mb-1.5 sm:mb-2 font-heading text-lg sm:text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed sm:leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
