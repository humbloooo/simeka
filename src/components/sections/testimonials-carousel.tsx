"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { SectionHeading } from "@/components/shared/section-heading";
import { ChevronLeft, ChevronRight, Star, Quote, MessageSquare } from "lucide-react";

interface Testimonial {
  _id: string;
  name: string;
  yearOfStudy: string;
  faculty: string;
  quote: string;
  rating: number;
  photoUrl?: string;
}

export function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        // API returns array directly or { testimonials: [...] }
        const list = Array.isArray(data) ? data : data.testimonials;
        if (list?.length) {
          setTestimonials(list);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What Our Residents Say"
            subtitle="Don't just take our word for it. Hear from students who call Simeka Heights home."
          />
          <div className="mx-auto max-w-4xl">
            <div className="rounded-[28px] border border-border/50 bg-card p-12 text-center">
              <div className="h-6 w-6 mx-auto animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What Our Residents Say"
            subtitle="Don't just take our word for it. Hear from students who call Simeka Heights home."
          />
          <div className="mx-auto max-w-2xl text-center">
            <div className="rounded-[28px] border border-border/50 bg-card p-10">
              <MessageSquare className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Student reviews coming soon. We&apos;re collecting feedback from our residents.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const testimonial = testimonials[current];

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

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
                key={testimonial._id}
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
                  {testimonial.photoUrl ? (
                    <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary/30">
                      <Image
                        src={testimonial.photoUrl}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10 text-primary font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div className="text-left">
                    <p className="font-heading font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.yearOfStudy}{testimonial.faculty ? `, ${testimonial.faculty}` : ""}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {testimonials.length > 1 && (
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
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
