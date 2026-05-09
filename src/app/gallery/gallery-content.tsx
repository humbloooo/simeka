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
  // Rooms
  { id: "r1", src: "/simeka images/Rooms/DSC_4473.jpeg", alt: "Furnished single room interior", category: "rooms" },
  { id: "r2", src: "/simeka images/Rooms/DSC_4433.jpeg", alt: "Student bedroom with study desk", category: "rooms" },
  { id: "r3", src: "/simeka images/Rooms/DSC_4465_.jpeg", alt: "Room with wardrobe and bed", category: "rooms" },
  { id: "r4", src: "/simeka images/Rooms/DSC_4663.jpeg", alt: "Twin sharing room setup", category: "rooms" },
  { id: "r5", src: "/simeka images/Rooms/DSC_4673.jpeg", alt: "Room furnishings and storage", category: "rooms" },
  { id: "r6", src: "/simeka images/Rooms/DSC_4697.jpeg", alt: "Study desk and chair area", category: "rooms" },
  { id: "r7", src: "/simeka images/Rooms/DSC_4705.jpeg", alt: "Clean room interior view", category: "rooms" },
  { id: "r8", src: "/simeka images/Rooms/DSC_0115.jpeg", alt: "Student accommodation bedroom", category: "rooms" },
  // Common areas
  { id: "c1", src: "/simeka images/Ammenities/DSC_0014.jpeg", alt: "Study lounge with desks", category: "common" },
  { id: "c2", src: "/simeka images/Ammenities/DSC_0057.jpeg", alt: "Common area seating", category: "common" },
  { id: "c3", src: "/simeka images/Ammenities/DSC_0092.jpeg", alt: "Recreational facilities", category: "common" },
  { id: "c4", src: "/simeka images/Ammenities/DSC_4507.jpeg", alt: "Gym and fitness area", category: "common" },
  { id: "c5", src: "/simeka images/Ammenities/DSC_4517.jpeg", alt: "Exercise equipment", category: "common" },
  { id: "c6", src: "/simeka images/Ammenities/DSC_4566.jpeg", alt: "Outdoor braai and chill area", category: "common" },
  { id: "c7", src: "/simeka images/Ammenities/DSC_4582.jpeg", alt: "Social gathering space", category: "common" },
  // Exterior
  { id: "e1", src: "/simeka images/backgrounds/DSC_4616-cropped-again.jpeg", alt: "Simeka Heights building exterior", category: "exterior" },
  { id: "e2", src: "/simeka images/photos/DSC_0005.jpeg", alt: "Building entrance and grounds", category: "exterior" },
  { id: "e3", src: "/simeka images/photos/DSC_0007.jpeg", alt: "Property exterior view", category: "exterior" },
  { id: "e4", src: "/simeka images/photos/DSC_0067.jpeg", alt: "Outdoor walkway and gardens", category: "exterior" },
  // Community
  { id: "s1", src: "/simeka images/photos/DSC_0127.jpeg", alt: "Student community area", category: "social" },
  { id: "s2", src: "/simeka images/photos/add-to-gallery-DSC_0006-1.jpeg", alt: "Campus life at Simeka Heights", category: "social" },
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
          <RevealOnScroll className="flex justify-center mb-8 sm:mb-12">
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
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white z-10 p-2"
              aria-label="Close lightbox"
            >
              <X className="h-7 w-7 sm:h-8 sm:w-8" />
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-4 sm:top-6 sm:left-6 text-white/50 text-xs sm:text-sm">
              {lightbox + 1} / {filtered.length}
            </div>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-10 p-2"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8 sm:h-10 sm:w-10" />
            </button>

            {/* Image */}
            <motion.div
              key={filtered[lightbox].id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[85vh] mx-10 sm:mx-16"
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
              className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-10 p-2"
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8 sm:h-10 sm:w-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
