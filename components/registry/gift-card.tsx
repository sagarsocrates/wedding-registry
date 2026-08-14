import { GiftReserveControls } from "@/components/registry/gift-reserve-controls";
import { getGiftImagePublicUrl } from "@/lib/storage";
import type { PublicGift } from "@/lib/types";
import Image from "next/image";

type GiftCardProps = {
  gift: PublicGift;
};

export function GiftCard({ gift }: GiftCardProps) {
  const imageUrl = getGiftImagePublicUrl(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    gift.image_path,
  );

  return (
    <article className="group flex h-full w-full flex-col">
      {/* Parchment matte — same cream field for every gift, regardless of photo bg */}
      <div className="relative border border-gold/40 bg-background p-1.5 sm:p-3">
        <div className="relative aspect-[4/5] overflow-hidden bg-background">
          <Image
            src={imageUrl}
            alt={gift.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain object-center p-1.5 transition-transform duration-700 ease-out group-hover:scale-[1.02] sm:p-4"
          />
          {/* Warm parchment wash so white/blue studio shots share one tone */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[#f7f1e1]/45 mix-blend-multiply"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-3 sm:pt-5">
        <p className="text-[0.5rem] tracking-[0.16em] text-leaf uppercase sm:text-[0.65rem] sm:tracking-[0.2em]">
          {gift.category_name}
        </p>
        <h2 className="mt-1.5 min-h-[calc(2*0.95rem*1.375)] font-ceremony text-[0.95rem] leading-snug text-maroon-deep sm:mt-2 sm:min-h-[calc(2*1.25rem*1.375)] sm:text-xl lg:min-h-[calc(2*1.5rem*1.375)] lg:text-2xl">
          {gift.title}
        </h2>
        <p className="mt-2 min-h-[calc(2*0.8rem*1.5)] flex-1 font-display text-[0.8rem] leading-snug text-[#5a4336] sm:mt-3 sm:min-h-[calc(2*1rem*1.625)] sm:text-base sm:leading-relaxed">
          {gift.description}
        </p>

        {gift.store_url ? (
          <a
            href={gift.store_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 w-fit text-[0.55rem] tracking-[0.14em] text-gold uppercase underline-offset-4 transition hover:text-accent hover:underline sm:mt-4 sm:text-[0.65rem] sm:tracking-[0.16em]"
          >
            View item
          </a>
        ) : null}

        <div className="mt-auto pt-4 sm:pt-6">
          <GiftReserveControls
            giftId={gift.id}
            giftTitle={gift.title}
            isReserved={gift.is_reserved}
          />
        </div>
      </div>
    </article>
  );
}
