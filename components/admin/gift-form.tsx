"use client";

import {
  createGift,
  updateGift,
  type GiftActionState,
} from "@/app/admin/gift-actions";
import type { Category, Gift } from "@/lib/types";
import { getGiftImagePublicUrl } from "@/lib/storage";
import Image from "next/image";
import { useActionState, useMemo, useState } from "react";

const initialState: GiftActionState = { error: null };

const fieldClass =
  "mt-2 w-full border border-gold/45 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-gold";

type GiftFormProps = {
  categories: Category[];
  gift?: Gift;
  mode: "create" | "edit";
};

export function GiftForm({ categories, gift, mode }: GiftFormProps) {
  const action = mode === "create" ? createGift : updateGift;
  const [state, formAction, pending] = useActionState(action, initialState);
  const [categoryId, setCategoryId] = useState(
    gift?.category_id ?? categories[0]?.id ?? "",
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const selectedCategory = categories.find((c) => c.id === categoryId);
  const isGiftCards = selectedCategory?.slug === "gift-cards";

  const existingImageUrl = useMemo(() => {
    if (!gift?.image_path || !process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
    return getGiftImagePublicUrl(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      gift.image_path,
    );
  }, [gift?.image_path]);

  const displayPreview = previewUrl || existingImageUrl;

  return (
    <form action={formAction} className="mx-auto max-w-xl space-y-6">
      {gift ? <input type="hidden" name="giftId" value={gift.id} /> : null}
      <input
        type="hidden"
        name="isUnlimited"
        value={isGiftCards ? "on" : ""}
      />

      <label className="block">
        <span className="text-xs tracking-[0.14em] uppercase text-muted">
          Title
        </span>
        <input
          name="title"
          required
          defaultValue={gift?.title ?? ""}
          className={fieldClass}
        />
      </label>

      <label className="block">
        <span className="text-xs tracking-[0.14em] uppercase text-muted">
          Description
        </span>
        <textarea
          name="description"
          required
          rows={4}
          defaultValue={gift?.description ?? ""}
          className={fieldClass}
        />
      </label>

      <label className="block">
        <span className="text-xs tracking-[0.14em] uppercase text-muted">
          Category
        </span>
        <select
          name="categoryId"
          required
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          className={fieldClass}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      {isGiftCards ? (
        <p className="border border-gold/40 bg-gold-soft/20 px-4 py-3 font-display text-sm text-[#5a4336]">
          Gift Cards gifts are unlimited — multiple guests can reserve this
          item. Only one Gift Cards gift should exist.
        </p>
      ) : null}

      <label className="block">
        <span className="text-xs tracking-[0.14em] uppercase text-muted">
          Image {mode === "create" ? "(required)" : "(optional replace)"}
        </span>
        <input
          type="file"
          name="image"
          accept="image/jpeg,image/png,image/webp,image/gif"
          required={mode === "create"}
          className="mt-2 block w-full text-sm text-muted file:mr-4 file:border file:border-gold/45 file:bg-surface file:px-3 file:py-2 file:text-[0.62rem] file:tracking-[0.14em] file:uppercase file:text-maroon-deep"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) {
              setPreviewUrl(null);
              return;
            }
            setPreviewUrl(URL.createObjectURL(file));
          }}
        />
      </label>

      {displayPreview ? (
        <div className="relative aspect-[4/5] max-w-xs overflow-hidden border border-gold/40 bg-background">
          <Image
            src={displayPreview}
            alt="Gift preview"
            fill
            unoptimized={Boolean(previewUrl)}
            className="object-cover"
            sizes="320px"
          />
        </div>
      ) : null}

      <label className="block">
        <span className="text-xs tracking-[0.14em] uppercase text-muted">
          Purchase / store URL (optional)
        </span>
        <input
          name="storeUrl"
          type="url"
          placeholder="https://"
          defaultValue={gift?.store_url ?? ""}
          className={fieldClass}
        />
      </label>

      <label className="block">
        <span className="text-xs tracking-[0.14em] uppercase text-muted">
          Sort order
        </span>
        <input
          name="sortOrder"
          type="number"
          required
          defaultValue={gift?.sort_order ?? 0}
          className={fieldClass}
        />
      </label>

      <label className="flex items-center gap-3 text-sm text-foreground">
        <input
          type="checkbox"
          name="isPublished"
          defaultChecked={gift?.is_published ?? false}
          className="size-4 accent-maroon-deep"
        />
        Published (visible on /registry)
      </label>

      {state.error ? (
        <p className="text-sm text-accent" role="alert">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full border border-gold bg-maroon-deep px-5 py-3 text-[0.65rem] tracking-[0.2em] text-surface uppercase transition hover:bg-accent disabled:opacity-60"
      >
        {pending
          ? mode === "create"
            ? "Creating…"
            : "Saving…"
          : mode === "create"
            ? "Create gift"
            : "Save changes"}
      </button>
    </form>
  );
}
