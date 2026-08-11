import { GiftCard } from "@/components/registry/gift-card";
import type { PublicGift } from "@/lib/types";

type GiftGridProps = {
  gifts: PublicGift[];
  activeCategoryName: string;
};

export function GiftGrid({ gifts, activeCategoryName }: GiftGridProps) {
  if (gifts.length === 0) {
    return (
      <div className="border border-dashed border-line px-6 py-20 text-center">
        <p className="font-display text-2xl text-foreground">Nothing here yet</p>
        <p className="mt-3 text-sm text-muted">
          {activeCategoryName === "All"
            ? "Gifts will appear here once they are published."
            : `No published gifts in ${activeCategoryName} right now.`}
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {gifts.map((gift, index) => (
        <li
          key={gift.id}
          className="animate-fade-up"
          style={{ animationDelay: `${Math.min(index, 8) * 60 + 120}ms` }}
        >
          <GiftCard gift={gift} />
        </li>
      ))}
    </ul>
  );
}
