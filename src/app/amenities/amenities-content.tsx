"use client";

import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { PageTransition } from "@/components/effects/page-transition";
import { amenities, amenityCategories, type AmenityCategory } from "@/data/amenities";

export function AmenitiesContent() {
  const categories = Object.keys(amenityCategories) as AmenityCategory[];

  return (
    <PageTransition>
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {categories.map((category, catIndex) => {
            const config = amenityCategories[category];
            const categoryAmenities = amenities.filter((a) => a.category === category);

            return (
              <div key={category} className={catIndex > 0 ? "mt-20" : ""}>
                <RevealOnScroll>
                  <div className="mb-10">
                    <span className="text-amber font-semibold text-sm uppercase tracking-widest">
                      {config.label}
                    </span>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2">
                      {config.label}
                    </h2>
                    <p className="text-muted-foreground mt-2 max-w-xl">
                      {config.description}
                    </p>
                    <div className="mt-4 h-0.5 w-12 bg-amber rounded-full" />
                  </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryAmenities.map((amenity, i) => (
                    <RevealOnScroll key={amenity.id} delay={i * 0.08}>
                      <motion.div
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                        className="group rounded-xl border border-border/50 bg-card p-6 hover:shadow-lg hover:border-amber/20 transition-all duration-300"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber/10 text-amber mb-4 group-hover:bg-amber group-hover:text-navy transition-colors duration-300">
                          <amenity.icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-heading font-semibold text-foreground text-lg mb-1.5">
                          {amenity.name}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {amenity.description}
                        </p>
                      </motion.div>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </PageTransition>
  );
}
