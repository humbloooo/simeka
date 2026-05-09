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
    facebook: "https://facebook.com/simekaheights",
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
      youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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

        {/* ── Homepage Images ─────────────────────── */}
        <Section title="Homepage Images" icon={ImageIcon}>
          <p className="text-xs text-white/40 mb-4">Upload images to replace the stock photography on the homepage. Leave an image empty to use the stock version.</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <ImageUploadField 
              label="Hero Background" 
              value={settings.homepageImages.heroImage} 
              onChange={(v) => update("homepageImages.heroImage", v)} 
              hint="Main background image at the top of the homepage"
            />
            <ImageUploadField 
              label="Safety Highlights" 
              value={settings.homepageImages.safetyImage} 
              onChange={(v) => update("homepageImages.safetyImage", v)} 
              hint="Image shown next to the safety features"
            />
            <ImageUploadField 
              label="Single Room Preview" 
              value={settings.homepageImages.roomSingleImage} 
              onChange={(v) => update("homepageImages.roomSingleImage", v)} 
              hint="Thumbnail for the Single Room option"
            />
            <ImageUploadField 
              label="Sharing Room Preview" 
              value={settings.homepageImages.roomSharingImage} 
              onChange={(v) => update("homepageImages.roomSharingImage", v)} 
              hint="Thumbnail for the Sharing Room option"
            />
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
      <div className="sticky bottom-0 mt-8 flex justify-end rounded-xl border border-white/10 bg-[#0d1b2a]/95 p-4 backdrop-blur-md">
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
    }
  };

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-white/60">{label}</label>
      <div className="flex items-center gap-3">
        {value ? (
          <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Preview" className="h-full w-full object-cover" />
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
