import {
  Shield,
  ShieldCheck,
  Cctv,
  Fingerprint,
  Flame,
  Wifi,
  Zap,
  Tv,
  Smartphone,
  Bed,
  Droplets,
  WashingMachine,
  SprayCan,
  Dumbbell,
  TreePalm,
  PartyPopper,
  BookOpen,
  Library,
  Printer,
  Bus,
  Monitor,
  Trophy,
  Gamepad2,
  type LucideIcon,
} from "lucide-react";

export interface Amenity {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: AmenityCategory;
}

export type AmenityCategory = "security" | "connectivity" | "living" | "social" | "academic";

export const amenityCategories: Record<AmenityCategory, { label: string; description: string }> = {
  security: {
    label: "Safety & Security",
    description: "Your safety is our top priority. We've invested in world-class security infrastructure.",
  },
  connectivity: {
    label: "Connectivity",
    description: "Stay connected with high-speed internet and modern tech amenities.",
  },
  living: {
    label: "Comfortable Living",
    description: "Everything you need for a comfortable, hassle-free living experience.",
  },
  social: {
    label: "Social & Recreation",
    description: "Build lasting friendships and stay active with our social amenities.",
  },
  academic: {
    label: "Academic Support",
    description: "Dedicated spaces designed to help you achieve academic excellence.",
  },
};

export const amenities: Amenity[] = [
  // Security
  {
    id: "biometric",
    name: "Biometric Access",
    description: "Fingerprint-controlled entry at all access points for maximum security.",
    icon: Fingerprint,
    category: "security",
  },
  {
    id: "cctv",
    name: "24/7 CCTV Surveillance",
    description: "Full CCTV coverage of all common areas, parking, and entry points.",
    icon: Cctv,
    category: "security",
  },
  {
    id: "security-personnel",
    name: "Security Personnel",
    description: "Trained security staff on-site 24 hours a day, 7 days a week.",
    icon: ShieldCheck,
    category: "security",
  },
  {
    id: "perimeter",
    name: "Perimeter Fencing",
    description: "Electric perimeter fencing with controlled single-point entry.",
    icon: Shield,
    category: "security",
  },
  {
    id: "fire-safety",
    name: "Fire Safety Systems",
    description: "Smoke detectors, fire extinguishers, and emergency evacuation plans.",
    icon: Flame,
    category: "security",
  },
  // Connectivity
  {
    id: "wifi",
    name: "High-Speed WiFi",
    description: "Uncapped fibre WiFi throughout the building for streaming, studying, and socializing.",
    icon: Wifi,
    category: "connectivity",
  },
  {
    id: "backup-power",
    name: "Backup Power",
    description: "Generator and inverter backup ensures no disruptions during load shedding.",
    icon: Zap,
    category: "connectivity",
  },
  {
    id: "dstv",
    name: "DStv Lounge",
    description: "Common room with DStv for catching your favourite shows and sports.",
    icon: Tv,
    category: "connectivity",
  },
  {
    id: "charging",
    name: "Charging Stations",
    description: "USB charging points in common areas so you never run out of power.",
    icon: Smartphone,
    category: "connectivity",
  },
  // Living
  {
    id: "furnished",
    name: "Fully Furnished",
    description: "Move in with just your suitcase. Every room comes fully furnished.",
    icon: Bed,
    category: "living",
  },
  {
    id: "hot-water",
    name: "24/7 Hot Water",
    description: "Solar-powered hot water available around the clock.",
    icon: Droplets,
    category: "living",
  },
  {
    id: "laundry",
    name: "Laundry Facilities",
    description: "On-site coin-operated laundry with washers and dryers.",
    icon: WashingMachine,
    category: "living",
  },
  {
    id: "cleaning",
    name: "Weekly Cleaning",
    description: "Professional cleaning of common areas and corridors weekly.",
    icon: SprayCan,
    category: "living",
  },
  {
    id: "bus-service",
    name: "Free Bus Service",
    description: "Complimentary shuttle service to and from UNIVEN campus.",
    icon: Bus,
    category: "living",
  },
  // Social
  {
    id: "gym",
    name: "Fitness Centre",
    description: "Equipped gym with cardio and weight training equipment.",
    icon: Dumbbell,
    category: "social",
  },
  {
    id: "braai",
    name: "Braai Area",
    description: "Outdoor braai area for social gatherings and weekend vibes.",
    icon: Flame,
    category: "social",
  },
  {
    id: "outdoor",
    name: "Outdoor Lounge",
    description: "Landscaped garden with seating for relaxation and fresh air.",
    icon: TreePalm,
    category: "social",
  },
  {
    id: "events",
    name: "Events Space",
    description: "Multipurpose hall for study groups, movie nights, and community events.",
    icon: PartyPopper,
    category: "social",
  },
  {
    id: "sports-ground",
    name: "Sports Ground",
    description: "Outdoor sports ground for football, volleyball, and other activities.",
    icon: Trophy,
    category: "social",
  },
  {
    id: "game-room",
    name: "Game Room",
    description: "Game room with TV, foosball table, and pool table for unwinding between lectures.",
    icon: Gamepad2,
    category: "social",
  },
  // Academic
  {
    id: "study-lounge",
    name: "Study Lounges",
    description: "Dedicated quiet study areas open 24/7 for those late-night sessions.",
    icon: BookOpen,
    category: "academic",
  },
  {
    id: "library",
    name: "Mini Library",
    description: "Small reference library with textbooks and academic resources.",
    icon: Library,
    category: "academic",
  },
  {
    id: "printing",
    name: "Printing Station",
    description: "On-site printing and photocopying for assignments and study materials.",
    icon: Printer,
    category: "academic",
  },
  {
    id: "pc-lab",
    name: "PC Lab",
    description: "Computer lab with printing facilities for assignments, research, and online learning.",
    icon: Monitor,
    category: "academic",
  },
];
