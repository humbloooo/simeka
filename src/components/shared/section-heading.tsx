"use client";

import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  light?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <RevealOnScroll className={cn(centered && "text-center", "mb-10 md:mb-14", className)}>
      <h2
        className={cn(
          "font-heading text-[2rem] leading-[1.05] md:text-4xl lg:text-[3.25rem] font-bold tracking-tight text-balance",
          light ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-7 md:text-lg md:leading-8 text-balance",
            centered && "mx-auto",
            light ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "mt-6 h-1 w-16 rounded-full bg-amber",
          centered && "mx-auto"
        )}
      />
    </RevealOnScroll>
  );
}
