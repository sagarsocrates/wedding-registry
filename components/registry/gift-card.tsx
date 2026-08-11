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
    <article className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-line/60">
        <Image
          src={imageUrl}
          alt={gift.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <p className="text-[0.7rem] tracking-[0.18em] uppercase text-muted">
          {gift.category_name}
        </p>
        <h2 className="mt-2 font-display text-2xl leading-snug text-foreground">
          {gift.title}
        </h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {gift.description}
        </p>

        {gift.store_url ? (
          <a
            href={gift.store_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-fit text-xs tracking-[0.12em] uppercase text-accent underline-offset-4 transition hover:underline"
          >
            View item
          </a>
        ) : null}

        <div className="mt-6">
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
