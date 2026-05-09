"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  Trash2,
  Plus,
  X,
  Star,
} from "lucide-react";

interface Testimonial {
  _id: string;
  name: string;
  yearOfStudy: string;
  faculty: string;
  quote: string;
  rating: number;
  photoUrl: string;
  approved: boolean;
  createdAt: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    name: "",
    yearOfStudy: "",
    faculty: "",
    quote: "",
    rating: 5,
  });

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter !== "all") params.set("approved", filter === "approved" ? "true" : "false");
      const res = await fetch(`/api/admin/testimonials?${params}`);
      const data = await res.json();
      setTestimonials(data.testimonials || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const toggleApproval = async (id: string, approved: boolean) => {
    await fetch(`/api/admin/testimonials/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved: !approved }),
    });
    fetchTestimonials();
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    fetchTestimonials();
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", yearOfStudy: "", faculty: "", quote: "", rating: 5 });
    setShowAdd(false);
    fetchTestimonials();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Testimonials</h1>
          <p className="mt-1 text-sm text-white/50">
            Manage student reviews and feedback
          </p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 rounded-xl bg-amber px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-amber/90"
        >
          <Plus className="h-4 w-4" />
          Add Testimonial
        </button>
      </div>

      {/* Add Form */}
      {showAdd && (
        <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Add Testimonial</h2>
            <button onClick={() => setShowAdd(false)} className="text-white/40 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-white/50">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Student name"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-amber/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-white/50">Year & Course</label>
                <input
                  required
                  value={form.yearOfStudy}
                  onChange={(e) => setForm({ ...form, yearOfStudy: e.target.value })}
                  placeholder="e.g. 2nd Year, BSc"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-amber/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-white/50">Faculty</label>
                <input
                  required
                  value={form.faculty}
                  onChange={(e) => setForm({ ...form, faculty: e.target.value })}
                  placeholder="e.g. Science"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-amber/50 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/50">Quote</label>
              <textarea
                required
                rows={3}
                value={form.quote}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
                placeholder="What the student said about Simeka Heights..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-amber/50 focus:outline-none resize-none"
              />
            </div>
            <div className="flex items-center gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-white/50">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setForm({ ...form, rating: r })}
                      className="p-0.5"
                    >
                      <Star
                        className={`h-5 w-5 ${
                          r <= form.rating
                            ? "fill-amber text-amber"
                            : "text-white/20"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="ml-auto rounded-xl bg-amber px-6 py-2.5 text-sm font-semibold text-navy hover:bg-amber/90"
              >
                Add Testimonial
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="mb-6 flex gap-2">
        {["all", "pending", "approved"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
              filter === f
                ? "border-amber/50 bg-amber/15 text-amber"
                : "border-white/10 text-white/50 hover:border-white/20"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-amber" />
        </div>
      ) : testimonials.length === 0 ? (
        <div className="flex h-48 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm text-white/40">
          No testimonials found
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-white">{t.name}</p>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                        t.approved
                          ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-400"
                          : "border-yellow-500/30 bg-yellow-500/15 text-yellow-400"
                      }`}
                    >
                      {t.approved ? "Approved" : "Pending"}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-white/40">
                    {t.yearOfStudy} &middot; {t.faculty}
                  </p>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber text-amber" />
                  ))}
                </div>
              </div>

              <p className="mt-3 text-sm italic text-white/60 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => toggleApproval(t._id, t.approved)}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                    t.approved
                      ? "border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                      : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                  }`}
                >
                  {t.approved ? (
                    <>
                      <XCircle className="h-3.5 w-3.5" /> Unapprove
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                    </>
                  )}
                </button>
                <button
                  onClick={() => deleteTestimonial(t._id)}
                  className="flex items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
