"use client";

import { useEffect, useState, useCallback } from "react";
import { Loader2, Mail, Phone, Clock } from "lucide-react";

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  enquiryType: string;
  message: string;
  status: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  contacted: "bg-amber/15 text-amber border-amber/30",
  resolved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ status: filter });
      const res = await fetch(`/api/admin/enquiries?${params}`);
      const data = await res.json();
      setEnquiries(data.enquiries || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchEnquiries();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Enquiries</h1>
        <p className="mt-1 text-sm text-white/50">Manage contact form submissions</p>
      </div>

      <div className="mb-6 flex gap-2">
        {["all", "new", "contacted", "resolved"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
              filter === s
                ? "border-amber/50 bg-amber/15 text-amber"
                : "border-white/10 text-white/50 hover:border-white/20"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-amber" />
        </div>
      ) : enquiries.length === 0 ? (
        <div className="flex h-48 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm text-white/40">
          No enquiries found
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((enq) => (
            <div
              key={enq._id}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-white">{enq.name}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-white/40">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" />
                      {enq.email}
                    </span>
                    {enq.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" />
                        {enq.phone}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(enq.createdAt).toLocaleDateString("en-ZA")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize bg-white/5 text-white/60 border-white/10">
                    {enq.enquiryType}
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${
                      statusColors[enq.status] || ""
                    }`}
                  >
                    {enq.status}
                  </span>
                </div>
              </div>

              <p className="mt-3 text-sm text-white/60 leading-relaxed">{enq.message}</p>

              <div className="mt-4 flex gap-2">
                {["new", "contacted", "resolved"].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(enq._id, s)}
                    disabled={enq.status === s}
                    className={`rounded-lg border px-3 py-1 text-xs font-medium capitalize transition-colors disabled:opacity-30 ${
                      enq.status === s
                        ? statusColors[s]
                        : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
