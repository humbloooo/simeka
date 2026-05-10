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

    parentCompany: { type: String, default: "Simeka Capital" },
    totalBeds: { type: Number, default: 1040 },
  },
  { timestamps: true }
);

export const SiteSettings =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
