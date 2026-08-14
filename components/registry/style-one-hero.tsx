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
    <section className="relative overflow-hidden pb-2 pt-1 sm:pb-4 sm:pt-4">
      <div className="mx-auto grid w-full max-w-[92rem] grid-cols-[minmax(0,0.62fr)_minmax(0,1.76fr)_minmax(0,0.62fr)] items-center gap-0 px-1.5 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,0.9fr)] sm:gap-2 sm:px-3 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)_minmax(0,1.05fr)] lg:grid-cols-[minmax(0,1.2fr)_minmax(15rem,0.85fr)_minmax(0,1.2fr)] lg:gap-1 lg:px-3 xl:px-4">
        <figure className="min-w-0">
          <div className="relative mx-auto aspect-[3/4] w-full lg:min-h-[34rem] xl:min-h-[40rem]">
            <Image
              src="/images/tamil-nadu-sketch.png"
              alt="Sepia sketch of a Tamil Nadu temple gopuram with kolam"
              fill
              priority
              sizes="(max-width: 640px) 24vw, (max-width: 1024px) 32vw, 42vw"
              className="object-contain object-center"
            />
          </div>
        </figure>

        <div className="z-10 flex min-w-0 flex-col items-center px-1 py-2 text-center sm:px-2 sm:py-3 lg:px-2 lg:py-0">
          <HeaderMandala className="h-4 w-4 text-gold sm:h-7 sm:w-7" />
          <p className="mt-2 font-ceremony text-[0.52rem] tracking-[0.16em] text-[#5c4033] uppercase sm:mt-4 sm:text-[0.68rem] sm:tracking-[0.3em]">
            {eyebrow}
          </p>
          <h1 className="mt-1.5 font-ceremony text-[1.15rem] leading-[1.12] text-maroon-deep sm:mt-3 sm:text-[1.85rem] md:text-[2.35rem] lg:text-[2.65rem]">
            {title}
          </h1>
          <TitleFlourish className="mt-2 h-3 w-[4.5rem] text-gold sm:mt-4 sm:h-[18px] sm:w-[100px]" />
          <p className="mt-2.5 max-w-[16.5rem] font-display text-[0.78rem] leading-[1.45] text-[#5c4033] sm:mt-5 sm:max-w-xs sm:text-[1.12rem] sm:leading-[1.65]">
            {description}
          </p>
        </div>

        <figure className="min-w-0">
          <div className="relative mx-auto aspect-[3/4] w-full lg:min-h-[34rem] xl:min-h-[40rem]">
            <Image
              src="/images/kerala-sketch.png"
              alt="Sepia sketch of a Kerala houseboat on the backwaters"
              fill
              priority
              sizes="(max-width: 640px) 24vw, (max-width: 1024px) 32vw, 42vw"
              className="object-contain object-center"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
