"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppWidget } from "@/components/shared/whatsapp-widget";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { VideoTour } from "@/components/shared/video-tour";
import { SiteSettingsProvider } from "@/components/providers/site-settings-provider";

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <SiteSettingsProvider>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppWidget />
      <VideoTour />
      <ScrollToTop />
    </SiteSettingsProvider>
  );
}
