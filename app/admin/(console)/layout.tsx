import { logoutAdmin } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin";
import Link from "next/link";

export default async function AdminConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await requireAdmin();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="border-b border-line bg-surface/80">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-display text-xl text-foreground">
              Registry Admin
            </Link>
            <nav className="hidden gap-4 text-sm text-muted sm:flex">
              <Link href="/admin" className="transition hover:text-foreground">
                Gifts
              </Link>
              <Link
                href="/admin/gifts/new"
                className="transition hover:text-foreground"
              >
                Add gift
              </Link>
              <Link
                href="/registry"
                className="transition hover:text-foreground"
              >
                View registry
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted">
            <span className="hidden max-w-[12rem] truncate sm:inline">
              {user.email}
            </span>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="text-xs tracking-[0.12em] uppercase text-accent hover:underline"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">{children}</div>
    </div>
  );
}
