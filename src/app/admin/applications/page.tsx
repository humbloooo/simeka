"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  Download,
} from "lucide-react";

interface Application {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  studentNumber: string;
  yearOfStudy: number;
  faculty: string;
  roomType: string;
  fundingSource: string;
  nsfasRef?: string;
  status: string;
  notes: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  reviewing: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  approved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  rejected: "bg-red-500/15 text-red-400 border-red-500/30",
  waitlisted: "bg-purple-500/15 text-purple-400 border-purple-500/30",
};

const statuses = ["all", "pending", "reviewing", "approved", "rejected", "waitlisted"];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return d.toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Application | null>(null);
  const [exporting, setExporting] = useState(false);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), status });
      if (search) params.set("search", search);
      const res = await fetch(`/api/admin/applications?${params}`);
      const data = await res.json();
      setApplications(data.applications || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, status, search]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const updateStatus = async (id: string, newStatus: string) => {
    await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchApplications();
    if (selected?._id === id) {
      setSelected((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const exportCsv = async () => {
    setExporting(true);
    try {
      // Fetch ALL applications (no pagination)
      const params = new URLSearchParams({ page: "1", limit: "10000", status });
      if (search) params.set("search", search);
      const res = await fetch(`/api/admin/applications?${params}`);
      const data = await res.json();
      const apps: Application[] = data.applications || [];

      if (apps.length === 0) {
        alert("No applications to export.");
        return;
      }

      const headers = [
        "Full Name",
        "Email",
        "Phone",
        "Student Number",
        "Year of Study",
        "Faculty",
        "Room Type",
        "Funding Source",
        "NSFAS Ref",
        "Status",
        "Applied Date",
      ];

      const rows = apps.map((a) => [
        a.fullName,
        a.email,
        a.phone,
        a.studentNumber,
        String(a.yearOfStudy),
        a.faculty,
        a.roomType,
        a.fundingSource,
        a.nsfasRef || "",
        a.status,
        new Date(a.createdAt).toLocaleDateString("en-ZA"),
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map((row) =>
          row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
        ),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `simeka-applications-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to export.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Applications</h1>
          <p className="mt-1 text-sm text-white/50">
            {total} total application{total !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={exportCsv}
          disabled={exporting}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
          aria-label="Export applications to CSV"
        >
          {exporting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search by name, email, or student number..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:border-amber/50 focus:outline-none"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => {
                setStatus(s);
                setPage(1);
              }}
              className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                status === s
                  ? "border-amber/50 bg-amber/15 text-amber"
                  : "border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-amber" />
          </div>
        ) : applications.length === 0 ? (
          <div className="flex h-48 items-center justify-center text-sm text-white/40">
            No applications found
          </div>
        ) : (
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-white/40">
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Room Type</th>
                <th className="px-4 py-3">Funding</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Applied</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {applications.map((app) => (
                <tr key={app._id} className="hover:bg-white/[0.03]">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{app.fullName}</p>
                    <p className="text-white/40">{app.email}</p>
                  </td>
                  <td className="px-4 py-3 text-white/70 capitalize">{app.roomType}</td>
                  <td className="px-4 py-3 text-white/70 uppercase text-xs">{app.fundingSource}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${
                        statusColors[app.status] || "text-white/50"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white/40" title={new Date(app.createdAt).toLocaleString("en-ZA")}>
                    {formatDate(app.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelected(app)}
                      className="rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-amber"
                      aria-label={`View details for ${app.fullName}`}
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-white/40">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border border-white/10 p-2 text-white/50 hover:text-white disabled:opacity-30"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg border border-white/10 p-2 text-white/50 hover:text-white disabled:opacity-30"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Application details for ${selected.fullName}`}
        >
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-navy-dark p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-white">{selected.fullName}</h2>
                <p className="text-sm text-white/50">{selected.email}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg p-1 text-white/40 hover:text-white"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <Detail label="Phone" value={selected.phone} />
                <Detail label="Student No." value={selected.studentNumber} />
                <Detail label="Year of Study" value={String(selected.yearOfStudy)} />
                <Detail label="Faculty" value={selected.faculty} />
                <Detail label="Room Type" value={selected.roomType} />
                <Detail label="Funding" value={selected.fundingSource.toUpperCase()} />
                {selected.nsfasRef && (
                  <Detail label="NSFAS Ref" value={selected.nsfasRef} />
                )}
                <Detail
                  label="Applied"
                  value={new Date(selected.createdAt).toLocaleDateString("en-ZA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                />
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">
                Update Status
              </p>
              <div className="flex flex-wrap gap-2">
                {["pending", "reviewing", "approved", "rejected", "waitlisted"].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected._id, s)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                      selected.status === s
                        ? statusColors[s]
                        : "border-white/10 text-white/50 hover:border-white/30"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/5 px-3 py-2">
      <p className="text-[10px] uppercase tracking-wider text-white/40">{label}</p>
      <p className="mt-0.5 text-white/80">{value}</p>
    </div>
  );
}
