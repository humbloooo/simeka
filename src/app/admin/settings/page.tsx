"use client";

import { useEffect, useState } from "react";
import {
  Save,
  Loader2,
  Phone,
  Mail,
  MapPin,
  Share2,
  Clock,
  MessageCircle,
  Play,
  ArrowUp,
  Building2,
  Bed,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  Upload,
  DollarSign,
  FileText,
  Plus,
  Trash2,
  Users,
} from "lucide-react";

interface WidgetSettings {
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
}

interface Settings {
  phone: string;
  mobile: string;
  email: string;
  whatsapp: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  socials: {
    facebook: string;
    instagram: string;
    twitter: string;
    tiktok: string;
    youtube: string;
    linkedin: string;
  };
  operatingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  widgets: WidgetSettings;
  homepageImages: {
    heroImage: string;
    safetyImage: string;
    roomSingleImage: string;
    roomSharingImage: string;
  };
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
  parentCompany: string;
  totalBeds: number;
}

const DEFAULT_SETTINGS: Settings = {
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
    instagram: "",
    twitter: "",
    tiktok: "",
    youtube: "",
    linkedin: "",
  },
  operatingHours: {
    weekdays: "09:00 - 16:00",
    saturday: "Closed",
    sunday: "Closed",
  },
  widgets: {
    whatsapp: {
      enabled: true,
      message:
        "Hi! I'm interested in student accommodation at Simeka Heights. Can you send me more information?",
    },
    videoTour: {
      enabled: true,
      youtubeUrl: "",
      buttonText: "Virtual Tour",
    },
    scrollToTop: {
      enabled: true,
    },
  },
  homepageImages: {
    heroImage: "",
    safetyImage: "",
    roomSingleImage: "",
    roomSharingImage: "",
  },
  pricing: {
    showPrices: true,
    singleRoom: {
      pricePerMonth: 4200,
      pricePerYear: 42000,
    },
    sharingRoom: {
      pricePerMonth: 3200,
      pricePerYear: 32000,
    },
  },
  about: {
    storyTitle: "Born From a Belief That Students Deserve Better",
    storyParagraphs: [
      "Simeka Heights is a student accommodation development by Mutodo Properties, purpose-built to accommodate University of Venda (UNIVEN) students. Completed in 2021, the privately owned residence offers premium accommodation with 1,040 beds across shared and private living spaces.",
      "Nestled within the rich environment of Thohoyandou with the Mvudi river running behind it, Simeka Heights was developed in a manner that preserves and protects its natural surroundings. Every detail — from the biometric security to the study lounges to the fibre WiFi — was designed with one question in mind: \"What do our students actually need to succeed?\"",
      "Simeka Heights is accredited by UNIVEN and meets the standard set out by the Department of Higher Education and Training for NSFAS students. Just 1.3km from UNIVEN and 5km from Thavhani Mall, it's a student safe haven with a unique hospitality approach to service — for total peace of mind.",
    ],
    storyImage: "",
    mission: "To provide safe, modern, and affordable student accommodation that empowers University of Venda students to focus on what matters most — their education and growth.",
    vision: "To be the most trusted and preferred student residence in Limpopo, setting the standard for premium off-campus living across South Africa.",
    values: "Safety first, community always. We believe every student deserves a space where they feel secure, supported, and inspired to reach their full potential.",
    differentiators: [
      "1.3km from UNIVEN with free shuttle service",
      "NSFAS accredited with seamless payment processing",
      "Biometric access and 24/7 CCTV security",
      "Backup power during load shedding",
      "High-speed uncapped fibre WiFi",
      "On-site gym, study lounges, and braai area",
      "Professional management team available daily",
      "Regular community events and study groups",
    ],
    teamMembers: [
      {
        name: "Portia Tshabalala",
        role: "General Manager",
        bio: "Portia leads operations at Simeka Heights, ensuring every resident enjoys a safe, comfortable, and supportive environment that empowers academic success.",
        image: "",
      },
    ],
  },
  parentCompany: "Simeka Capital",
  totalBeds: 1040,
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          setSettings(mergeSettings(DEFAULT_SETTINGS, data.settings));
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error("Save failed");
      setToast({ type: "success", msg: "Settings saved successfully!" });
    } catch {
      setToast({ type: "error", msg: "Failed to save settings. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  // Helper to update nested fields
  const update = (path: string, value: unknown) => {
    setSettings((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let obj = copy;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return copy;
    });
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber" />
      </div>
    );
  }

  return (
    <div className="relative max-w-5xl">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-20 right-6 z-50 flex items-center gap-3 rounded-xl border px-5 py-3 text-sm font-medium shadow-xl backdrop-blur-md animate-in slide-in-from-right-5 ${
            toast.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-400"
              : "border-red-500/30 bg-red-500/15 text-red-400"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Site Settings</h1>
          <p className="mt-1 text-sm text-white/50">
            Manage contact info, social media links, widgets &amp; more
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-amber px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-amber-dim disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6">
        {/* ── Contact Information ─────────────────── */}
        <Section title="Contact Information" icon={Phone}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Phone" value={settings.phone} onChange={(v) => update("phone", v)} placeholder="+27 15 023 0902" />
            <Field label="Mobile" value={settings.mobile} onChange={(v) => update("mobile", v)} placeholder="+27 72 298 2685" />
            <Field label="Email" value={settings.email} onChange={(v) => update("email", v)} placeholder="info@simekaheights.com" icon={<Mail className="h-4 w-4" />} />
            <Field label="WhatsApp Number" value={settings.whatsapp} onChange={(v) => update("whatsapp", v)} placeholder="27722982685" hint="Format: country code + number, no spaces or +" icon={<MessageCircle className="h-4 w-4" />} />
          </div>
        </Section>

        {/* ── Address ─────────────────────────────── */}
        <Section title="Address" icon={MapPin}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Street" value={settings.address.street} onChange={(v) => update("address.street", v)} />
            <Field label="City" value={settings.address.city} onChange={(v) => update("address.city", v)} />
            <Field label="Province" value={settings.address.province} onChange={(v) => update("address.province", v)} />
            <Field label="Postal Code" value={settings.address.postalCode} onChange={(v) => update("address.postalCode", v)} />
            <Field label="Country" value={settings.address.country} onChange={(v) => update("address.country", v)} />
          </div>
        </Section>

        {/* ── Social Media Links ──────────────────── */}
        <Section title="Social Media Links" icon={Share2}>
          <p className="text-xs text-white/40 mb-4">Leave blank to hide a platform from the footer.</p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Facebook" value={settings.socials.facebook} onChange={(v) => update("socials.facebook", v)} placeholder="https://facebook.com/..." />
            <Field label="Instagram" value={settings.socials.instagram} onChange={(v) => update("socials.instagram", v)} placeholder="https://instagram.com/..." />
            <Field label="Twitter / X" value={settings.socials.twitter} onChange={(v) => update("socials.twitter", v)} placeholder="https://twitter.com/..." />
            <Field label="TikTok" value={settings.socials.tiktok} onChange={(v) => update("socials.tiktok", v)} placeholder="https://tiktok.com/@..." />
            <Field label="YouTube" value={settings.socials.youtube} onChange={(v) => update("socials.youtube", v)} placeholder="https://youtube.com/@..." />
            <Field label="LinkedIn" value={settings.socials.linkedin} onChange={(v) => update("socials.linkedin", v)} placeholder="https://linkedin.com/company/..." />
          </div>
        </Section>

        {/* ── Operating Hours ─────────────────────── */}
        <Section title="Operating Hours" icon={Clock}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Field label="Weekdays (Mon-Fri)" value={settings.operatingHours.weekdays} onChange={(v) => update("operatingHours.weekdays", v)} placeholder="09:00 - 16:00" />
            <Field label="Saturday" value={settings.operatingHours.saturday} onChange={(v) => update("operatingHours.saturday", v)} placeholder="Closed" />
            <Field label="Sunday" value={settings.operatingHours.sunday} onChange={(v) => update("operatingHours.sunday", v)} placeholder="Closed" />
          </div>
        </Section>

        {/* ── Floating Widgets ────────────────────── */}
        <Section title="Floating Widgets" icon={MessageCircle}>
          <div className="space-y-6">
            {/* WhatsApp Widget */}
            <WidgetCard
              title="WhatsApp Chat Button"
              description="Floating button in the bottom-right corner that opens WhatsApp"
              icon={<MessageCircle className="h-5 w-5 text-[#25D366]" />}
              enabled={settings.widgets.whatsapp.enabled}
              onToggle={(v) => update("widgets.whatsapp.enabled", v)}
            >
              <TextArea
                label="Default Message"
                value={settings.widgets.whatsapp.message}
                onChange={(v) => update("widgets.whatsapp.message", v)}
                placeholder="Hi! I'm interested in..."
                rows={3}
              />
            </WidgetCard>

            {/* Video Tour */}
            <WidgetCard
              title="Virtual Tour Button"
              description="Floating button in the bottom-left corner that opens a YouTube video"
              icon={<Play className="h-5 w-5 text-teal" />}
              enabled={settings.widgets.videoTour.enabled}
              onToggle={(v) => update("widgets.videoTour.enabled", v)}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="YouTube Embed URL"
                  value={settings.widgets.videoTour.youtubeUrl}
                  onChange={(v) => update("widgets.videoTour.youtubeUrl", v)}
                  placeholder="https://www.youtube.com/embed/..."
                  hint="Use the embed URL, not the watch URL"
                />
                <Field
                  label="Button Text"
                  value={settings.widgets.videoTour.buttonText}
                  onChange={(v) => update("widgets.videoTour.buttonText", v)}
                  placeholder="Virtual Tour"
                />
              </div>
            </WidgetCard>

            {/* Scroll to Top */}
            <WidgetCard
              title="Scroll to Top Button"
              description="Arrow button in the bottom-left corner that scrolls to the top of the page"
              icon={<ArrowUp className="h-5 w-5 text-white/60" />}
              enabled={settings.widgets.scrollToTop.enabled}
              onToggle={(v) => update("widgets.scrollToTop.enabled", v)}
            />
          </div>
        </Section>

        {/* ── Site Images ──────────────────────────── */}
        <Section title="Site Images" icon={ImageIcon}>
          <p className="text-xs text-white/40 mb-2">Upload images to customise the site. These images are used on the homepage, rooms page, and anywhere room types are displayed. Remove an image to revert to the default property photo.</p>
          <p className="text-[10px] text-amber/50 mb-5">Room images sync across the homepage preview cards and the full Rooms page automatically.</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <ImageUploadField
              label="Hero Background"
              value={settings.homepageImages.heroImage}
              onChange={(v) => update("homepageImages.heroImage", v)}
              hint="Main background image at the top of the homepage"
            />
            <ImageUploadField
              label="Safety Section"
              value={settings.homepageImages.safetyImage}
              onChange={(v) => update("homepageImages.safetyImage", v)}
              hint="Image next to the security features section"
            />
            <ImageUploadField
              label="Single Room"
              value={settings.homepageImages.roomSingleImage}
              onChange={(v) => update("homepageImages.roomSingleImage", v)}
              hint="Used on homepage preview + Rooms page for Single Room"
            />
            <ImageUploadField
              label="Sharing Room"
              value={settings.homepageImages.roomSharingImage}
              onChange={(v) => update("homepageImages.roomSharingImage", v)}
              hint="Used on homepage preview + Rooms page for Sharing Room"
            />
          </div>
        </Section>

        {/* ── Pricing ──────────────────────────────── */}
        <Section title="Room Pricing" icon={DollarSign}>
          <div className="mb-5">
            <WidgetCard
              title="Show Prices on Site"
              description="Toggle whether room prices are visible to visitors. Turn off to hide pricing and show 'Contact for pricing' instead."
              icon={<DollarSign className="h-5 w-5 text-amber" />}
              enabled={settings.pricing.showPrices}
              onToggle={(v) => update("pricing.showPrices", v)}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Single Room</h3>
              <div className="space-y-4">
                <Field
                  label="Monthly Price (ZAR)"
                  value={String(settings.pricing.singleRoom.pricePerMonth)}
                  onChange={(v) => update("pricing.singleRoom.pricePerMonth", Number(v) || 0)}
                  type="number"
                  placeholder="4200"
                  icon={<DollarSign className="h-4 w-4" />}
                />
                <Field
                  label="Annual Price (ZAR)"
                  value={String(settings.pricing.singleRoom.pricePerYear)}
                  onChange={(v) => update("pricing.singleRoom.pricePerYear", Number(v) || 0)}
                  type="number"
                  placeholder="42000"
                  icon={<DollarSign className="h-4 w-4" />}
                />
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Sharing Room</h3>
              <div className="space-y-4">
                <Field
                  label="Monthly Price (ZAR)"
                  value={String(settings.pricing.sharingRoom.pricePerMonth)}
                  onChange={(v) => update("pricing.sharingRoom.pricePerMonth", Number(v) || 0)}
                  type="number"
                  placeholder="3200"
                  icon={<DollarSign className="h-4 w-4" />}
                />
                <Field
                  label="Annual Price (ZAR)"
                  value={String(settings.pricing.sharingRoom.pricePerYear)}
                  onChange={(v) => update("pricing.sharingRoom.pricePerYear", Number(v) || 0)}
                  type="number"
                  placeholder="32000"
                  icon={<DollarSign className="h-4 w-4" />}
                />
              </div>
            </div>
          </div>
        </Section>

        {/* ── About Us Page ────────────────────────── */}
        <Section title="About Us Page" icon={FileText}>
          <p className="text-xs text-white/40 mb-5">Edit the content and images displayed on the About Us page.</p>

          {/* Our Story */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 mb-6">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-amber" />
              Our Story
            </h3>
            <div className="space-y-4">
              <Field
                label="Story Heading"
                value={settings.about.storyTitle}
                onChange={(v) => update("about.storyTitle", v)}
                placeholder="Born From a Belief That Students Deserve Better"
              />
              <div>
                <label className="mb-1.5 block text-xs font-medium text-white/60">
                  Story Paragraphs
                </label>
                <p className="text-[10px] text-white/30 mb-3">Each text area is one paragraph on the page. Add or remove as needed.</p>
                <div className="space-y-3">
                  {settings.about.storyParagraphs.map((para, i) => (
                    <div key={i} className="flex gap-2">
                      <div className="flex-1">
                        <TextArea
                          label={`Paragraph ${i + 1}`}
                          value={para}
                          onChange={(v) => {
                            const updated = [...settings.about.storyParagraphs];
                            updated[i] = v;
                            update("about.storyParagraphs", updated);
                          }}
                          rows={3}
                        />
                      </div>
                      {settings.about.storyParagraphs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = settings.about.storyParagraphs.filter((_, idx) => idx !== i);
                            update("about.storyParagraphs", updated);
                          }}
                          className="mt-5 text-red-400/60 hover:text-red-400 p-1 self-start"
                          title="Remove paragraph"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => update("about.storyParagraphs", [...settings.about.storyParagraphs, ""])}
                  className="mt-3 flex items-center gap-1.5 text-xs text-amber/70 hover:text-amber transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Paragraph
                </button>
              </div>
              <ImageUploadField
                label="Story Image"
                value={settings.about.storyImage}
                onChange={(v) => update("about.storyImage", v)}
                hint="Photo displayed next to the Our Story text"
              />
            </div>
          </div>

          {/* Mission, Vision, Values */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 mb-6">
            <h3 className="text-sm font-semibold text-white mb-4">Mission, Vision &amp; Values</h3>
            <div className="space-y-4">
              <TextArea
                label="Our Mission"
                value={settings.about.mission}
                onChange={(v) => update("about.mission", v)}
                rows={3}
              />
              <TextArea
                label="Our Vision"
                value={settings.about.vision}
                onChange={(v) => update("about.vision", v)}
                rows={3}
              />
              <TextArea
                label="Our Values"
                value={settings.about.values}
                onChange={(v) => update("about.values", v)}
                rows={3}
              />
            </div>
          </div>

          {/* Differentiators */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 mb-6">
            <h3 className="text-sm font-semibold text-white mb-2">Why Choose Simeka Heights</h3>
            <p className="text-[10px] text-white/30 mb-4">Numbered selling points shown in the dark section of the About page.</p>
            <div className="space-y-2">
              {settings.about.differentiators.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber/10 text-amber text-[10px] font-bold">
                    {i + 1}
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const updated = [...settings.about.differentiators];
                      updated[i] = e.target.value;
                      update("about.differentiators", updated);
                    }}
                    className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/25 outline-none focus:border-amber/40"
                  />
                  {settings.about.differentiators.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const updated = settings.about.differentiators.filter((_, idx) => idx !== i);
                        update("about.differentiators", updated);
                      }}
                      className="text-red-400/60 hover:text-red-400 p-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => update("about.differentiators", [...settings.about.differentiators, ""])}
              className="mt-3 flex items-center gap-1.5 text-xs text-amber/70 hover:text-amber transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Point
            </button>
          </div>

          {/* Team Members */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <Users className="h-4 w-4 text-amber" />
              Team Members
            </h3>
            <p className="text-[10px] text-white/30 mb-4">Add or edit team members shown on the About page.</p>
            <div className="space-y-5">
              {settings.about.teamMembers.map((member, i) => (
                <div key={i} className="rounded-lg border border-white/8 bg-white/[0.02] p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-xs font-medium text-white/50">Member {i + 1}</span>
                    {settings.about.teamMembers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = settings.about.teamMembers.filter((_, idx) => idx !== i);
                          update("about.teamMembers", updated);
                        }}
                        className="text-red-400/60 hover:text-red-400 p-1"
                        title="Remove member"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="Name"
                      value={member.name}
                      onChange={(v) => {
                        const updated = [...settings.about.teamMembers];
                        updated[i] = { ...updated[i], name: v };
                        update("about.teamMembers", updated);
                      }}
                      placeholder="Full name"
                    />
                    <Field
                      label="Role / Title"
                      value={member.role}
                      onChange={(v) => {
                        const updated = [...settings.about.teamMembers];
                        updated[i] = { ...updated[i], role: v };
                        update("about.teamMembers", updated);
                      }}
                      placeholder="e.g. General Manager"
                    />
                  </div>
                  <div className="mt-4">
                    <TextArea
                      label="Bio"
                      value={member.bio}
                      onChange={(v) => {
                        const updated = [...settings.about.teamMembers];
                        updated[i] = { ...updated[i], bio: v };
                        update("about.teamMembers", updated);
                      }}
                      rows={2}
                      placeholder="Short bio..."
                    />
                  </div>
                  <div className="mt-4">
                    <ImageUploadField
                      label="Photo"
                      value={member.image}
                      onChange={(v) => {
                        const updated = [...settings.about.teamMembers];
                        updated[i] = { ...updated[i], image: v };
                        update("about.teamMembers", updated);
                      }}
                      hint="Team member profile photo"
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                update("about.teamMembers", [
                  ...settings.about.teamMembers,
                  { name: "", role: "", bio: "", image: "" },
                ])
              }
              className="mt-4 flex items-center gap-1.5 text-xs text-amber/70 hover:text-amber transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Team Member
            </button>
          </div>
        </Section>

        {/* ── General ─────────────────────────────── */}
        <Section title="General" icon={Building2}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Parent Company" value={settings.parentCompany} onChange={(v) => update("parentCompany", v)} placeholder="Simeka Capital" icon={<Building2 className="h-4 w-4" />} />
            <Field
              label="Total Beds"
              value={String(settings.totalBeds)}
              onChange={(v) => update("totalBeds", Number(v) || 0)}
              placeholder="1040"
              type="number"
              icon={<Bed className="h-4 w-4" />}
            />
          </div>
        </Section>
      </div>

      {/* Bottom save bar */}
      <div className="sticky bottom-0 mt-8 flex justify-end rounded-xl border border-white/10 bg-navy-dark/95 p-4 backdrop-blur-md">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-amber px-6 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-amber-dim disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saving ? "Saving…" : "Save All Changes"}
        </button>
      </div>
    </div>
  );
}

/* ─── Sub-components ───────────────────────────────────────────────── */

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber/10">
          <Icon className="h-5 w-5 text-amber" />
        </div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  hint,
  type = "text",
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  type?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-white/60">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">{icon}</div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-amber/40 focus:bg-white/[0.07] ${
            icon ? "pl-10" : ""
          }`}
        />
      </div>
      {hint && <p className="mt-1 text-[11px] text-white/30">{hint}</p>}
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-white/60">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-amber/40 focus:bg-white/[0.07] resize-none"
      />
    </div>
  );
}

function WidgetCard({
  title,
  description,
  icon,
  enabled,
  onToggle,
  children,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  onToggle: (v: boolean) => void;
  children?: React.ReactNode;
}) {
  return (
    <div className={`rounded-xl border p-5 transition-colors ${enabled ? "border-white/10 bg-white/[0.03]" : "border-white/5 bg-white/[0.01] opacity-60"}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">{icon}</div>
          <div>
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            <p className="mt-0.5 text-xs text-white/40">{description}</p>
          </div>
        </div>
        <button
          onClick={() => onToggle(!enabled)}
          className={`relative h-6 w-11 rounded-full transition-colors ${
            enabled ? "bg-amber" : "bg-white/20"
          }`}
          aria-label={`Toggle ${title}`}
        >
          <div
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
              enabled ? "left-[22px]" : "left-0.5"
            }`}
          />
        </button>
      </div>
      {enabled && children && <div className="mt-4 border-t border-white/5 pt-4">{children}</div>}
    </div>
  );
}

function ImageUploadField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      onChange(data.url);
    } catch (err) {
      console.error(err);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
      // Reset the input so the same file can be re-selected
      e.target.value = "";
    }
  };

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-white/60">{label}</label>
      <div className="flex items-center gap-3">
        {value ? (
          <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/20 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Preview" className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/50 transition-colors">
              <label className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                <Upload className="h-4 w-4 text-white" />
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={uploading} />
              </label>
            </div>
          </div>
        ) : (
          <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
            <ImageIcon className="h-6 w-6 text-white/20" />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <label className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10 flex items-center gap-1.5">
              {uploading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-amber" />
                  Uploading...
                </>
              ) : value ? (
                <>
                  <Upload className="h-3.5 w-3.5" />
                  Replace
                </>
              ) : (
                <>
                  <Upload className="h-3.5 w-3.5" />
                  Upload
                </>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={uploading} />
            </label>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="text-xs text-red-400 hover:text-red-300"
                disabled={uploading}
              >
                Remove
              </button>
            )}
          </div>
          {hint && <p className="mt-1.5 text-[10px] text-white/30">{hint}</p>}
          {value && <p className="mt-1 text-[10px] text-emerald-400/60">Custom image active</p>}
          {!value && <p className="mt-1 text-[10px] text-white/25">Using default image</p>}
        </div>
      </div>
    </div>
  );
}

/* ─── Utils ────────────────────────────────────────────────────────── */

/* eslint-disable @typescript-eslint/no-explicit-any */
function mergeSettings(defaults: Settings, source: any): Settings {
  const result = JSON.parse(JSON.stringify(defaults)) as Settings;

  const merge = (target: any, src: any) => {
    for (const key of Object.keys(target)) {
      if (src && key in src) {
        if (
          target[key] &&
          typeof target[key] === "object" &&
          !Array.isArray(target[key]) &&
          typeof src[key] === "object"
        ) {
          merge(target[key], src[key]);
        } else {
          target[key] = src[key];
        }
      }
    }
  };

  merge(result, source);
  return result;
}
