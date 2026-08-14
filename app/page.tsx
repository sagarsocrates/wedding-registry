import { BlessingsSection } from "@/components/registry/blessings-section";
import { StyleOneHero } from "@/components/registry/style-one-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteUrl } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Sagar & Krithika — celebrating our forever. Browse our wedding gift registry.",
  openGraph: {
    title: "Sagar & Krithika",
    description: "Celebrating our forever. Browse our wedding gift registry.",
    url: getSiteUrl(),
    siteName: "Sagar & Krithika",
    type: "website",
    images: [{ url: "/images/tamil-nadu-sketch.png" }],
  },
};

export default function HomePage() {
  return (
    <div className="relative min-h-full overflow-x-hidden bg-background">
      <SiteHeader active="home" />
      <main>
        <StyleOneHero
          eyebrow="Celebrating our forever"
          title="We are getting married"
          description="Your love and blessings mean the world to us. Join us in celebration — and if you’d like to gift, our registry holds a few things for our happy home together."
        />
        <div className="px-5 py-4 text-center">
          <Link
            href="/registry"
            className="inline-flex min-w-[14rem] items-center justify-center border border-gold bg-maroon-deep px-8 py-3.5 text-[0.7rem] tracking-[0.2em] text-surface uppercase transition hover:bg-accent"
          >
            View gift registry
          </Link>
        </div>
        <BlessingsSection />
      </main>
      <SiteFooter />
    </div>
  );
}
