"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Maximize2 } from "lucide-react";
import { rooms } from "@/data/rooms";
import { formatPrice } from "@/lib/utils";

export function RoomPreview() {
  const featured = rooms.slice(0, 3);

  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Find Your Perfect Room"
          subtitle="From affordable sharing to premium suites, there is a room type for every student and budget."
        />

        <div className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 md:grid-cols-3">
          {featured.map((room, i) => (
            <RevealOnScroll key={room.id} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative w-[86vw] shrink-0 snap-center overflow-hidden rounded-[28px] border border-border/55 bg-card shadow-[0_20px_60px_-45px_rgba(15,27,45,0.55)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_-55px_rgba(15,27,45,0.58)] sm:w-auto"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={room.images[0]}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
                  {room.popular && (
                    <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground font-semibold">
                      Most Popular
                    </Badge>
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <h3 className="font-heading text-xl font-bold text-foreground">
                      {room.name}
                    </h3>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary">
                        R{formatPrice(room.pricePerMonth)}
                      </span>
                      <span className="block text-xs text-muted-foreground">/month</span>
                    </div>
                  </div>

                  <p className="mb-4 min-h-14 text-sm leading-7 text-muted-foreground">
                    {room.description}
                  </p>

                  <div className="mb-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {room.capacity === 1 ? "Single" : `Sharing (${room.capacity})`}
                    </span>
                    <span className="flex items-center gap-1">
                      <Maximize2 className="h-3.5 w-3.5" />
                      {room.size}
                    </span>
                  </div>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-2xl border-border/70 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Link href="/rooms">
                      View Details
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.3} className="mt-10 text-center">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/rooms">
              View All Rooms & Pricing
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </RevealOnScroll>
      </div>
    </section>
  );
}
