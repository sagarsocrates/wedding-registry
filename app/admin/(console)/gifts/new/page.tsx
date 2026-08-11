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
        className="text-xs tracking-[0.14em] uppercase text-muted hover:text-foreground"
      >
        ← Back
      </Link>
      <h1 className="mt-4 font-display text-3xl text-foreground">Add gift</h1>
      <p className="mt-2 text-sm text-muted">
        Upload an image and publish when you are ready.
      </p>
      <div className="mt-8">
        <GiftForm categories={categories ?? []} mode="create" />
      </div>
    </div>
  );
}
