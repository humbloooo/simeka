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
    <section className="relative z-10 mx-auto -mt-10 max-w-6xl px-4 sm:-mt-14 sm:px-6 lg:-mt-16 lg:px-8">
      <RevealOnScroll>
        <div className="section-shell grid grid-cols-2 gap-1 overflow-hidden p-2 sm:gap-3 sm:p-3 md:grid-cols-4 md:gap-0 md:p-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`rounded-xl px-3 py-4 text-center sm:rounded-2xl sm:px-4 sm:py-6 md:py-7 ${
                i < stats.length - 1 ? "md:border-r md:border-border/50" : ""
              }`}
            >
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-amber/10 text-amber sm:mb-3 sm:h-12 sm:w-12 sm:rounded-2xl">
                <stat.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="font-heading text-xl font-bold text-navy sm:text-2xl md:text-3xl">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
