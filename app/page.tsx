import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteUrl } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Sagar & Krithika — a celebration of love. Browse our wedding gift registry.",
  openGraph: {
    title: "Sagar & Krithika",
    description: "A celebration of love. Browse our wedding gift registry.",
    url: getSiteUrl(),
    siteName: "Sagar & Krithika",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <SiteHeader active="home" />
      <main className="relative flex flex-1 flex-col overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,253,249,0.95),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(140,106,90,0.08),transparent_45%)]"
        />
        <div className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-24 text-center sm:py-32">
          <p className="animate-fade-up text-xs tracking-[0.28em] uppercase text-accent">
            Together
          </p>
          <h1 className="animate-fade-up animation-delay-100 mt-6 font-display text-5xl leading-[1.05] tracking-wide text-foreground sm:text-6xl md:text-7xl">
            Sagar &amp; Krithika
          </h1>
          <p className="animate-fade-up animation-delay-200 mt-8 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Our full wedding site is on the way. Until then, you are warmly
            invited to browse the gifts we would love to share a home with.
          </p>
          <div className="animate-fade-up animation-delay-200 mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/registry"
              className="inline-flex min-w-[12rem] items-center justify-center bg-foreground px-8 py-3.5 text-xs tracking-[0.18em] uppercase text-surface transition hover:bg-foreground/90"
            >
              View registry
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
