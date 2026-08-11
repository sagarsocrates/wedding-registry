"use server";

import { requireAdmin } from "@/lib/admin";
import { buildGiftImagePath } from "@/lib/storage";
import { giftFormSchema } from "@/lib/validations";
import { GIFT_IMAGES_BUCKET } from "@/lib/types";
import type { SupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAX_BYTES = 5 * 1024 * 1024;

export type GiftActionState = {
  error: string | null;
};

function parseGiftFields(formData: FormData) {
  const storeUrlRaw = String(formData.get("storeUrl") ?? "").trim();
  return giftFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    categoryId: formData.get("categoryId"),
    storeUrl: storeUrlRaw,
    sortOrder: formData.get("sortOrder"),
    isPublished: formData.get("isPublished") === "on",
    isUnlimited: formData.get("isUnlimited") === "on",
  });
}

async function resolveUnlimitedFlag(
  supabase: SupabaseClient,
  categoryId: string,
) {
  const { data: category } = await supabase
    .from("categories")
    .select("slug")
    .eq("id", categoryId)
    .maybeSingle();

  // Gift Cards category is always unlimited; all others are single-reservation.
  return category?.slug === "gift-cards";
}

async function uploadGiftImage(
  supabase: SupabaseClient,
  giftId: string,
  file: File,
) {
  if (!ALLOWED_TYPES.has(file.type)) {
    return { error: "Use a JPG, PNG, WebP, or GIF image.", path: null };
  }
  if (file.size > MAX_BYTES) {
    return { error: "Image must be 5MB or smaller.", path: null };
  }

  const path = buildGiftImagePath(giftId, file.name);
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await supabase.storage
    .from(GIFT_IMAGES_BUCKET)
    .upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return { error: error.message || "Image upload failed.", path: null };
  }

  return { error: null, path };
}

export async function createGift(
  _prev: GiftActionState,
  formData: FormData,
): Promise<GiftActionState> {
  const { supabase } = await requireAdmin();
  const parsed = parseGiftFields(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid gift details." };
  }

  const image = formData.get("image");
  if (!(image instanceof File) || image.size === 0) {
    return { error: "An image is required." };
  }

  const isUnlimited = await resolveUnlimitedFlag(
    supabase,
    parsed.data.categoryId,
  );

  const giftId = crypto.randomUUID();
  const upload = await uploadGiftImage(supabase, giftId, image);
  if (upload.error || !upload.path) {
    return { error: upload.error ?? "Image upload failed." };
  }

  const { error } = await supabase.from("gifts").insert({
    id: giftId,
    title: parsed.data.title,
    description: parsed.data.description,
    category_id: parsed.data.categoryId,
    image_path: upload.path,
    store_url: parsed.data.storeUrl || null,
    sort_order: parsed.data.sortOrder,
    is_published: parsed.data.isPublished,
    is_unlimited: isUnlimited,
  });

  if (error) {
    await supabase.storage.from(GIFT_IMAGES_BUCKET).remove([upload.path]);
    if (
      error.code === "23505" ||
      error.message.toLowerCase().includes("gifts_one_unlimited")
    ) {
      return {
        error: "Only one Gift Cards (unlimited) gift is allowed.",
      };
    }
    return { error: error.message || "Could not create gift." };
  }

  revalidatePath("/admin");
  revalidatePath("/registry");
  redirect("/admin");
}

export async function updateGift(
  _prev: GiftActionState,
  formData: FormData,
): Promise<GiftActionState> {
  const { supabase } = await requireAdmin();
  const giftId = String(formData.get("giftId") ?? "");
  if (!giftId) {
    return { error: "Missing gift id." };
  }

  const parsed = parseGiftFields(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid gift details." };
  }

  const { data: existing, error: existingError } = await supabase
    .from("gifts")
    .select("id, image_path")
    .eq("id", giftId)
    .maybeSingle();

  if (existingError || !existing) {
    return { error: "Gift not found." };
  }

  const isUnlimited = await resolveUnlimitedFlag(
    supabase,
    parsed.data.categoryId,
  );

  let imagePath = existing.image_path;
  const image = formData.get("image");
  const hasNewImage = image instanceof File && image.size > 0;

  if (hasNewImage) {
    const upload = await uploadGiftImage(supabase, giftId, image);
    if (upload.error || !upload.path) {
      return { error: upload.error ?? "Image upload failed." };
    }
    imagePath = upload.path;
  }

  const { error } = await supabase
    .from("gifts")
    .update({
      title: parsed.data.title,
      description: parsed.data.description,
      category_id: parsed.data.categoryId,
      image_path: imagePath,
      store_url: parsed.data.storeUrl || null,
      sort_order: parsed.data.sortOrder,
      is_published: parsed.data.isPublished,
      is_unlimited: isUnlimited,
    })
    .eq("id", giftId);

  if (error) {
    if (hasNewImage && imagePath !== existing.image_path) {
      await supabase.storage.from(GIFT_IMAGES_BUCKET).remove([imagePath]);
    }
    if (
      error.code === "23505" ||
      error.message.toLowerCase().includes("gifts_one_unlimited")
    ) {
      return {
        error: "Only one Gift Cards (unlimited) gift is allowed.",
      };
    }
    return { error: error.message || "Could not update gift." };
  }

  if (hasNewImage && existing.image_path && existing.image_path !== imagePath) {
    await supabase.storage
      .from(GIFT_IMAGES_BUCKET)
      .remove([existing.image_path]);
  }

  revalidatePath("/admin");
  revalidatePath("/registry");
  redirect("/admin");
}

export async function deleteGift(formData: FormData) {
  const { supabase } = await requireAdmin();
  const giftId = String(formData.get("giftId") ?? "");
  if (!giftId) return;

  const { data: existing } = await supabase
    .from("gifts")
    .select("image_path")
    .eq("id", giftId)
    .maybeSingle();

  await supabase.from("gifts").delete().eq("id", giftId);

  if (existing?.image_path) {
    await supabase.storage
      .from(GIFT_IMAGES_BUCKET)
      .remove([existing.image_path]);
  }

  revalidatePath("/admin");
  revalidatePath("/registry");
}

export async function cancelReservation(formData: FormData) {
  const { supabase } = await requireAdmin();
  const reservationId = String(formData.get("reservationId") ?? "");
  if (!reservationId) return;

  await supabase.from("reservations").delete().eq("id", reservationId);

  revalidatePath("/admin");
  revalidatePath("/registry");
}
