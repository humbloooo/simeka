import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { PublicShell } from "@/components/layout/public-shell";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/analytics/gtm";
import "./globals.css";

const heading = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Simeka Heights | Premium Student Accommodation Near UNIVEN, Thohoyandou",
    template: "%s | Simeka Heights",
  },
  description:
    "Premium NSFAS-accredited student accommodation steps from UNIVEN campus in Thohoyandou, Limpopo. Furnished rooms, 24/7 security, high-speed WiFi, gym & study lounges. Apply online today.",
  metadataBase: new URL("https://simekaheights.com"),
  keywords: [
    "student accommodation Thohoyandou",
    "UNIVEN residence",
    "NSFAS accredited accommodation Limpopo",
    "student housing near UNIVEN",
    "Simeka Heights",
    "Thohoyandou student residence",
    "premium student accommodation South Africa",
    "UNIVEN off-campus housing",
    "Limpopo student housing",
    "University of Venda accommodation",
  ],
  authors: [{ name: "Simeka Heights", url: "https://simekaheights.com" }],
  creator: "Simeka Heights",
  publisher: "Simeka Heights",
  applicationName: "Simeka Heights Student Residence",
  category: "Education",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://simekaheights.com",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    title: "Simeka Heights | Premium Student Accommodation Near UNIVEN",
    description:
      "Your home away from home. Premium NSFAS-accredited student residence steps from UNIVEN campus. Furnished rooms, 24/7 security, high-speed WiFi & modern amenities.",
    url: "https://simekaheights.com",
    siteName: "Simeka Heights",
    locale: "en_ZA",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Simeka Heights - Premium Student Accommodation Near UNIVEN",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simeka Heights | Premium Student Accommodation Near UNIVEN",
    description:
      "Your home away from home. NSFAS-accredited student residence steps from UNIVEN campus in Thohoyandou.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  other: {
    "geo.region": "ZA-LP",
    "geo.placename": "Thohoyandou",
    "color-scheme": "light dark",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFF8F0" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1B2D" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA" className={`${heading.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <GoogleTagManager />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased touch-manipulation pb-safe">
        <GoogleTagManagerNoScript />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <PublicShell>{children}</PublicShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
