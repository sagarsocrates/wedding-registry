import type { Category } from "@/lib/types";
import Link from "next/link";

type CategoryNavProps = {
  categories: Category[];
  activeSlug: string;
};

export function CategoryNav({ categories, activeSlug }: CategoryNavProps) {
  const items = [
    { slug: "all", name: "All" },
    ...categories.map((category) => ({
      slug: category.slug,
      name: category.name,
    })),
  ];

  return (
    <nav
      aria-label="Gift categories"
      className="relative -mx-6 px-6 sm:mx-0 sm:px-0"
    >
      <ul className="flex items-center gap-1 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:gap-1 sm:overflow-visible sm:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const isActive = activeSlug === item.slug;
          const href =
            item.slug === "all"
              ? "/registry"
              : `/registry?category=${item.slug}`;

          return (
            <li key={item.slug} className="shrink-0">
              <Link
                href={href}
                scroll={false}
                className={[
                  "group relative inline-flex items-center px-3 py-2.5 text-[0.7rem] tracking-[0.16em] uppercase transition-colors duration-300 sm:px-4 sm:text-xs",
                  isActive
                    ? "text-accent"
                    : "text-muted hover:text-foreground",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="whitespace-nowrap">{item.name}</span>
                <span
                  className={[
                    "pointer-events-none absolute inset-x-3 -bottom-0.5 h-[2px] origin-center bg-gradient-to-r from-gold via-accent to-gold transition-transform duration-300 ease-out sm:inset-x-4",
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-50",
                  ].join(" ")}
                  aria-hidden
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
