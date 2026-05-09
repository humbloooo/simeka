"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";
import { useSiteSettings } from "@/components/providers/site-settings-provider";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const settings = useSiteSettings();

  const phone = settings?.phone || SITE_CONFIG.phone;
  const mobile = settings?.mobile || SITE_CONFIG.mobile;
  const email = settings?.email || SITE_CONFIG.email;
  const address = {
    street: settings?.address?.street || SITE_CONFIG.address.street,
    city: settings?.address?.city || SITE_CONFIG.address.city,
    province: settings?.address?.province || SITE_CONFIG.address.province,
    postalCode: settings?.address?.postalCode || SITE_CONFIG.address.postalCode,
  };
  const socials = {
    facebook: settings?.socials?.facebook || SITE_CONFIG.socials.facebook,
    instagram: settings?.socials?.instagram || "",
    twitter: settings?.socials?.twitter || "",
    tiktok: settings?.socials?.tiktok || "",
    youtube: settings?.socials?.youtube || "",
    linkedin: settings?.socials?.linkedin || "",
  };
  const hours = {
    weekdays: settings?.operatingHours?.weekdays || SITE_CONFIG.operatingHours.weekdays,
    saturday: settings?.operatingHours?.saturday || SITE_CONFIG.operatingHours.saturday,
    sunday: settings?.operatingHours?.sunday || SITE_CONFIG.operatingHours.sunday,
  };
  const parentCompany = settings?.parentCompany || SITE_CONFIG.parentCompany;

  // Build social links list
  const socialLinks = [
    { name: "Facebook", url: socials.facebook, icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    )},
    { name: "Instagram", url: socials.instagram, icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
      </svg>
    )},
    { name: "Twitter / X", url: socials.twitter, icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )},
    { name: "TikTok", url: socials.tiktok, icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    )},
    { name: "YouTube", url: socials.youtube, icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )},
    { name: "LinkedIn", url: socials.linkedin, icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )},
  ].filter(s => s.url);

  return (
    <footer className="bg-navy text-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_1fr_0.9fr]">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo-small.png"
                alt="Simeka Heights Logo"
                width={140}
                height={70}
                className="h-10 w-auto invert"
              />
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Premium NSFAS-accredited student accommodation steps from UNIVEN campus.
              Your home away from home in Thohoyandou.
            </p>
            {socialLinks.length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-amber/20 hover:text-amber"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
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
                  {address.street}, {address.city},{" "}
                  {address.province}, {address.postalCode}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-amber transition-colors"
                >
                  <Phone className="h-4 w-4 text-amber shrink-0" />
                  {phone}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${mobile.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-amber transition-colors"
                >
                  <Phone className="h-4 w-4 text-amber shrink-0" />
                  {mobile}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-amber transition-colors"
                >
                  <Mail className="h-4 w-4 text-amber shrink-0" />
                  {email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Office Hours</h3>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li className="flex justify-between">
                <span>Mon - Fri</span>
                <span>{hours.weekdays}</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>{hours.saturday}</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>{hours.sunday}</span>
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
                href={`tel:${mobile.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 text-amber" />
                WhatsApp line: {mobile}
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col gap-4 text-center text-xs text-white/40 lg:flex-row lg:items-center lg:justify-between lg:text-left">
          <p className="max-w-md">
            &copy; {currentYear} Simeka Heights. All rights reserved. A subsidiary of{" "}
            <span className="text-white/60">{parentCompany}</span>.
          </p>
          <div className="flex justify-center gap-6">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">
              Terms &amp; Conditions
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
