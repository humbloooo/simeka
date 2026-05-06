"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { SectionHeading } from "@/components/shared/section-heading";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

// TODO: Replace with real student testimonials sourced via the API/CMS.
// These are placeholders - do NOT publish without verifying the names,
// courses, and quotes with actual current/former Simeka Heights residents.
const testimonials = [
  {
    id: 1,
    name: "Muofhe Nethengwe",
    year: "3rd Year, BCom Accounting",
    quote:
      "Moving to Simeka Heights was the best decision I made for my university career. The WiFi is incredible for late-night study sessions, and I feel completely safe with the biometric access.",
    rating: 5,
    image: "/images/team_tshifhiwa.png",
  },
  {
    id: 2,
    name: "Tshilidzi Ramabulana",
    year: "2nd Year, BSc Computer Science",
    quote:
      "The study lounges and fast internet make it so easy to focus on my work. Plus the gym means I don't need to waste money on a separate membership. Everything is right here.",
    rating: 5,
    image: "/images/team_thabo.png",
  },
  {
    id: 3,
    name: "Azwihangwisi Mudau",
    year: "1st Year, BA Education",
    quote:
      "As a first-year from a rural area, I was nervous about moving to town. Simeka Heights made the transition so smooth. The staff treat you like family and the community events are amazing.",
    rating: 5,
    image: "/images/team_rendani.png",
  },
  {
    id: 4,
    name: "Khuliso Tshivhase",
    year: "4th Year, LLB Law",
    quote:
      "I've stayed at three different accommodations during my time at UNIVEN. Simeka Heights is hands down the best. The en-suite rooms, the quiet study areas, and the backup power during load shedding - they think of everything.",
    rating: 5,
    image: "/images/team_mashudu.png",
  },
];

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const testimonial = testimonials[current];

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What Our Residents Say"
          subtitle="Don't just take our word for it. Hear from students who call Simeka Heights home."
        />

        <RevealOnScroll className="mx-auto max-w-4xl">
          <div className="relative rounded-[28px] border border-border/50 bg-card p-8 shadow-[0_20px_60px_-46px_rgba(15,27,45,0.5)] md:p-12">
            <Quote className="absolute left-6 top-6 h-10 w-10 text-primary/20" />

            <AnimatePresence mode="wait">
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <div className="mb-6 flex justify-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>

                <blockquote className="mb-8 text-lg italic leading-8 text-foreground/80 md:text-xl">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="flex items-center justify-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary/30">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-heading font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{testimonial.year}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex justify-center gap-3">
              <button
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
