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
    description: "Biometric access, CCTV surveillance, and on-site security personnel keeping you safe around the clock.",
  },
  {
    icon: Wifi,
    title: "High-Speed WiFi",
    description: "Uncapped fibre internet in every room. Stream, study, and stay connected without limits.",
  },
  {
    icon: Dumbbell,
    title: "Fitness Centre",
    description: "Fully equipped gym with cardio and weights. Stay fit and energized without leaving the building.",
  },
  {
    icon: BookOpen,
    title: "Study Lounges",
    description: "Dedicated quiet study areas open 24/7 for those late-night cram sessions before exams.",
  },
  {
    icon: Flame,
    title: "Braai & Social Area",
    description: "Outdoor braai spot and social lounges for weekend vibes and building lifelong friendships.",
  },
  {
    icon: Users,
    title: "Community Living",
    description: "Regular events, study groups, and a vibrant community that makes Simeka Heights feel like family.",
  },
];

export function FeaturesOverview() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Everything You Need to Thrive"
          subtitle="More than just a place to sleep. Simeka Heights is designed for students who want the complete living experience."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {features.map((feature, i) => (
            <RevealOnScroll key={feature.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="group relative flex h-full flex-col rounded-[26px] border border-border/60 bg-card p-7 shadow-[0_16px_50px_-40px_rgba(15,27,45,0.1)] dark:shadow-none transition-all duration-300 hover:border-primary/25 hover:shadow-[0_28px_80px_-50px_rgba(15,27,45,0.2)] dark:hover:shadow-none"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-heading text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-7 text-muted-foreground">
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
