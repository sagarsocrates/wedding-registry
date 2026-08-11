import Link from "next/link";

type SiteFooterProps = {
  showAdminHint?: boolean;
};

export function SiteFooter({ showAdminHint = false }: SiteFooterProps) {
  return (
    <footer className="mt-auto border-t border-line/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-6 py-10 text-center">
        <p className="font-display text-lg tracking-wide text-foreground">
          Sagar &amp; Krithika
        </p>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          With love and gratitude for celebrating this chapter with us.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-1 text-xs tracking-[0.14em] uppercase text-muted">
          <Link href="/" className="transition hover:text-foreground">
            Home
          </Link>
          <Link href="/registry" className="transition hover:text-foreground">
            Registry
          </Link>
          {showAdminHint ? (
            <Link href="/admin" className="transition hover:text-foreground">
              Admin
            </Link>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
