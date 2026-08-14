import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Karla } from "next/font/google";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const ceremony = Cinzel({
  variable: "--font-ceremony",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Karla({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sagar & Krithika",
    template: "%s · Sagar & Krithika",
  },
  description:
    "Wedding gift registry for Sagar & Krithika — a Tamil & Kerala celebration",
  openGraph: {
    siteName: "Sagar & Krithika",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${ceremony.variable} ${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
