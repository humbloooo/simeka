export const SITE_CONFIG = {
  name: "Simeka Heights",
  tagline: "Your Home Away From Home",
  description: "Premium NSFAS-accredited student accommodation 1.3km from UNIVEN campus in Thohoyandou, Limpopo.",
  url: "https://simekaheights.com",
  phone: "+27 15 023 0902",
  mobile: "+27 72 298 2685",
  email: "info@simekaheights.com",
  whatsapp: "27722982685",
  address: {
    street: "Beuster",
    city: "Thohoyandou",
    province: "Limpopo",
    postalCode: "0950",
    country: "South Africa",
  },
  socials: {
    facebook: "https://www.facebook.com/SimekaHeightsUnivenOffCampusResidence/",
  },
  operatingHours: {
    weekdays: "09:00 - 16:00",
    saturday: "Closed",
    sunday: "Closed",
  },
  parentCompany: "Simeka Capital",
  developer: "Mutodo Properties",
  yearBuilt: 2021,
  totalBeds: 1040,
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Rooms & Pricing", href: "/rooms" },
  { label: "Life at Simeka", href: "/amenities" },
  { label: "Gallery", href: "/gallery" },
  { label: "Location", href: "/location" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
