import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search, MessageCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy px-4">
      <div className="text-center max-w-lg">
        <Image
          src="/images/logo-small.png"
          alt="Simeka Heights"
          width={120}
          height={60}
          className="mx-auto mb-8 h-10 w-auto invert"
        />

        <div className="font-heading text-[6rem] sm:text-[10rem] font-extrabold leading-none text-amber/15 mb-2 select-none">
          404
        </div>

        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3 -mt-8 sm:-mt-12">
          Page Not Found
        </h1>
        <p className="text-white/50 mb-8 sm:mb-10 text-base sm:text-lg">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild className="bg-amber hover:bg-amber-dim text-navy font-semibold h-11 px-6">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 h-11 px-6"
          >
            <Link href="/rooms">
              <Search className="mr-2 h-4 w-4" />
              View Rooms
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 h-11 px-6"
          >
            <Link href="/contact">
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact Us
            </Link>
          </Button>
        </div>

        <p className="mt-12 text-xs text-white/30">
          Simeka Heights &mdash; Premium Student Accommodation Near UNIVEN
        </p>
      </div>
    </div>
  );
}
