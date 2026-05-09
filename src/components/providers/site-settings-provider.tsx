"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { ISiteSettings } from "@/lib/models/site-settings";

type SiteSettingsData = Partial<ISiteSettings>;

const SiteSettingsContext = createContext<SiteSettingsData | null>(null);

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettingsData | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data.settings))
      .catch(console.error);
  }, []);

  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}
