import Image from "next/image";
import {
  HeaderMandala,
  TitleFlourish,
} from "@/components/wedding/mockup-ornaments";

type StyleOneHeroProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

const DEFAULT_COPY =
  "Your love and blessings mean the world to us. If you’d like to gift, we’ve gathered a few things that will help us build our happy home together.";

export function StyleOneHero({
  eyebrow = "Celebrating our forever",
  title = "Our Gift Registry",
  description = DEFAULT_COPY,
}: StyleOneHeroProps) {
  return (
    <section className="relative flex min-h-0 flex-1 flex-col justify-center overflow-hidden py-2 sm:py-4">
      {/* Mobile: sketches overlay the sides so they can be as tall as the invitation. */}
      <figure className="pointer-events-none absolute inset-y-0 left-0 z-0 w-[46%] sm:hidden">
        <Image
          src="/images/tamil-nadu-sketch.png"
          alt="Sepia sketch of a Tamil Nadu temple gopuram with kolam"
          fill
          priority
          sizes="46vw"
          className="object-contain object-left"
        />
      </figure>
      <figure className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[46%] sm:hidden">
        <Image
          src="/images/kerala-sketch.png"
          alt="Sepia sketch of a Kerala houseboat on the backwaters"
          fill
          priority
          sizes="46vw"
          className="object-contain object-right"
        />
      </figure>

      <div className="relative z-10 mx-auto grid w-full max-w-[92rem] items-center gap-0 px-2 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,0.9fr)] sm:gap-2 sm:px-3 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)_minmax(0,1.05fr)] lg:grid-cols-[minmax(0,1.2fr)_minmax(15rem,0.85fr)_minmax(0,1.2fr)] lg:gap-1 lg:px-3 xl:px-4">
        <figure className="hidden min-w-0 sm:block">
          <div className="relative mx-auto aspect-[3/4] w-full lg:min-h-[34rem] xl:min-h-[40rem]">
            <Image
              src="/images/tamil-nadu-sketch.png"
              alt="Sepia sketch of a Tamil Nadu temple gopuram with kolam"
              fill
              priority
              sizes="(max-width: 1024px) 32vw, 42vw"
              className="object-contain object-center"
            />
          </div>
        </figure>

        <div className="mx-auto flex min-w-0 max-w-[13.5rem] flex-col items-center px-2 py-3 text-center sm:max-w-none sm:px-2 sm:py-3 lg:px-2 lg:py-0">
          <HeaderMandala className="h-5 w-5 text-gold sm:h-7 sm:w-7" />
          <p className="mt-3 font-ceremony text-[0.62rem] tracking-[0.22em] text-[#5c4033] uppercase sm:mt-4 sm:text-[0.68rem] sm:tracking-[0.3em]">
            {eyebrow}
          </p>
          <h1 className="mt-2 font-ceremony text-[1.55rem] leading-[1.12] text-maroon-deep sm:mt-3 sm:text-[1.85rem] md:text-[2.35rem] lg:text-[2.65rem]">
            {title}
          </h1>
          <TitleFlourish className="mt-3 h-3.5 w-[5.5rem] text-gold sm:mt-4 sm:h-[18px] sm:w-[100px]" />
          <p className="mt-3 font-display text-[0.92rem] leading-[1.5] text-[#5c4033] sm:mt-5 sm:max-w-xs sm:text-[1.12rem] sm:leading-[1.65]">
            {description}
          </p>
        </div>

        <figure className="hidden min-w-0 sm:block">
          <div className="relative mx-auto aspect-[3/4] w-full lg:min-h-[34rem] xl:min-h-[40rem]">
            <Image
              src="/images/kerala-sketch.png"
              alt="Sepia sketch of a Kerala houseboat on the backwaters"
              fill
              priority
              sizes="(max-width: 1024px) 32vw, 42vw"
              className="object-contain object-center"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
