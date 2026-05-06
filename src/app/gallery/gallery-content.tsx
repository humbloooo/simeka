"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll";
import { PageTransition } from "@/components/effects/page-transition";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type GalleryCategory = "all" | "rooms" | "common" | "exterior" | "social";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
}

const images: GalleryImage[] = [
  { id: "1", src: "/images/room-single.png", alt: "Modern student bedroom", category: "rooms" },
  { id: "2", src: "/images/room-ensuite.png", alt: "Furnished single room", category: "rooms" },
  { id: "3", src: "/images/room-single.png", alt: "Premium en-suite room", category: "rooms" },
  { id: "4", src: "/images/room-ensuite.png", alt: "Clean modern bathroom", category: "rooms" },
  { id: "5", src: "/images/room-single.png", alt: "Premium suite interior", category: "rooms" },
  { id: "6", src: "/images/study-lounge.png", alt: "Study lounge area", category: "common" },
  { id: "7", src: "/images/gym.png", alt: "Fitness centre", category: "common" },
  { id: "8", src: "/images/study-lounge.png", alt: "Common lounge with TV", category: "common" },
  { id: "9", src: "/images/hero.png", alt: "Building exterior", category: "exterior" },
  { id: "10", src: "/images/hero.png", alt: "Modern building facade", category: "exterior" },
  { id: "11", src: "/images/hero.png", alt: "Secure entrance", category: "exterior" },
  { id: "12", src: "/images/braai-area.png", alt: "Students socializing outdoors", category: "social" },
  { id: "13", src: "/images/braai-area.png", alt: "Study group session", category: "social" },
  { id: "14", src: "/images/braai-area.png", alt: "Community braai event", category: "social" },
  { id: "15", src: "/images/room-ensuite.png", alt: "Twin sharing room", category: "rooms" },
];

const categoryLabels: Record<GalleryCategory, string> = {
  all: "All",
  rooms: "Rooms",
  common: "Common Areas",
  exterior: "Exterior",
  social: "Community",
};

export function GalleryContent() {
  const [category, setCategory] = useState<GalleryCategory>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = category === "all" ? images : images.filter((img) => img.category === category);

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);

  const nextImage = useCallback(() => {
    if (lightbox !== null) setLightbox((lightbox + 1) % filtered.length);
  }, [lightbox, filtered.length]);

  const prevImage = useCallback(() => {
    if (lightbox !== null) setLightbox((lightbox - 1 + filtered.length) % filtered.length);
  }, [lightbox, filtered.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox, nextImage, prevImage]);

  return (
    <PageTransition>
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <RevealOnScroll className="flex justify-center mb-12">
            <Tabs value={category} onValueChange={(v) => setCategory(v as GalleryCategory)}>
              <TabsList className="bg-muted/50">
                {(Object.keys(categoryLabels) as GalleryCategory[]).map((cat) => (
                  <TabsTrigger key={cat} value={cat} className="data-[state=active]:bg-amber data-[state=active]:text-navy">
                    {categoryLabels[cat]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </RevealOnScroll>

          {/* Image Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((image, i) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="break-inside-avoid cursor-pointer group"
                  onClick={() => openLightbox(i)}
                >
                  <div className="relative rounded-xl overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                        View
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white z-10"
              aria-label="Close lightbox"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 text-white/50 text-sm">
              {lightbox + 1} / {filtered.length}
            </div>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>

            {/* Image */}
            <motion.div
              key={filtered[lightbox].id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[85vh] mx-16"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightbox].src}
                alt={filtered[lightbox].alt}
                width={1200}
                height={900}
                className="max-h-[85vh] w-auto object-contain rounded-lg"
                priority
              />
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-10"
              aria-label="Next image"
            >
              <ChevronRight className="h-10 w-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
