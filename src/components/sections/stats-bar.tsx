"use client";

import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { Counter } from "@/components/effects/counter";
import { ShieldCheck, Wifi, MapPin, Users } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { useSiteSettings } from "@/components/providers/site-settings-provider";

export function StatsBar() {
  const settings = useSiteSettings();
  const totalBeds = settings?.totalBeds || SITE_CONFIG.totalBeds;

  const stats = [
    {
      icon: Users,
      value: totalBeds,
      suffix: "+",
      label: "Beds Available",
    },
    {
      icon: MapPin,
      value: 1.3,
      suffix: "km",
      label: "From UNIVEN",
    },
    {
      icon: ShieldCheck,
      value: 24,
      suffix: "/7",
      label: "Security On-Site",
    },
    {
      icon: Wifi,
      value: 100,
      suffix: "Mbps",
      label: "Fibre WiFi",
    },
  ];
  return (
    <section className="relative z-10 mx-auto -mt-14 max-w-6xl px-4 sm:px-6 lg:-mt-16 lg:px-8">
      <RevealOnScroll>
        <div className="section-shell grid grid-cols-2 gap-3 overflow-hidden p-3 md:grid-cols-4 md:gap-0 md:p-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`rounded-2xl px-4 py-6 text-center md:py-7 ${
                i < stats.length - 1 ? "md:border-r md:border-border/50" : ""
              }`}
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber/10 text-amber">
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="font-heading text-2xl font-bold text-navy md:text-3xl">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
