import { z } from "zod";

export const reserveGiftSchema = z.object({
  giftId: z.string().uuid(),
  guestName: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(80, "Name must be 80 characters or fewer"),
});

export const giftFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(120),
  description: z.string().trim().min(1, "Description is required").max(1000),
  categoryId: z.string().uuid(),
  storeUrl: z.union([
    z.literal(""),
    z.string().trim().url("Enter a valid URL"),
  ]),
  sortOrder: z.coerce.number().int(),
  isPublished: z.boolean(),
  isUnlimited: z.boolean(),
});

export type ReserveGiftInput = z.infer<typeof reserveGiftSchema>;
export type GiftFormInput = z.infer<typeof giftFormSchema>;
