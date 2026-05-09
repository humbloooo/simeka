"use client";

import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { SectionHeading } from "@/components/shared/section-heading";
import { PageTransition } from "@/components/effects/page-transition";
import { MapPin, GraduationCap, ShoppingBag, Stethoscope, Bus, Building2, Coffee, Utensils } from "lucide-react";

const distances = [
  { icon: GraduationCap, place: "UNIVEN Main Campus", distance: "1.3 km", detail: "~15 min walk or free shuttle bus" },
  { icon: ShoppingBag, place: "Thavhani Mall", distance: "5 km", detail: "Shopping, banking, restaurants" },
  { icon: Building2, place: "Thohoyandou CBD", distance: "3 km", detail: "Town centre, post office, shops" },
  { icon: Stethoscope, place: "Tshilidzini Hospital", distance: "8 km", detail: "Major medical facility" },
  { icon: Bus, place: "Taxi Rank", distance: "3 km", detail: "Local and long-distance transport" },
  { icon: Coffee, place: "Local Shops & Takeaways", distance: "Nearby", detail: "Convenience stores and food outlets" },
  { icon: Utensils, place: "Restaurants & Fast Food", distance: "3–5 km", detail: "Multiple dining options in town" },
  { icon: MapPin, place: "UNIVEN Sports Grounds", distance: "1.5 km", detail: "Athletics and recreation" },
];

export function LocationContent() {
  return (
    <PageTransition>
      {/* Map Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="rounded-2xl overflow-hidden border border-border/50 shadow-lg h-[400px] md:h-[500px] bg-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.5!2d30.4719!3d-23.0085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAwJzMwLjYiUyAzMMKwMjgnMTkuMCJF!5e0!3m2!1sen!2sza!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Simeka Heights Location Map"
                className="w-full h-full"
              />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Distance Cards */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What's Nearby"
            subtitle="Everything you need is within walking or a short drive from Simeka Heights."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {distances.map((item, i) => (
              <RevealOnScroll key={item.place} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-card rounded-xl border border-border/50 p-6 hover:shadow-md hover:border-amber/20 transition-all duration-300"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber/10 text-amber mb-4">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground text-base mb-1">
                    {item.place}
                  </h3>
                  <p className="text-amber font-bold text-lg">{item.distance}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Area Description */}
      <section className="py-16 md:py-24 bg-navy">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
              Life in Thohoyandou
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed text-lg">
              <p>
                Thohoyandou is the vibrant heart of Vhembe District in Limpopo Province.
                Home to the University of Venda, it&apos;s a town buzzing with student energy,
                rich Venda culture, and growing commercial activity.
              </p>
              <p>
                From the bustling Thohoyandou CBD to the modern Thavhani Mall, you&apos;ll find
                everything you need close by. The town offers a unique blend of traditional culture
                and modern convenience — making it the perfect place to study and grow.
              </p>
            </div>
            <div className="mt-8 h-1 w-16 bg-amber rounded-full mx-auto" />
          </RevealOnScroll>
        </div>
      </section>
    </PageTransition>
  );
}
