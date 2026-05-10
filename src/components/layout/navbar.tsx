"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";
import { useSiteSettings } from "@/components/providers/site-settings-provider";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const settings = useSiteSettings();

  const phone = settings?.phone || SITE_CONFIG.phone;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/50 bg-background/85 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/images/logo-small.png"
            alt="Simeka Heights Logo"
            width={140}
            height={70}
            className={cn(
              "h-10 w-auto transition-all",
              scrolled ? "brightness-100 dark:invert" : "brightness-0 invert"
            )}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className={cn(
          "hidden lg:flex items-center gap-1 rounded-full px-2 py-1 backdrop-blur-md",
          scrolled
            ? "border border-border/50 bg-muted/60"
            : "border border-white/10 bg-white/8"
        )}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-amber"
                  : scrolled
                    ? "text-foreground/70 hover:text-foreground"
                    : "text-white/80 hover:text-white"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-x-1 bottom-0 h-0.5 rounded-full bg-amber"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium transition-colors",
              scrolled ? "text-foreground/70 hover:text-foreground" : "text-white/80 hover:text-white"
            )}
          >
            <Phone className="h-4 w-4" />
            <span className="hidden xl:inline">{phone}</span>
          </a>
          <ThemeToggle />
          <Button asChild className="bg-amber hover:bg-amber-dim text-navy font-semibold shadow-md hover-lift press-effect hover:shadow-[var(--shadow-glow-amber)]">
            <Link href="/apply">
              Apply Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className={cn(
              "touch-target rounded-full border transition-colors",
              scrolled
                ? "border-border/70 bg-background/80 text-foreground"
                : "border-white/20 bg-white/10 text-white backdrop-blur-md"
            )}
            aria-label="Call Simeka Heights"
          >
            <Phone className="h-4 w-4" />
          </a>
          <ThemeToggle />

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full border transition-colors cursor-pointer",
              scrolled
                ? "border-border/70 bg-background/80 text-foreground"
                : "border-white/20 bg-white/10 text-white backdrop-blur-md"
            )}
            aria-label="Open menu"
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(88vw,22rem)] bg-background p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col h-full">
              {/* Mobile Logo */}
              <div className="flex items-center gap-3 border-b border-border/50 px-6 py-5">
                <Image
                  src="/images/logo-small.png"
                  alt="Simeka Heights Logo"
                  width={140}
                  height={70}
                  className="h-10 w-auto dark:invert"
                />
              </div>

              {/* Mobile Links */}
              <div className="flex-1 overflow-y-auto px-3 py-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center rounded-2xl px-4 py-3.5 text-base font-medium transition-colors",
                        pathname === link.href
                          ? "bg-amber/10 text-amber"
                          : "text-foreground/70 hover:bg-muted/60 hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="space-y-3 border-t border-border/50 p-6">
                <Button asChild className="w-full bg-amber hover:bg-amber-dim text-navy font-semibold">
                  <Link href="/apply" onClick={() => setOpen(false)}>
                    Apply Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-border/70 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                >
                  <Phone className="h-4 w-4" />
                  {phone}
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
