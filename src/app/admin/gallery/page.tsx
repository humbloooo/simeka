"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Upload,
  Loader2,
  Trash2,
  ImagePlus,
  X,
  Star,
} from "lucide-react";

interface GalleryImage {
  _id: string;
  url: string;
  publicId: string;
  category: string;
  caption: string;
  order: number;
  featured: boolean;
  createdAt: string;
}

const categories = ["all", "rooms", "amenities", "exterior", "events", "general"];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [showUpload, setShowUpload] = useState(false);
  const [uploadCategory, setUploadCategory] = useState("general");
  const [uploadCaption, setUploadCaption] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ category: filter });
      const res = await fetch(`/api/admin/gallery?${params}`);
      const data = await res.json();
      setImages(data.images || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("category", uploadCategory);
        formData.append("caption", uploadCaption);

        await fetch("/api/admin/gallery", {
          method: "POST",
          body: formData,
        });
      }
      setUploadCaption("");
      setShowUpload(false);
      fetchImages();
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image? This cannot be undone.")) return;
    await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    fetchImages();
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    await fetch(`/api/admin/gallery/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !featured }),
    });
    fetchImages();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleUpload(e.dataTransfer.files);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Gallery</h1>
          <p className="mt-1 text-sm text-white/50">
            {images.length} image{images.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="flex items-center gap-2 rounded-xl bg-amber px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-amber/90"
        >
          <ImagePlus className="h-4 w-4" />
          Upload Images
        </button>
      </div>

      {/* Upload Panel */}
      {showUpload && (
        <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Upload New Images</h2>
            <button onClick={() => setShowUpload(false)} className="text-white/40 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 mb-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/50">Category</label>
              <select
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white focus:border-amber/50 focus:outline-none"
              >
                {categories.filter((c) => c !== "all").map((c) => (
                  <option key={c} value={c} className="bg-[#0d1b2a]">
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/50">Caption (optional)</label>
              <input
                type="text"
                value={uploadCaption}
                onChange={(e) => setUploadCaption(e.target.value)}
                placeholder="Describe this image..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-amber/50 focus:outline-none"
              />
            </div>
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed p-10 transition-colors ${
              dragOver
                ? "border-amber bg-amber/5"
                : "border-white/15 hover:border-white/30"
            }`}
          >
            {uploading ? (
              <>
                <Loader2 className="h-10 w-10 animate-spin text-amber" />
                <p className="text-sm text-white/60">Uploading...</p>
              </>
            ) : (
              <>
                <Upload className="h-10 w-10 text-white/30" />
                <p className="text-sm text-white/60">
                  Drag & drop images here, or <span className="text-amber">browse</span>
                </p>
                <p className="text-xs text-white/30">PNG, JPG, WebP up to 10MB</p>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleUpload(e.target.files)}
            className="hidden"
          />
        </div>
      )}

      {/* Category filter */}
      <div className="mb-6 flex gap-2 overflow-x-auto">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
              filter === c
                ? "border-amber/50 bg-amber/15 text-amber"
                : "border-white/10 text-white/50 hover:border-white/20"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-amber" />
        </div>
      ) : images.length === 0 ? (
        <div className="flex h-48 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/40">
          <ImagePlus className="mb-2 h-8 w-8" />
          <p className="text-sm">No images yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <div
              key={img._id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <div className="relative aspect-square">
                <Image
                  src={img.url}
                  alt={img.caption || "Gallery image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => toggleFeatured(img._id, img.featured)}
                    className={`rounded-full p-2 backdrop-blur-sm transition-colors ${
                      img.featured
                        ? "bg-amber text-navy"
                        : "bg-white/20 text-white hover:bg-amber hover:text-navy"
                    }`}
                  >
                    <Star className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(img._id)}
                    className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="truncate text-xs text-white/60">
                  {img.caption || "No caption"}
                </p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] capitalize text-white/40">
                    {img.category}
                  </span>
                  {img.featured && (
                    <Star className="h-3 w-3 fill-amber text-amber" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
