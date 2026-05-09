"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  ArrowRight,
  Play,
  MapPin,
  Wifi,
  BusFront,
} from "lucide-react";
import { FloatingShapes } from "@/components/effects/floating-shapes";
import { useSiteSettings } from "@/components/providers/site-settings-provider";

export function Hero() {
  const nextYear = new Date().getFullYear() + 1;
  const settings = useSiteSettings();
  const heroImage = settings?.homepageImages?.heroImage || "/images/hero.png";

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Simeka Heights student residence exterior"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/96 via-navy/84 to-navy/36" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/68 via-transparent to-navy/35" />
      </div>

      <FloatingShapes />

      <div className="relative mx-auto flex w-full max-w-7xl items-end px-4 pb-18 pt-28 sm:px-6 md:pb-20 md:pt-32 lg:px-8 lg:pb-24 lg:pt-36">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.62fr)] lg:items-end">
          <div className="max-w-3xl">
            <div>
              <Badge className="mb-6 border-success/30 bg-success/18 px-4 py-1.5 text-sm font-medium text-success hover:bg-success/28">
                <ShieldCheck className="mr-1.5 h-4 w-4" />
                NSFAS Accredited
              </Badge>
            </div>

            <h1 className="font-heading text-4xl font-extrabold leading-[0.98] tracking-tight text-white text-balance sm:text-5xl md:text-6xl lg:text-7xl">
              Modern student living,
              <span className="text-amber"> built around campus life.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 sm:text-lg md:text-xl md:leading-8">
              Premium, fully furnished student accommodation with 24/7 security,
              high-speed WiFi, and modern amenities just 1.3km from UNIVEN campus.
            </p>

            <div className="mt-8 grid gap-3 text-sm text-white/82 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/12 bg-white/8 px-4 py-3 backdrop-blur-sm">
                <MapPin className="mb-2 h-4 w-4 text-amber" />
                <p className="font-semibold text-white">1.3km from UNIVEN</p>
                <p className="mt-1 text-white/58">Easy daily access to lectures and town.</p>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/8 px-4 py-3 backdrop-blur-sm">
                <Wifi className="mb-2 h-4 w-4 text-amber" />
                <p className="font-semibold text-white">Fast fibre WiFi</p>
                <p className="mt-1 text-white/58">Built for study sessions, streaming, and research.</p>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/8 px-4 py-3 backdrop-blur-sm">
                <BusFront className="mb-2 h-4 w-4 text-amber" />
                <p className="font-semibold text-white">Student-friendly transport</p>
                <p className="mt-1 text-white/58">Free UNIVEN shuttle support when you need it.</p>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-13 bg-amber px-8 text-base font-bold text-navy shadow-lg shadow-amber/25 hover:bg-amber-dim"
              >
                <Link href="/apply">
                  Apply Now
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 border-white/20 bg-white/6 px-8 text-base font-semibold text-white hover:bg-white/10"
              >
                <Link href="/gallery">
                  <Play className="mr-2 h-4 w-4" />
                  Take a Tour
                </Link>
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/56">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-success" />
                <span>Rooms Available for {nextYear}</span>
              </div>
              <div className="hidden h-4 w-px bg-white/20 sm:block" />
              <div className="flex items-center gap-2">
                <span>1,040+ Beds</span>
              </div>
              <div className="hidden h-4 w-px bg-white/20 md:block" />
              <div className="flex items-center gap-2">
                <span>Private and shared room options</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="section-shell-dark p-6 text-white">
              <p className="text-sm uppercase tracking-[0.22em] text-white/45">
                Why residents choose us
              </p>
              <div className="mt-6 space-y-5">
                <div className="border-b border-white/10 pb-5">
                  <p className="font-heading text-3xl font-bold text-amber">24/7</p>
                  <p className="mt-1 text-sm text-white/62">
                    Security, CCTV, biometric entry, and controlled access.
                  </p>
                </div>
                <div className="border-b border-white/10 pb-5">
                  <p className="font-heading text-3xl font-bold text-amber">Fully furnished</p>
                  <p className="mt-1 text-sm text-white/62">
                    Move into a ready-to-live room built for student routines.
                  </p>
                </div>
                <div>
                  <p className="font-heading text-3xl font-bold text-amber">Study + lifestyle</p>
                  <p className="mt-1 text-sm text-white/62">
                    Gym, lounges, braai space, fast internet, and community support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/20 p-1.5">
          <div className="h-2.5 w-1.5 rounded-full bg-amber" />
        </div>
      </div>
    </section>
  );
}
