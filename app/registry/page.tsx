import { BlessingsSection } from "@/components/registry/blessings-section";
import { CategoryIconBar } from "@/components/registry/category-icon-bar";
import { GiftGrid } from "@/components/registry/gift-grid";
import { StyleOneHero } from "@/components/registry/style-one-hero";
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
    "Your love and blessings mean the world to us. Browse Sagar & Krithika's wedding gift registry.",
  openGraph: {
    title: "Our Gift Registry · Sagar & Krithika",
    description:
      "Your love and blessings mean the world to us. Browse our wedding gift registry.",
    url: `${getSiteUrl()}/registry`,
    siteName: "Sagar & Krithika",
    type: "website",
    images: [{ url: "/images/tamil-nadu-sketch.png" }],
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
    <div className="relative min-h-full overflow-x-hidden bg-background">
      <div>
        <SiteHeader active="registry" />
        <StyleOneHero />
        <div className="relative z-20 mt-3 sm:mt-4">
          <CategoryIconBar categories={categories} activeSlug={activeSlug} />
        </div>
      </div>

      <main>
        {error ? (
          <p className="px-6 py-16 text-center text-sm text-muted" role="alert">
            {error}
          </p>
        ) : (
          <div className="mx-auto w-full max-w-6xl px-3 pb-8 pt-4 sm:px-8 sm:pb-12 sm:pt-8">
            <div className="mb-6 flex flex-col items-center text-center sm:mb-10">
              <p className="font-ceremony text-[0.65rem] tracking-[0.28em] text-gold uppercase">
                The collection
              </p>
              <h2 className="mt-2 font-ceremony text-2xl text-maroon-deep sm:text-3xl">
                {activeCategoryName === "All" ? "All gifts" : activeCategoryName}
              </h2>
              <p className="mt-3 font-ceremony text-[0.65rem] tracking-[0.2em] text-muted uppercase">
                {filteredGifts.length === 0
                  ? "No gifts in this collection"
                  : `${filteredGifts.length} ${filteredGifts.length === 1 ? "gift" : "gifts"}`}
              </p>
            </div>
            <section aria-label={activeCategoryName}>
              <GiftGrid
                gifts={filteredGifts}
                activeCategoryName={activeCategoryName}
              />
            </section>
          </div>
        )}
        <BlessingsSection />
      </main>
      <SiteFooter />
    </div>
  );
}
