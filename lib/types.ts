export type Category = {
  id: string;
  slug: string;
  name: string;
  sort_order: number;
};

export type Gift = {
  id: string;
  title: string;
  description: string;
  category_id: string;
  image_path: string;
  store_url: string | null;
  sort_order: number;
  is_published: boolean;
  is_unlimited: boolean;
  created_at: string;
  updated_at: string;
};

/** Guest-facing gift row from `gifts_public` */
export type PublicGift = {
  id: string;
  title: string;
  description: string;
  category_id: string;
  category_slug: string;
  category_name: string;
  category_sort_order: number;
  image_path: string;
  store_url: string | null;
  sort_order: number;
  is_unlimited: boolean;
  is_reserved: boolean;
};

export type Reservation = {
  id: string;
  gift_id: string;
  guest_name: string;
  reserved_at: string;
};

export const GIFT_IMAGES_BUCKET = "gift-images";
