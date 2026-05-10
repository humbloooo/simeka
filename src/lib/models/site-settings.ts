import mongoose, { Schema, Document } from "mongoose";

export interface ISiteSettings extends Document {
  // Contact
  phone: string;
  mobile: string;
  email: string;
  whatsapp: string;

  // Address
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };

  // Social media
  socials: {
    facebook: string;
    instagram: string;
    twitter: string;
    tiktok: string;
    youtube: string;
    linkedin: string;
  };

  // Operating hours
  operatingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };

  // Widgets
  widgets: {
    whatsapp: {
      enabled: boolean;
      message: string;
    };
    videoTour: {
      enabled: boolean;
      youtubeUrl: string;
      buttonText: string;
    };
    scrollToTop: {
      enabled: boolean;
    };
  };

  // Images
  homepageImages: {
    heroImage: string;
    safetyImage: string;
    roomSingleImage: string;
    roomSharingImage: string;
  };

  // Room pricing
  pricing: {
    showPrices: boolean;
    singleRoom: {
      pricePerMonth: number;
      pricePerYear: number;
    };
    sharingRoom: {
      pricePerMonth: number;
      pricePerYear: number;
    };
  };

  // About page
  about: {
    storyTitle: string;
    storyParagraphs: string[];
    storyImage: string;
    mission: string;
    vision: string;
    values: string;
    differentiators: string[];
    teamMembers: {
      name: string;
      role: string;
      bio: string;
      image: string;
    }[];
  };

  // General
  parentCompany: string;
  totalBeds: number;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    phone: { type: String, default: "+27 15 023 0902" },
    mobile: { type: String, default: "+27 72 298 2685" },
    email: { type: String, default: "info@simekaheights.com" },
    whatsapp: { type: String, default: "27722982685" },

    address: {
      street: { type: String, default: "Beuster" },
      city: { type: String, default: "Thohoyandou" },
      province: { type: String, default: "Limpopo" },
      postalCode: { type: String, default: "0950" },
      country: { type: String, default: "South Africa" },
    },

    socials: {
      facebook: { type: String, default: "https://www.facebook.com/SimekaHeightsUnivenOffCampusResidence/" },
      instagram: { type: String, default: "" },
      twitter: { type: String, default: "" },
      tiktok: { type: String, default: "" },
      youtube: { type: String, default: "" },
      linkedin: { type: String, default: "" },
    },

    operatingHours: {
      weekdays: { type: String, default: "09:00 - 16:00" },
      saturday: { type: String, default: "Closed" },
      sunday: { type: String, default: "Closed" },
    },

    widgets: {
      whatsapp: {
        enabled: { type: Boolean, default: true },
        message: {
          type: String,
          default:
            "Hi! I'm interested in student accommodation at Simeka Heights. Can you send me more information?",
        },
      },
      videoTour: {
        enabled: { type: Boolean, default: true },
        youtubeUrl: {
          type: String,
          default: "",
        },
        buttonText: { type: String, default: "Virtual Tour" },
      },
      scrollToTop: {
        enabled: { type: Boolean, default: true },
      },
    },

    homepageImages: {
      heroImage: { type: String, default: "" },
      safetyImage: { type: String, default: "" },
      roomSingleImage: { type: String, default: "" },
      roomSharingImage: { type: String, default: "" },
    },

    pricing: {
      showPrices: { type: Boolean, default: true },
      singleRoom: {
        pricePerMonth: { type: Number, default: 4200 },
        pricePerYear: { type: Number, default: 42000 },
      },
      sharingRoom: {
        pricePerMonth: { type: Number, default: 3200 },
        pricePerYear: { type: Number, default: 32000 },
      },
    },

    about: {
      storyTitle: {
        type: String,
        default: "Born From a Belief That Students Deserve Better",
      },
      storyParagraphs: {
        type: [String],
        default: [
          "Simeka Heights is a student accommodation development by Mutodo Properties, purpose-built to accommodate University of Venda (UNIVEN) students. Completed in 2021, the privately owned residence offers premium accommodation with 1,040 beds across shared and private living spaces.",
          "Nestled within the rich environment of Thohoyandou with the Mvudi river running behind it, Simeka Heights was developed in a manner that preserves and protects its natural surroundings. Every detail — from the biometric security to the study lounges to the fibre WiFi — was designed with one question in mind: \"What do our students actually need to succeed?\"",
          "Simeka Heights is accredited by UNIVEN and meets the standard set out by the Department of Higher Education and Training for NSFAS students. Just 1.3km from UNIVEN and 5km from Thavhani Mall, it's a student safe haven with a unique hospitality approach to service — for total peace of mind.",
        ],
      },
      storyImage: { type: String, default: "" },
      mission: {
        type: String,
        default:
          "To provide safe, modern, and affordable student accommodation that empowers University of Venda students to focus on what matters most — their education and growth.",
      },
      vision: {
        type: String,
        default:
          "To be the most trusted and preferred student residence in Limpopo, setting the standard for premium off-campus living across South Africa.",
      },
      values: {
        type: String,
        default:
          "Safety first, community always. We believe every student deserves a space where they feel secure, supported, and inspired to reach their full potential.",
      },
      differentiators: {
        type: [String],
        default: [
          "1.3km from UNIVEN with free shuttle service",
          "NSFAS accredited with seamless payment processing",
          "Biometric access and 24/7 CCTV security",
          "Backup power during load shedding",
          "High-speed uncapped fibre WiFi",
          "On-site gym, study lounges, and braai area",
          "Professional management team available daily",
          "Regular community events and study groups",
        ],
      },
      teamMembers: {
        type: [
          {
            name: { type: String, required: true },
            role: { type: String, required: true },
            bio: { type: String, default: "" },
            image: { type: String, default: "" },
          },
        ],
        default: [
          {
            name: "Portia Tshabalala",
            role: "General Manager",
            bio: "Portia leads operations at Simeka Heights, ensuring every resident enjoys a safe, comfortable, and supportive environment that empowers academic success.",
            image: "",
          },
        ],
      },
    },

    parentCompany: { type: String, default: "Simeka Capital" },
    totalBeds: { type: Number, default: 1040 },
  },
  { timestamps: true }
);

export const SiteSettings =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
