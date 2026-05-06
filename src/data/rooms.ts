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
    id: "single-standard",
    name: "Single Standard",
    slug: "single-standard",
    description:
      "Your own private sanctuary. A fully furnished single room perfect for focused students who value personal space and quiet study time.",
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
    remainingRooms: 12,
  },
  {
    id: "single-ensuite",
    name: "Single En-Suite",
    slug: "single-ensuite",
    description:
      "Premium private living with your own bathroom. The ultimate student experience with complete privacy and modern finishes.",
    pricePerMonth: 5500,
    pricePerYear: 55000,
    capacity: 1,
    size: "18 sqm",
    features: [
      "Private room",
      "Private en-suite bathroom",
      "Built-in desk & chair",
      "Single bed with mattress",
      "Wardrobe with mirror",
      "High-speed WiFi",
      "Prepaid electricity",
    ],
    furniture: [
      "Single bed",
      "Study desk",
      "Office chair",
      "Wardrobe with mirror",
      "Bookshelf",
      "Bedside table",
    ],
    includedInRental: [...STANDARD_INCLUSIONS],
    images: ["/images/room-ensuite.png", "/images/hero.png"],
    available: true,
    popular: true,
    remainingRooms: 4,
  },
  {
    id: "sharing-twin",
    name: "Sharing Twin",
    slug: "sharing-twin",
    description:
      "Share your space, share the experience. An affordable twin-sharing room that brings students together while maintaining comfort.",
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
  {
    id: "premium-suite",
    name: "Premium Suite",
    slug: "premium-suite",
    description:
      "The pinnacle of student living. A spacious suite with premium finishes, private bathroom, kitchenette, and all the amenities for an elevated lifestyle.",
    pricePerMonth: 7000,
    pricePerYear: 70000,
    capacity: 1,
    size: "25 sqm",
    features: [
      "Premium private suite",
      "Private en-suite bathroom",
      "Mini kitchenette",
      "Queen-size bed",
      "Large study area",
      "Premium WiFi (dedicated line)",
      "Air conditioning",
      "Balcony",
    ],
    furniture: [
      "Queen bed",
      "Executive desk",
      "Ergonomic chair",
      "Walk-in wardrobe",
      "Bookshelf",
      "Mini fridge",
      "Microwave",
    ],
    includedInRental: [...STANDARD_INCLUSIONS],
    images: ["/images/room-ensuite.png", "/images/braai-area.png"],
    available: true,
    remainingRooms: 2,
  },
];
