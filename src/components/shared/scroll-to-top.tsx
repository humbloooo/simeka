"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useSiteSettings } from "@/components/providers/site-settings-provider";

export function ScrollToTop() {
  const [show, setShow] = useState(false);
  const settings = useSiteSettings();

  const isDisabled = settings?.widgets?.scrollToTop?.enabled === false;

  useEffect(() => {
    if (isDisabled) return;
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isDisabled]);

  if (isDisabled) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white shadow-lg hover:bg-navy-light transition-colors"
          aria-label="Scroll to top"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
