import { createClient } from "@/lib/supabase/server";
import type { Category, PublicGift } from "@/lib/types";

export type RegistryData = {
  categories: Category[];
  gifts: PublicGift[];
  error: string | null;
};

export async function getRegistryData(): Promise<RegistryData> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return {
      categories: [],
      gifts: [],
      error: "Registry is not configured yet.",
    };
  }

  const supabase = await createClient();

  const [categoriesResult, giftsResult] = await Promise.all([
    supabase
      .from("categories")
      .select("id, slug, name, sort_order")
      .order("sort_order", { ascending: true }),
    supabase
      .from("gifts_public")
      .select(
        "id, title, description, category_id, category_slug, category_name, category_sort_order, image_path, store_url, sort_order, is_unlimited, is_reserved",
      )
      .order("sort_order", { ascending: true })
      .order("title", { ascending: true }),
  ]);

  if (categoriesResult.error || giftsResult.error) {
    const message =
      categoriesResult.error?.message ||
      giftsResult.error?.message ||
      "Unable to load registry.";
    return { categories: [], gifts: [], error: message };
  }

  return {
    categories: categoriesResult.data ?? [],
    gifts: giftsResult.data ?? [],
    error: null,
  };
}

export function filterGiftsByCategory(
  gifts: PublicGift[],
  categorySlug: string | undefined,
): PublicGift[] {
  if (!categorySlug || categorySlug === "all") {
    return gifts;
  }
  return gifts.filter((gift) => gift.category_slug === categorySlug);
}
