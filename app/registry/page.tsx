import { CategoryNav } from "@/components/registry/category-nav";
import { GiftGrid } from "@/components/registry/gift-grid";
import { RegistryHero } from "@/components/registry/registry-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  filterGiftsByCategory,
  getRegistryData,
} from "@/lib/registry-data";
import { getSiteUrl } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Gift Registry",
  description:
    "A curated gift registry for Sagar & Krithika. Choose something meaningful to celebrate with us.",
  openGraph: {
    title: "Our Gift Registry · Sagar & Krithika",
    description:
      "A curated gift registry for Sagar & Krithika. Choose something meaningful to celebrate with us.",
    url: `${getSiteUrl()}/registry`,
    siteName: "Sagar & Krithika",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

type RegistryPageProps = {
  searchParams: Promise<{ category?: string | string[] }>;
};

export default async function RegistryPage({ searchParams }: RegistryPageProps) {
  const params = await searchParams;
  const rawCategory = params.category;
  const requestedSlug =
    (Array.isArray(rawCategory) ? rawCategory[0] : rawCategory)?.trim() ||
    "all";

  const { categories, gifts, error } = await getRegistryData();

  const knownSlugs = new Set(categories.map((category) => category.slug));
  const activeSlug =
    requestedSlug === "all" || knownSlugs.has(requestedSlug)
      ? requestedSlug
      : "all";

  const filteredGifts = filterGiftsByCategory(gifts, activeSlug);
  const activeCategoryName =
    activeSlug === "all"
      ? "All"
      : (categories.find((category) => category.slug === activeSlug)?.name ??
        "All");

  return (
    <>
      <SiteHeader active="registry" />
      <main className="relative flex-1 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(ellipse_at_top,rgba(255,253,249,0.92),transparent_70%)]"
        />

        <div className="relative mx-auto w-full max-w-6xl px-6 py-14 sm:py-20">
          <RegistryHero />

          {error ? (
            <p className="mt-16 text-center text-sm text-muted" role="alert">
              {error}
            </p>
          ) : (
            <>
              <div className="mt-12 border-y border-line/80 py-4 sm:mt-14">
                <CategoryNav categories={categories} activeSlug={activeSlug} />
              </div>

              <p className="mt-8 text-center text-xs tracking-[0.16em] uppercase text-muted">
                {filteredGifts.length === 0
                  ? "No gifts in this collection"
                  : `${filteredGifts.length} ${filteredGifts.length === 1 ? "gift" : "gifts"}`}
                {activeSlug !== "all" ? ` · ${activeCategoryName}` : null}
              </p>

              <section
                className="mt-10 sm:mt-12"
                aria-label={activeCategoryName}
              >
                <GiftGrid
                  gifts={filteredGifts}
                  activeCategoryName={activeCategoryName}
                />
              </section>

              <p className="mx-auto mt-20 max-w-lg text-center text-sm leading-relaxed text-muted">
                Prefer something else? Your presence at our wedding is the
                greatest gift. If you reserve an item, we will only use your
                name to keep our thank-yous personal.
              </p>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
