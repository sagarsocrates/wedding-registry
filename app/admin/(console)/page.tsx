import {
  CancelReservationButton,
  DeleteGiftButton,
} from "@/components/admin/confirm-actions";
import { requireAdmin } from "@/lib/admin";
import { getGiftImagePublicUrl } from "@/lib/storage";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const { supabase } = await requireAdmin();

  const [{ data: gifts }, { data: reservations }, { data: categories }] =
    await Promise.all([
      supabase
        .from("gifts")
        .select(
          "id, title, description, category_id, image_path, store_url, sort_order, is_published, is_unlimited, created_at, updated_at",
        )
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false }),
      supabase
        .from("reservations")
        .select("id, gift_id, guest_name, reserved_at")
        .order("reserved_at", { ascending: false }),
      supabase.from("categories").select("id, name, slug"),
    ]);

  const categoryById = new Map(
    (categories ?? []).map((category) => [category.id, category]),
  );
  const giftTitleById = new Map(
    (gifts ?? []).map((gift) => [gift.id, gift.title]),
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-ceremony text-[0.65rem] tracking-[0.28em] text-gold uppercase">
            The collection
          </p>
          <h1 className="mt-2 font-ceremony text-3xl text-maroon-deep">Gifts</h1>
          <p className="mt-2 font-display text-base text-[#5a4336]">
            Add, edit, publish, and manage registry items.
          </p>
        </div>
        <Link
          href="/admin/gifts/new"
          className="border border-gold bg-maroon-deep px-5 py-3 text-[0.65rem] tracking-[0.2em] text-surface uppercase transition hover:bg-accent"
        >
          Add gift
        </Link>
      </div>

      {(gifts ?? []).length === 0 ? (
        <div className="border border-gold/40 px-6 py-16 text-center">
          <p className="font-ceremony text-2xl text-maroon-deep">No gifts yet</p>
          <p className="mt-3 font-display text-base text-[#5a4336]">
            Create your first gift to see it on the public registry.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {(gifts ?? []).map((gift) => {
            const imageUrl = getGiftImagePublicUrl(
              process.env.NEXT_PUBLIC_SUPABASE_URL!,
              gift.image_path,
            );
            const category = categoryById.get(gift.category_id);

            return (
              <li
                key={gift.id}
                className="flex flex-col gap-4 border border-gold/40 bg-surface p-3 sm:flex-row sm:items-center sm:p-4"
              >
                <div className="relative h-28 w-full shrink-0 overflow-hidden border border-gold/30 bg-background sm:h-28 sm:w-24">
                  <Image
                    src={imageUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 96px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-ceremony text-xl text-maroon-deep">
                      {gift.title}
                    </h2>
                    <span className="text-[0.58rem] tracking-[0.16em] text-leaf uppercase">
                      {category?.name ?? "Uncategorized"}
                    </span>
                    {gift.is_published ? (
                      <span className="border border-gold/50 bg-gold-soft/30 px-2 py-0.5 text-[0.58rem] tracking-[0.14em] text-maroon-deep uppercase">
                        Published
                      </span>
                    ) : (
                      <span className="border border-line px-2 py-0.5 text-[0.58rem] tracking-[0.14em] text-muted uppercase">
                        Draft
                      </span>
                    )}
                    {gift.is_unlimited ? (
                      <span className="text-[0.58rem] tracking-[0.14em] text-muted uppercase">
                        Unlimited
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 line-clamp-2 font-display text-sm text-[#5a4336]">
                    {gift.description}
                  </p>
                  <p className="mt-2 text-[0.65rem] tracking-[0.12em] text-muted uppercase">
                    Sort {gift.sort_order}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <Link
                    href={`/admin/gifts/${gift.id}/edit`}
                    className="text-[0.62rem] tracking-[0.16em] text-maroon-deep uppercase transition hover:text-accent"
                  >
                    Edit
                  </Link>
                  <DeleteGiftButton giftId={gift.id} giftTitle={gift.title} />
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <section className="space-y-4">
        <div>
          <p className="font-ceremony text-[0.65rem] tracking-[0.28em] text-gold uppercase">
            Guests
          </p>
          <h2 className="mt-2 font-ceremony text-2xl text-maroon-deep">
            Reservations
          </h2>
        </div>
        {(reservations ?? []).length === 0 ? (
          <p className="font-display text-base text-[#5a4336]">
            No reservations yet.
          </p>
        ) : (
          <ul className="divide-y divide-gold/30 border border-gold/40 bg-surface">
            {(reservations ?? []).map((reservation) => (
              <li
                key={reservation.id}
                className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-ceremony text-base text-maroon-deep">
                    {reservation.guest_name}
                  </p>
                  <p className="mt-1 font-display text-sm text-[#5a4336]">
                    {giftTitleById.get(reservation.gift_id) ?? "Unknown gift"} ·{" "}
                    {new Date(reservation.reserved_at).toLocaleString()}
                  </p>
                </div>
                <CancelReservationButton
                  reservationId={reservation.id}
                  guestName={reservation.guest_name}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
