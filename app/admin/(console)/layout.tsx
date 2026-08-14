import { logoutAdmin } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin";
import { GoldSideFlourish, HeaderMandala } from "@/components/wedding/mockup-ornaments";
import Link from "next/link";

export default async function AdminConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await requireAdmin();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <header className="border-b border-gold/45 bg-surface">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-5 sm:px-6">
          <div className="flex items-start justify-between gap-3">
            <Link href="/admin" className="flex flex-col items-start">
              <span className="flex items-center gap-2 font-ceremony text-[0.62rem] tracking-[0.22em] text-gold uppercase">
                <HeaderMandala className="h-4 w-4" />
                Manage
              </span>
              <span className="mt-1 font-ceremony text-lg tracking-[0.12em] text-maroon-deep uppercase sm:text-xl">
                Registry Admin
              </span>
              <GoldSideFlourish className="mt-1.5 text-gold" />
            </Link>
            <div className="flex flex-col items-end gap-2">
              <span className="hidden max-w-[14rem] truncate text-[0.62rem] tracking-[0.12em] text-muted sm:inline">
                {user.email}
              </span>
              <form action={logoutAdmin}>
                <button
                  type="submit"
                  className="text-[0.62rem] tracking-[0.18em] text-muted uppercase transition hover:text-maroon-deep"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.62rem] tracking-[0.2em] uppercase">
            <Link
              href="/admin"
              className="text-maroon-deep transition hover:text-accent"
            >
              Gifts
            </Link>
            <Link
              href="/admin/gifts/new"
              className="text-[#6a5344] transition hover:text-maroon-deep"
            >
              Add gift
            </Link>
            <Link
              href="/registry"
              className="text-[#6a5344] transition hover:text-maroon-deep"
            >
              View registry
            </Link>
          </nav>
        </div>
      </header>
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        {children}
      </div>
    </div>
  );
}
