export interface RoomType {
  id: string;
  name: string;
  slug: string;
  description: string;
  pricePerMonth: number;
  pricePerYear: number;
  capacity: number;
  size: string;
  features: string[];
  furniture: string[];
  includedInRental: string[];
  images: string[];
  available: boolean;
  popular?: boolean;
  remainingRooms: number;
}

export const STANDARD_INCLUSIONS = [
  "Parking",
  "WiFi",
  "Electricity & Water",
] as const;

export const rooms: RoomType[] = [
  {
    id: "single-room",
    name: "Single Room",
    slug: "single-room",
    description:
      "Your own private space. A fully furnished single room designed for focused students who value personal space and quiet study time. NSFAS approved.",
    pricePerMonth: 4200,
    pricePerYear: 42000,
    capacity: 1,
    size: "14 sqm",
    features: [
      "Private room",
      "Built-in desk & chair",
      "Single bed with mattress",
      "Wardrobe",
      "Shared bathroom (2:1 ratio)",
      "High-speed WiFi",
      "Prepaid electricity",
    ],
    furniture: [
      "Single bed",
      "Study desk",
      "Office chair",
      "Wardrobe",
      "Bookshelf",
      "Bedside table",
    ],
    includedInRental: [...STANDARD_INCLUSIONS],
    images: ["/images/room-single.png", "/images/hero.png"],
    available: true,
    popular: true,
    remainingRooms: 12,
  },
  {
    id: "sharing-room",
    name: "Sharing Room",
    slug: "sharing-room",
    description:
      "Share your space, share the experience. An affordable twin-sharing room that brings students together while maintaining comfort. NSFAS approved.",
    pricePerMonth: 3200,
    pricePerYear: 32000,
    capacity: 2,
    size: "20 sqm",
    features: [
      "Twin sharing room",
      "Two single beds",
      "Two study desks",
      "Shared wardrobe space",
      "Shared bathroom (4:1 ratio)",
      "High-speed WiFi",
      "Prepaid electricity",
    ],
    furniture: [
      "2x Single beds",
      "2x Study desks",
      "2x Office chairs",
      "Shared wardrobe",
      "Bookshelf",
    ],
    includedInRental: [...STANDARD_INCLUSIONS],
    images: ["/images/room-single.png", "/images/study-lounge.png"],
    available: true,
    remainingRooms: 20,
  },
];
