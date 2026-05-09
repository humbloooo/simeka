"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/components/providers/site-settings-provider";

export function VideoTour() {
  const [isOpen, setIsOpen] = useState(false);
  const settings = useSiteSettings();

  // If settings loaded and widget is disabled, or no URL set, hide it
  if (settings && settings.widgets?.videoTour?.enabled === false) return null;

  const youtubeUrl = settings?.widgets?.videoTour?.youtubeUrl || "";

  // Don't show the button if no video URL is configured
  if (!youtubeUrl) return null;
  const buttonText =
    settings?.widgets?.videoTour?.buttonText || "Virtual Tour";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-6 left-6 z-40 hidden md:block"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full shadow-xl bg-teal hover:bg-teal-light text-white font-semibold flex items-center gap-2 pr-5"
          size="lg"
        >
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-white text-teal shrink-0">
            <Play className="h-4 w-4 ml-1" />
          </div>
          {buttonText}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-navy rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <div className="absolute top-4 right-4 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-black/50 text-white hover:bg-black hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <div className="relative w-full pb-[56.25%] bg-black">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`${youtubeUrl}?autoplay=1`}
                  title="Simeka Heights Virtual Tour"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
