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
      <SiteHeader active="registry" />
      <StyleOneHero showSketches={false} />
      <div className="relative z-20 pb-3 sm:pb-0">
        <CategoryIconBar categories={categories} activeSlug={activeSlug} />
      </div>

      <main>
        {error ? (
          <p className="px-6 py-16 text-center text-sm text-muted" role="alert">
            {error}
          </p>
        ) : (
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-10">
            <section aria-label={activeCategoryName}>
              <GiftGrid
                gifts={filteredGifts}
                activeCategoryName={activeCategoryName}
              />
            </section>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
