import { GiftForm } from "@/components/admin/gift-form";
import { requireAdmin } from "@/lib/admin";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Add gift",
};

export const dynamic = "force-dynamic";

export default async function NewGiftPage() {
  const { supabase } = await requireAdmin();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, slug, name, sort_order")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <Link
        href="/admin"
        className="text-[0.62rem] tracking-[0.18em] text-muted uppercase transition hover:text-maroon-deep"
      >
        ← Back to gifts
      </Link>
      <h1 className="mt-4 font-ceremony text-3xl text-maroon-deep">Add gift</h1>
      <p className="mt-2 font-display text-base text-[#5a4336]">
        Upload an image and publish when you are ready.
      </p>
      <div className="mt-8">
        <GiftForm categories={categories ?? []} mode="create" />
      </div>
    </div>
  );
}
