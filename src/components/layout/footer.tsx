"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_1fr_0.9fr]">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber text-navy font-heading font-bold text-lg">
                SH
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg text-white leading-tight">
                  Simeka Heights
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/50 leading-tight">
                  Student Residence
                </span>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Premium NSFAS-accredited student accommodation steps from UNIVEN campus.
              Your home away from home in Thohoyandou.
            </p>
            <div className="flex gap-3">
              <a
                href={SITE_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-amber/20 hover:text-amber"
                aria-label="Facebook"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-amber transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-amber mt-0.5 shrink-0" />
                <span className="text-white/60">
                  {SITE_CONFIG.address.street}, {SITE_CONFIG.address.city},{" "}
                  {SITE_CONFIG.address.province}, {SITE_CONFIG.address.postalCode}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-amber transition-colors"
                >
                  <Phone className="h-4 w-4 text-amber shrink-0" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.mobile.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-amber transition-colors"
                >
                  <Phone className="h-4 w-4 text-amber shrink-0" />
                  {SITE_CONFIG.mobile}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-amber transition-colors"
                >
                  <Mail className="h-4 w-4 text-amber shrink-0" />
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Office Hours</h3>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li className="flex justify-between">
                <span>Mon - Fri</span>
                <span>{SITE_CONFIG.operatingHours.weekdays}</span>
              </li>
              <li className="flex justify-between">
                <span>Sat - Sun</span>
                <span>Closed</span>
              </li>
            </ul>
            <div className="mt-6 space-y-3">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center rounded-2xl bg-amber px-6 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-amber-dim"
              >
                Apply Now
              </Link>
              <a
                href={`tel:${SITE_CONFIG.mobile.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 text-amber" />
                WhatsApp line: {SITE_CONFIG.mobile}
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col gap-4 text-center text-xs text-white/40 lg:flex-row lg:items-center lg:justify-between lg:text-left">
          <p className="max-w-md">
            &copy; {currentYear} Simeka Heights. All rights reserved. A subsidiary of{" "}
            <span className="text-white/60">{SITE_CONFIG.parentCompany}</span>.
          </p>
          <div className="flex justify-center gap-6">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">
              Terms & Conditions
            </Link>
          </div>
          <p>
            Built by{" "}
            <a
              href="https://arcadiaweb.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber transition-colors hover:text-amber-light"
            >
              Arcadia Web Agency
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
