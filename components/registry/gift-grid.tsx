import { GiftCard } from "@/components/registry/gift-card";
import type { PublicGift } from "@/lib/types";

type GiftGridProps = {
  gifts: PublicGift[];
  activeCategoryName: string;
};

export function GiftGrid({ gifts, activeCategoryName }: GiftGridProps) {
  if (gifts.length === 0) {
    return (
      <div className="border border-gold/40 px-6 py-20 text-center">
        <p className="font-ceremony text-2xl text-maroon-deep">
          Nothing here yet
        </p>
        <p className="mt-3 font-display text-base text-[#5a4336]">
          {activeCategoryName === "All"
            ? "Gifts will appear here once they are published."
            : `No published gifts in ${activeCategoryName} right now.`}
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 items-stretch gap-x-3 gap-y-8 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
      {gifts.map((gift, index) => (
        <li
          key={gift.id}
          className="flex h-full animate-fade-up"
          style={{ animationDelay: `${Math.min(index, 8) * 60 + 120}ms` }}
        >
          <GiftCard gift={gift} />
        </li>
      ))}
    </ul>
  );
}
