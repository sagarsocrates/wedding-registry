import Image from "next/image";
import {
  HeaderMandala,
  TitleFlourish,
} from "@/components/wedding/mockup-ornaments";

type StyleOneHeroProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  showSketches?: boolean;
};

const DEFAULT_COPY =
  "Your love and blessings mean the world to us. If you’d like to gift, we’ve gathered a few things that will help us build our happy home together.";

const sketchClass = "object-contain object-center";

function HeroCopy({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="z-10 flex min-w-0 flex-col items-center px-2 py-3 text-center lg:px-2 lg:py-0">
      <HeaderMandala className="h-7 w-7 text-gold" />
      <p className="mt-4 font-ceremony text-[0.68rem] tracking-[0.3em] text-[#5c4033] uppercase">
        {eyebrow}
      </p>
      <h1 className="mt-3 font-ceremony text-[1.85rem] leading-[1.12] text-maroon-deep md:text-[2.35rem] lg:text-[2.65rem]">
        {title}
      </h1>
      <TitleFlourish className="mt-4 text-gold" />
      <p className="mt-5 max-w-xs font-display text-[1.12rem] leading-[1.65] text-[#5c4033]">
        {description}
      </p>
    </div>
  );
}

export function StyleOneHero({
  eyebrow = "Celebrating our forever",
  title = "Our Gift Registry",
  description = DEFAULT_COPY,
  showSketches = true,
}: StyleOneHeroProps) {
  if (!showSketches) {
    return (
      <section className="relative">
        <div className="mx-auto flex max-w-xl flex-col items-center px-6 pb-2 pt-3 text-center sm:px-8 sm:pb-4 sm:pt-6">
          <h1 className="font-ceremony text-[1.7rem] leading-[1.15] text-maroon-deep sm:text-[2.15rem]">
            {title}
          </h1>
          <TitleFlourish className="mt-2 h-3.5 w-[5.5rem] text-gold sm:mt-3 sm:h-auto sm:w-auto" />
          <p className="mt-3 max-w-md font-display text-[0.95rem] leading-relaxed text-[#5c4033] sm:mt-4 sm:text-lg sm:leading-relaxed">
            {description}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-0 flex-1 flex-col overflow-hidden pb-2 pt-1 sm:flex-none sm:pb-4 sm:pt-4">
      {/* Phone: title, sketches tucked under it, then blessing copy */}
      <div className="relative flex min-h-0 flex-1 flex-col sm:hidden">
        <div className="z-10 flex shrink-0 flex-col items-center px-6 pt-1 text-center">
          <HeaderMandala className="h-5 w-5 text-gold" />
          <p className="mt-1.5 font-ceremony text-[0.62rem] tracking-[0.22em] text-[#5c4033] uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-1.5 max-w-[12rem] font-ceremony text-[1.65rem] leading-[1.12] text-maroon-deep">
            {title}
          </h1>
          <TitleFlourish className="mt-1.5 h-3.5 w-[5.5rem] text-gold" />
        </div>

        <div className="relative mt-1 grid shrink-0 grid-cols-2 items-start gap-x-4 px-2">
          <figure
            className="relative aspect-[3/4] w-full max-h-[min(40dvh,19rem)]"
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse 95% 100% at 42% 58%, #000 52%, transparent 80%)",
              maskImage:
                "radial-gradient(ellipse 95% 100% at 42% 58%, #000 52%, transparent 80%)",
            }}
          >
            <Image
              src="/images/tamil-nadu-sketch.png"
              alt="Sepia sketch of a Tamil Nadu temple gopuram with kolam"
              fill
              priority
              unoptimized
              sizes="50vw"
              className="object-contain object-top"
            />
          </figure>
          <figure
            className="relative aspect-[3/4] w-full max-h-[min(40dvh,19rem)]"
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse 95% 100% at 58% 58%, #000 52%, transparent 80%)",
              maskImage:
                "radial-gradient(ellipse 95% 100% at 58% 58%, #000 52%, transparent 80%)",
            }}
          >
            <Image
              src="/images/kerala-sketch.png"
              alt="Sepia sketch of a Kerala houseboat on the backwaters"
              fill
              priority
              unoptimized
              sizes="50vw"
              className="object-contain object-top"
            />
          </figure>
        </div>

        <p className="mx-auto max-w-md shrink-0 px-5 pb-2 pt-2 text-center font-display text-[0.9rem] leading-[1.55] text-[#5c4033]">
          {description}
        </p>
      </div>

      {/* Tablet / laptop — sketches flank the copy */}
      <div className="mx-auto hidden w-full max-w-[92rem] grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,0.9fr)] items-center gap-2 px-3 sm:grid md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)_minmax(0,1.05fr)] lg:grid-cols-[minmax(0,1.2fr)_minmax(15rem,0.85fr)_minmax(0,1.2fr)] lg:gap-1 lg:px-3 xl:px-4">
        <figure className="min-w-0">
          <div className="relative mx-auto aspect-[3/4] w-full bg-transparent lg:min-h-[34rem] xl:min-h-[40rem]">
            <Image
              src="/images/tamil-nadu-sketch.png"
              alt="Sepia sketch of a Tamil Nadu temple gopuram with kolam"
              fill
              sizes="(max-width: 1024px) 32vw, 42vw"
              className={sketchClass}
            />
          </div>
        </figure>

        <HeroCopy eyebrow={eyebrow} title={title} description={description} />

        <figure className="min-w-0">
          <div className="relative mx-auto aspect-[3/4] w-full bg-transparent lg:min-h-[34rem] xl:min-h-[40rem]">
            <Image
              src="/images/kerala-sketch.png"
              alt="Sepia sketch of a Kerala houseboat on the backwaters"
              fill
              sizes="(max-width: 1024px) 32vw, 42vw"
              className={sketchClass}
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
