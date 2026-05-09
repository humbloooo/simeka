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
import { useSiteSettings } from "@/components/providers/site-settings-provider";

export function RoomPreview() {
  const settings = useSiteSettings();
  const featured = rooms.slice(0, 3);

  return (
    <section className="bg-muted/30 py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Pick Your Space"
          subtitle="Single or sharing — both fully furnished, both NSFAS-accepted, both built for students who came here to pass."
        />

        <div className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 md:grid-cols-3">
          {featured.map((room, i) => (
            <RevealOnScroll key={room.id} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative w-[80vw] shrink-0 snap-center overflow-hidden rounded-2xl sm:rounded-[28px] border border-border/55 bg-card shadow-[0_20px_60px_-45px_rgba(15,27,45,0.55)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_-55px_rgba(15,27,45,0.58)] sm:w-auto"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={
                      room.id === "single-room" && settings?.homepageImages?.roomSingleImage
                        ? settings.homepageImages.roomSingleImage
                        : room.id === "sharing-room" && settings?.homepageImages?.roomSharingImage
                        ? settings.homepageImages.roomSharingImage
                        : room.images[0]
                    }
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

                <div className="p-4 sm:p-6">
                  <div className="mb-2 sm:mb-3 flex items-start justify-between gap-3">
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground">
                      {room.name}
                    </h3>
                    <div className="text-right shrink-0">
                      <span className="text-xl sm:text-2xl font-bold text-primary">
                        R{formatPrice(room.pricePerMonth)}
                      </span>
                      <span className="block text-xs text-muted-foreground">/month</span>
                    </div>
                  </div>

                  <p className="mb-3 sm:mb-4 min-h-0 sm:min-h-14 text-xs sm:text-sm leading-relaxed sm:leading-7 text-muted-foreground">
                    {room.description}
                  </p>

                  <div className="mb-4 sm:mb-5 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-muted-foreground">
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
