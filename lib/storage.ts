import { GIFT_IMAGES_BUCKET } from "@/lib/types";

export function getGiftImagePublicUrl(
  supabaseUrl: string,
  imagePath: string,
): string {
  const base = supabaseUrl.replace(/\/$/, "");
  const path = imagePath.replace(/^\//, "");
  return `${base}/storage/v1/object/public/${GIFT_IMAGES_BUCKET}/${path}`;
}

export function buildGiftImagePath(giftId: string, fileName: string): string {
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const unique = crypto.randomUUID();
  return `gifts/${giftId}/${unique}-${safeName}`;
}
