import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";
import { HeaderMandala, TitleFlourish } from "@/components/wedding/mockup-ornaments";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin login",
};

type LoginPageProps = {
  searchParams: Promise<{ next?: string; error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextPath =
    params.next?.startsWith("/admin") && !params.next.startsWith("//")
      ? params.next
      : "/admin";

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-12 sm:px-6 sm:py-16">
      <div className="wedding-frame bg-surface px-6 py-10 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <HeaderMandala className="text-gold" />
          <p className="mt-4 font-ceremony text-[0.65rem] tracking-[0.28em] text-gold uppercase">
            Sagar &amp; Krithika
          </p>
          <h1 className="mt-3 font-ceremony text-3xl text-maroon-deep">
            Admin login
          </h1>
          <TitleFlourish className="mt-4 text-gold" />
          <p className="mt-4 font-display text-base text-[#5a4336]">
            Sign in to manage gifts and reservations.
          </p>
        </div>
        <LoginForm nextPath={nextPath} errorFromQuery={params.error} />
      </div>
      <p className="mt-8 text-center text-[0.65rem] tracking-[0.18em] text-muted uppercase">
        <Link href="/registry" className="transition hover:text-maroon-deep">
          Back to registry
        </Link>
      </p>
    </main>
  );
}
