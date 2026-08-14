import { FloralDivider, Thoranam } from "@/components/wedding/ornaments";

export function RegistryHero() {
  return (
    <header className="mx-auto max-w-2xl text-center">
      <Thoranam className="animate-fade-up" />
      <p className="animate-fade-up animation-delay-100 mt-5 font-ceremony text-[0.7rem] tracking-[0.32em] text-accent uppercase">
        Sagar &amp; Krithika
      </p>
      <h1 className="animate-fade-up animation-delay-200 mt-4 font-ceremony text-3xl leading-tight text-maroon-deep sm:text-4xl md:text-5xl">
        Our Gift Registry
      </h1>
      <FloralDivider className="animate-fade-up animation-delay-200 mt-6" />
      <p className="animate-fade-up animation-delay-300 mt-6 font-display text-lg leading-relaxed text-muted sm:text-xl">
        If you would like to celebrate with us through a gift, we have gathered
        a few things for our home. Choose what feels right — your presence is
        the greatest blessing of all.
      </p>
    </header>
  );
}
