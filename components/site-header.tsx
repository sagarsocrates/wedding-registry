import Link from "next/link";
import { GoldSideFlourish } from "@/components/wedding/mockup-ornaments";

type SiteHeaderProps = {
  active?: "home" | "registry";
};

export function SiteHeader({ active }: SiteHeaderProps) {
  return (
    <header className="relative z-30 bg-transparent">
      <div className="mx-auto flex w-full max-w-[92rem] items-start justify-between gap-3 px-3 pb-1 pt-4 sm:gap-6 sm:px-6 sm:pt-6 lg:px-8">
        <Link href="/" className="flex flex-col items-start pt-0.5">
          <span className="font-ceremony text-[0.95rem] tracking-[0.22em] text-maroon-deep uppercase sm:text-lg md:text-[1.25rem]">
            Sagar &amp; Krithika
          </span>
          <GoldSideFlourish className="mt-1.5 text-gold" />
        </Link>

        <nav className="flex items-center gap-5 pt-1.5 text-[0.62rem] tracking-[0.22em] uppercase sm:gap-6 sm:text-[0.7rem]">
          <Link
            href="/"
            className={
              active === "home"
                ? "text-maroon-deep"
                : "text-[#6a5344] transition hover:text-maroon-deep"
            }
          >
            Home
          </Link>
          <Link
            href="/registry"
            className={
              active === "registry"
                ? "relative text-maroon-deep"
                : "text-[#6a5344] transition hover:text-maroon-deep"
            }
          >
            Registry
            {active === "registry" ? (
              <span
                aria-hidden
                className="absolute -bottom-2.5 left-1/2 block h-3 w-12 -translate-x-1/2"
              >
                <svg viewBox="0 0 48 12" className="h-full w-full text-gold">
                  <path
                    d="M2 7c8-5 16-5 22 0s14 5 22 0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <circle cx="24" cy="7" r="1.5" fill="currentColor" />
                </svg>
              </span>
            ) : null}
          </Link>
        </nav>
      </div>
    </header>
  );
}
