import { GiftForm } from "@/components/admin/gift-form";
import { requireAdmin } from "@/lib/admin";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit gift",
};

export const dynamic = "force-dynamic";

type EditGiftPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditGiftPage({ params }: EditGiftPageProps) {
  const { id } = await params;
  const { supabase } = await requireAdmin();

  const [{ data: gift }, { data: categories }] = await Promise.all([
    supabase
      .from("gifts")
      .select(
        "id, title, description, category_id, image_path, store_url, sort_order, is_published, is_unlimited, created_at, updated_at",
      )
      .eq("id", id)
      .maybeSingle(),
    supabase
      .from("categories")
      .select("id, slug, name, sort_order")
      .order("sort_order", { ascending: true }),
  ]);

  if (!gift) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/admin"
        className="text-[0.62rem] tracking-[0.18em] text-muted uppercase transition hover:text-maroon-deep"
      >
        ← Back to gifts
      </Link>
      <h1 className="mt-4 font-ceremony text-3xl text-maroon-deep">Edit gift</h1>
      <p className="mt-2 font-display text-base text-[#5a4336]">
        Update details, replace the image, or change publish state.
      </p>
      <div className="mt-8">
        <GiftForm categories={categories ?? []} gift={gift} mode="edit" />
      </div>
    </div>
  );
}
