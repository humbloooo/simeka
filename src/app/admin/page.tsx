"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  MessageSquare,
  ImageIcon,
  Star,
  Users,
  Clock,
  CheckCircle2,
  Loader2,
} from "lucide-react";

interface Stats {
  applications: { total: number; pending: number; approved: number };
  enquiries: { total: number; new: number };
  subscribers: number;
  testimonials: { total: number; pending: number };
  gallery: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber" />
      </div>
    );
  }

  const cards = [
    {
      label: "Total Applications",
      value: stats?.applications.total ?? 0,
      icon: FileText,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Pending Applications",
      value: stats?.applications.pending ?? 0,
      icon: Clock,
      color: "text-amber",
      bg: "bg-amber/10",
    },
    {
      label: "Approved",
      value: stats?.applications.approved ?? 0,
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      label: "New Enquiries",
      value: stats?.enquiries.new ?? 0,
      icon: MessageSquare,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      label: "Gallery Images",
      value: stats?.gallery ?? 0,
      icon: ImageIcon,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
    },
    {
      label: "Testimonials",
      value: stats?.testimonials.total ?? 0,
      icon: Star,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
    {
      label: "Pending Reviews",
      value: stats?.testimonials.pending ?? 0,
      icon: Star,
      color: "text-orange-400",
      bg: "bg-orange-400/10",
    },
    {
      label: "Newsletter Subs",
      value: stats?.subscribers ?? 0,
      icon: Users,
      color: "text-pink-400",
      bg: "bg-pink-400/10",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-white/50">
          Overview of Simeka Heights residence management
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/[0.07]"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/50">{card.label}</p>
              <div className={`rounded-lg ${card.bg} p-2`}>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-white">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-white mb-2">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href="/admin/applications"
            className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/70 transition-colors hover:border-amber/30 hover:bg-amber/5 hover:text-amber"
          >
            <FileText className="h-5 w-5" />
            Review Applications
          </a>
          <a
            href="/admin/enquiries"
            className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/70 transition-colors hover:border-amber/30 hover:bg-amber/5 hover:text-amber"
          >
            <MessageSquare className="h-5 w-5" />
            View Enquiries
          </a>
          <a
            href="/admin/gallery"
            className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/70 transition-colors hover:border-amber/30 hover:bg-amber/5 hover:text-amber"
          >
            <ImageIcon className="h-5 w-5" />
            Upload Images
          </a>
          <a
            href="/admin/testimonials"
            className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/70 transition-colors hover:border-amber/30 hover:bg-amber/5 hover:text-amber"
          >
            <Star className="h-5 w-5" />
            Manage Testimonials
          </a>
        </div>
      </div>
    </div>
  );
}
