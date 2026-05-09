"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw, ImageOff } from "lucide-react";

export default function GalleryError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber/10">
          <ImageOff className="h-8 w-8 text-amber" />
        </div>
        <h2 className="font-heading text-xl font-bold text-foreground mb-2">
          Failed to Load Gallery
        </h2>
        <p className="text-muted-foreground mb-6">
          Something went wrong while loading the gallery images. Please try again.
        </p>
        <Button
          onClick={reset}
          className="bg-amber hover:bg-amber-dim text-navy font-semibold"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
