"use client";

import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Users, Maximize2, ArrowRight } from "lucide-react";
import { rooms } from "@/data/rooms";
import { PageTransition } from "@/components/effects/page-transition";
import { formatPrice } from "@/lib/utils";

export function RoomsContent() {
  return (
    <PageTransition>
      {/* Room Cards */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-10 sm:space-y-16">
            {rooms.map((room, i) => (
              <RevealOnScroll key={room.id} delay={i * 0.1}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center ${
                  i % 2 !== 0 ? "lg:direction-rtl" : ""
                }`}>
                  {/* Image */}
                  <div className={`relative rounded-2xl overflow-hidden shadow-lg ${i % 2 !== 0 ? "lg:order-2" : ""}`}>
                    <div className="relative h-56 sm:h-72 md:h-96">
                      <Image
                        src={room.images[0]}
                        alt={room.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      {room.popular && (
                        <Badge className="absolute top-4 left-4 bg-amber text-navy font-semibold">
                          Most Popular
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                        {room.name}
                      </h2>
                      {room.available && (
                        <Badge variant="outline" className="text-success border-success/30 bg-success/5">
                          Available
                        </Badge>
                      )}
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {room.description}
                    </p>

                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-3xl font-bold text-amber font-heading">
                        R{formatPrice(room.pricePerMonth)}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                      <span className="text-sm text-muted-foreground">
                        (R{formatPrice(room.pricePerYear)}/year)
                      </span>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                      <span className="flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-amber" />
                        {room.capacity === 1 ? "Single Occupancy" : `${room.capacity} Person Sharing`}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Maximize2 className="h-4 w-4 text-amber" />
                        {room.size}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                      {room.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-success shrink-0" />
                          <span className="text-foreground/80">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mb-6 rounded-xl border border-amber/20 bg-amber/5 p-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-2">
                        Included in Rental
                      </p>
                      <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                        {room.includedInRental.map((item) => (
                          <span
                            key={item}
                            className="flex items-center gap-1.5 text-sm text-foreground/80"
                          >
                            <Check className="h-3.5 w-3.5 text-amber" />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        asChild
                        className="bg-amber hover:bg-amber-dim text-navy font-semibold"
                      >
                        <Link href="/apply">
                          Apply for This Room
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="border-amber/40 text-amber hover:bg-amber/10 font-semibold"
                      >
                        <Link href="/contact">
                          Enquire Now
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* CTA */}
          <RevealOnScroll>
            <div className="mt-10 sm:mt-16 flex flex-col items-center text-center rounded-2xl border border-border/50 bg-muted/30 p-6 sm:p-8 md:p-10">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Ready to secure your room?
              </h3>
              <p className="mt-2 text-muted-foreground max-w-xl">
                Apply online now or contact us to book a viewing. NSFAS-accredited rooms available for the next intake.
              </p>
              <div className="mt-6 flex gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-amber hover:bg-amber-dim text-navy font-bold"
                >
                  <Link href="/apply">
                    Apply Now
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="font-semibold"
                >
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Compare Room Types
            </h2>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="overflow-x-auto rounded-2xl border border-border/50 bg-card">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-4 font-heading font-semibold text-muted-foreground">Feature</th>
                    {rooms.map((room) => (
                      <th key={room.id} className="p-4 text-center">
                        <span className="font-heading font-bold text-foreground">{room.name}</span>
                        {room.popular && (
                          <Badge className="ml-2 bg-amber/10 text-amber text-xs">Popular</Badge>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/30">
                    <td className="p-4 text-sm font-medium text-foreground">Monthly Price</td>
                    {rooms.map((room) => (
                      <td key={room.id} className="p-4 text-center font-bold text-amber">
                        R{formatPrice(room.pricePerMonth)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/30 bg-muted/20">
                    <td className="p-4 text-sm font-medium text-foreground">Capacity</td>
                    {rooms.map((room) => (
                      <td key={room.id} className="p-4 text-center text-sm">
                        {room.capacity === 1 ? "Single" : `${room.capacity} Sharing`}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="p-4 text-sm font-medium text-foreground">Room Size</td>
                    {rooms.map((room) => (
                      <td key={room.id} className="p-4 text-center text-sm">{room.size}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/30 bg-muted/20">
                    <td className="p-4 text-sm font-medium text-foreground">Private Bathroom</td>
                    {rooms.map((room) => (
                      <td key={room.id} className="p-4 text-center">
                        {room.features.some(f => f.toLowerCase().includes("en-suite")) ? (
                          <Check className="h-5 w-5 text-success mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">Shared</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="p-4 text-sm font-medium text-foreground">WiFi</td>
                    {rooms.map((room) => (
                      <td key={room.id} className="p-4 text-center">
                        <Check className="h-5 w-5 text-success mx-auto" />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 text-sm font-medium text-foreground">Availability</td>
                    {rooms.map((room) => (
                      <td key={room.id} className="p-4 text-center">
                        <Badge variant="outline" className={room.available ? "text-success border-success/30" : "text-destructive border-destructive/30"}>
                          {room.available ? "Available" : "Full"}
                        </Badge>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </PageTransition>
  );
}
