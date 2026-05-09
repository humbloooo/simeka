"use client";

import { useState } from "react";
import Link from "next/link";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { PageTransition } from "@/components/effects/page-transition";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";
import { faqs, faqCategories, type FAQCategory } from "@/data/faq";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FaqContent() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory | "all">("all");
  const categories = Object.keys(faqCategories) as FAQCategory[];

  const filtered = activeCategory === "all"
    ? faqs
    : faqs.filter((f) => f.category === activeCategory);

  return (
    <PageTransition>
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Category filters */}
          <RevealOnScroll className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12">
            <button
              onClick={() => setActiveCategory("all")}
              className={cn(
                "px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors",
                activeCategory === "all"
                  ? "bg-amber text-navy"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors",
                  activeCategory === cat
                    ? "bg-amber text-navy"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {faqCategories[cat]}
              </button>
            ))}
          </RevealOnScroll>

          {/* FAQ Accordion */}
          <RevealOnScroll>
            <Accordion className="space-y-3">
              {filtered.map((faq, i) => (
                <AccordionItem
                  key={i}
                  className="border border-border/50 rounded-xl px-4 sm:px-6 bg-card data-open:border-amber/30 data-open:shadow-sm transition-all"
                >
                  <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:text-amber py-5 aria-expanded:text-amber">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </RevealOnScroll>

          {/* Still have questions */}
          <RevealOnScroll className="mt-16 text-center">
            <div className="bg-muted/50 rounded-2xl border border-border/50 p-6 sm:p-8 md:p-12">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
                Still Have Questions?
              </h3>
              <p className="text-muted-foreground mb-6">
                Our team is always ready to help. Reach out and we&apos;ll get back to you promptly.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild className="bg-amber hover:bg-amber-dim text-navy font-semibold">
                  <Link href="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="font-semibold">
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </PageTransition>
  );
}
