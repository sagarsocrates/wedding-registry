import type { ReactNode } from "react";
import Link from "next/link";
import { GoldSideFlourish } from "@/components/wedding/mockup-ornaments";
import { getOptionalAdminUser } from "@/lib/admin";

type SiteHeaderProps = {
  active?: "home" | "registry";
};

function NavLink({
  href,
  children,
  active,
  tone = "muted",
}: {
  href: string;
  children: ReactNode;
  active?: boolean;
  tone?: "muted" | "gold";
}) {
  const color = active
    ? "relative text-maroon-deep"
    : tone === "gold"
      ? "text-gold transition hover:text-maroon-deep"
      : "text-[#6a5344] transition hover:text-maroon-deep";

  return (
    <Link href={href} className={`inline-flex items-center leading-none ${color}`}>
      {children}
      {active ? (
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
  );
}

export async function SiteHeader({ active }: SiteHeaderProps) {
  const admin = await getOptionalAdminUser();

  return (
    <header className="relative z-30 bg-transparent">
      <div className="mx-auto flex w-full max-w-[92rem] items-center justify-between gap-2 px-3 pb-1 pt-4 sm:items-start sm:gap-6 sm:px-6 sm:pt-6 lg:px-8">
        <Link href="/" className="flex min-w-0 flex-col items-start pt-0.5">
          <span className="font-ceremony text-[0.8rem] tracking-[0.16em] text-maroon-deep uppercase sm:text-lg sm:tracking-[0.22em] md:text-[1.25rem]">
            Sagar &amp; Krithika
          </span>
          <GoldSideFlourish className="mt-1.5 text-gold" />
        </Link>

        <nav className="flex flex-nowrap items-center justify-end gap-x-3 pt-0.5 text-[0.58rem] tracking-[0.16em] whitespace-nowrap uppercase sm:gap-6 sm:pt-1.5 sm:text-[0.7rem] sm:tracking-[0.22em]">
          <NavLink href="/" active={active === "home"}>
            Home
          </NavLink>
          <NavLink href="/registry" active={active === "registry"}>
            Registry
          </NavLink>
          {admin ? (
            <NavLink href="/admin" tone="gold">
              Admin
            </NavLink>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
