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
          <h1 className="font-display text-3xl text-foreground">Gifts</h1>
          <p className="mt-2 text-sm text-muted">
            Add, edit, publish, and manage registry items.
          </p>
        </div>
        <Link
          href="/admin/gifts/new"
          className="border border-foreground/25 bg-foreground px-5 py-3 text-xs tracking-[0.2em] uppercase text-surface transition hover:bg-foreground/90"
        >
          Add gift
        </Link>
      </div>

      {(gifts ?? []).length === 0 ? (
        <div className="border border-dashed border-line px-6 py-16 text-center">
          <p className="font-display text-2xl text-foreground">No gifts yet</p>
          <p className="mt-3 text-sm text-muted">
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
                className="flex flex-col gap-4 border border-line bg-surface p-4 sm:flex-row sm:items-center"
              >
                <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-line/50 sm:h-28 sm:w-24">
                  <Image
                    src={imageUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-xl text-foreground">
                      {gift.title}
                    </h2>
                    <span className="text-[0.65rem] tracking-[0.14em] uppercase text-muted">
                      {category?.name ?? "Uncategorized"}
                    </span>
                    {gift.is_published ? (
                      <span className="text-[0.65rem] tracking-[0.14em] uppercase text-accent">
                        Published
                      </span>
                    ) : (
                      <span className="text-[0.65rem] tracking-[0.14em] uppercase text-muted">
                        Draft
                      </span>
                    )}
                    {gift.is_unlimited ? (
                      <span className="text-[0.65rem] tracking-[0.14em] uppercase text-muted">
                        Unlimited
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-muted">
                    {gift.description}
                  </p>
                  <p className="mt-2 text-xs text-muted">
                    Sort order: {gift.sort_order}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <Link
                    href={`/admin/gifts/${gift.id}/edit`}
                    className="text-xs tracking-[0.14em] uppercase text-accent hover:underline"
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
        <h2 className="font-display text-2xl text-foreground">Reservations</h2>
        {(reservations ?? []).length === 0 ? (
          <p className="text-sm text-muted">No reservations yet.</p>
        ) : (
          <ul className="divide-y divide-line border border-line bg-surface">
            {(reservations ?? []).map((reservation) => (
              <li
                key={reservation.id}
                className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm text-foreground">
                    {reservation.guest_name}
                  </p>
                  <p className="mt-1 text-xs text-muted">
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
