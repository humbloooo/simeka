"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { useSiteSettings } from "@/components/providers/site-settings-provider";

export function WhatsAppWidget() {
  const settings = useSiteSettings();

  // If settings loaded and widget is disabled, hide it
  if (settings && settings.widgets?.whatsapp?.enabled === false) return null;

  const whatsappNumber = settings?.whatsapp || SITE_CONFIG.whatsapp;
  const message =
    settings?.widgets?.whatsapp?.message ||
    "Hi! I'm interested in student accommodation at Simeka Heights. Can you send me more information?";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-[var(--shadow-glow-whatsapp)] transition-all hover:bg-[#20BA5C] sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </motion.a>
  );
}
