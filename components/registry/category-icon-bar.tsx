import type { Category } from "@/lib/types";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  BarEndOrnament,
  FiligreeCorner,
} from "@/components/wedding/mockup-ornaments";

type CategoryIconBarProps = {
  categories: Category[];
  activeSlug: string;
};

const ICONS: Record<string, ReactNode> = {
  all: (
    <svg viewBox="0 0 40 40" className="h-7 w-7 sm:h-8 sm:w-8" fill="none" aria-hidden>
      <rect x="11" y="16" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11 21h18M20 16v14" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M20 16c-2.8-3.6-7.2-3.5-7.2 0.2 0 2.5 3.2 4.4 7.2 6 4-1.6 7.2-3.5 7.2-6 0-3.7-4.4-3.8-7.2-.2Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  ),
  kitchen: (
    <svg viewBox="0 0 40 40" className="h-7 w-7 sm:h-8 sm:w-8" fill="none" aria-hidden>
      <path d="M12 19c0-4.6 3.6-8.2 8-8.2s8 3.6 8 8.2v10H12V19Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 29h20M20 10.8v2.4" stroke="currentColor" strokeWidth="1.25" />
      <path d="M15 19h10" stroke="currentColor" strokeWidth="1.1" opacity="0.7" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 40 40" className="h-7 w-7 sm:h-8 sm:w-8" fill="none" aria-hidden>
      <path d="M9 23h22v9H9v-9Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M13 23v-3.5c0-4 3.2-7.2 7-7.2s7 3.2 7 7.2V23" stroke="currentColor" strokeWidth="1.35" />
      <path d="M17 28h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  decor: (
    <svg viewBox="0 0 40 40" className="h-7 w-7 sm:h-8 sm:w-8" fill="none" aria-hidden>
      <path
        d="M14.5 26c0-5.5 2.8-9.2 5.5-13 2.7 3.8 5.5 7.5 5.5 13v1.5h-11V26Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M20 27.5v3.5M16 32.5h8M17.5 14.5c1-1.8 1.8-2.8 2.5-3.5.7.7 1.5 1.7 2.5 3.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  ),
  experiences: (
    <svg viewBox="0 0 40 40" className="h-7 w-7 sm:h-8 sm:w-8" fill="none" aria-hidden>
      <rect x="9" y="14" width="22" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="20" cy="21.5" r="4.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M14 14l1.8-2.8h8.4L26 14" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  ),
  "gift-cards": (
    <svg viewBox="0 0 40 40" className="h-7 w-7 sm:h-8 sm:w-8" fill="none" aria-hidden>
      <rect x="8" y="13" width="24" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 18.5h24M13 24h7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  ),
};

export function CategoryIconBar({
  categories,
  activeSlug,
}: CategoryIconBarProps) {
  const items = [
    { slug: "all", name: "All" },
    ...categories.map((category) => ({
      slug: category.slug,
      name: category.name,
    })),
  ];

  return (
    <div className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <nav
        aria-label="Gift categories"
        className="relative overflow-hidden rounded-2xl border border-gold/50 bg-leaf px-3 py-5 shadow-[0_16px_44px_rgba(29,51,35,0.28)] sm:px-5 sm:py-6"
      >
        <BarEndOrnament
          side="left"
          className="absolute left-1 top-1/2 hidden -translate-y-1/2 text-gold/80 sm:block"
        />
        <BarEndOrnament
          side="right"
          className="absolute right-1 top-1/2 hidden -translate-y-1/2 text-gold/80 sm:block"
        />

        <FiligreeCorner className="absolute left-2.5 top-2.5 text-gold sm:left-3.5 sm:top-3" />
        <FiligreeCorner className="absolute right-2.5 top-2.5 text-gold sm:right-3.5 sm:top-3" flipX />
        <FiligreeCorner className="absolute bottom-2.5 left-2.5 text-gold sm:bottom-3 sm:left-3.5" flipY />
        <FiligreeCorner
          className="absolute bottom-2.5 right-2.5 text-gold sm:bottom-3 sm:right-3.5"
          flipX
          flipY
        />

        <ul className="relative mx-auto flex max-w-4xl items-stretch justify-between overflow-x-auto px-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-4 [&::-webkit-scrollbar]:hidden">
          {items.map((item, index) => {
            const isActive = activeSlug === item.slug;
            const href =
              item.slug === "all"
                ? "/registry"
                : `/registry?category=${item.slug}`;

            return (
              <li
                key={item.slug}
                className="relative flex min-w-[3.35rem] flex-1 justify-center sm:min-w-[4.6rem]"
              >
                {index > 0 ? (
                  <span
                    aria-hidden
                    className="absolute left-0 top-[20%] hidden h-[60%] w-px bg-gold/35 sm:block"
                  />
                ) : null}
                <Link
                  href={href}
                  scroll={false}
                  className={[
                    "flex w-full flex-col items-center gap-2 px-1 py-1 text-center transition",
                    isActive
                      ? "text-gold-soft"
                      : "text-gold/85 hover:text-gold-soft",
                  ].join(" ")}
                  aria-current={isActive ? "page" : undefined}
                >
                  {ICONS[item.slug] ?? ICONS.all}
                  <span className="text-[0.58rem] tracking-[0.18em] uppercase sm:text-[0.66rem]">
                    {item.name}
                  </span>
                  <span
                    className={[
                      "h-px w-8 transition",
                      isActive ? "bg-gold-soft" : "bg-transparent",
                    ].join(" ")}
                    aria-hidden
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
