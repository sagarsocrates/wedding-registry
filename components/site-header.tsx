import Link from "next/link";

type SiteHeaderProps = {
  active?: "home" | "registry";
};

export function SiteHeader({ active }: SiteHeaderProps) {
  return (
    <header className="relative z-10 border-b border-line/70 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-xl tracking-wide text-foreground transition hover:text-accent"
        >
          Sagar &amp; Krithika
        </Link>
        <nav className="flex items-center gap-5 text-xs tracking-[0.16em] uppercase">
          <Link
            href="/"
            className={
              active === "home"
                ? "text-foreground"
                : "text-muted transition hover:text-foreground"
            }
          >
            Home
          </Link>
          <Link
            href="/registry"
            className={
              active === "registry"
                ? "text-foreground"
                : "text-muted transition hover:text-foreground"
            }
          >
            Registry
          </Link>
        </nav>
      </div>
    </header>
  );
}
