import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";

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
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
      <p className="text-xs tracking-[0.18em] uppercase text-accent">
        Sagar &amp; Krithika
      </p>
      <h1 className="mt-3 font-display text-3xl text-foreground">Admin login</h1>
      <p className="mt-3 text-sm text-muted">
        Sign in to manage gifts and reservations.
      </p>
      <LoginForm nextPath={nextPath} errorFromQuery={params.error} />
    </main>
  );
}
