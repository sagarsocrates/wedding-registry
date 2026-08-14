import Link from "next/link";
import { HeaderMandala } from "@/components/wedding/mockup-ornaments";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-background pb-10 pt-2">
      <div className="flex flex-col items-center px-6 text-center">
        <HeaderMandala className="text-gold" />
        <p className="mt-4 font-ceremony text-sm tracking-[0.2em] text-maroon-deep uppercase">
          Sagar &amp; Krithika
        </p>
        <p className="mx-auto mt-3 max-w-sm font-display text-base leading-relaxed text-[#5a4336]">
          Thank you for blessing our beginning with your love and presence.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-[0.65rem] tracking-[0.18em] text-muted uppercase">
          <Link href="/" className="transition hover:text-maroon-deep">
            Home
          </Link>
          <Link href="/registry" className="transition hover:text-maroon-deep">
            Registry
          </Link>
          <Link href="/admin" className="transition hover:text-maroon-deep">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
