"use server";

import type { ReserveActionState } from "@/app/reserve/state";
import { createClient } from "@/lib/supabase/server";
import { reserveGiftSchema } from "@/lib/validations";

export async function reserveGiftAction(
  _prev: ReserveActionState,
  formData: FormData,
): Promise<ReserveActionState> {
  const parsed = reserveGiftSchema.safeParse({
    giftId: formData.get("giftId"),
    guestName: formData.get("guestName"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      error: parsed.error.issues[0]?.message ?? "Please enter your name.",
      guestName: null,
    };
  }

  const { giftId, guestName } = parsed.data;
  const supabase = await createClient();

  const { error } = await supabase.rpc("reserve_gift", {
    p_gift_id: giftId,
    p_guest_name: guestName,
  });

  if (error) {
    const message = error.message.toLowerCase();
    if (message.includes("already reserved") || error.code === "23505") {
      return {
        status: "error",
        error: "This gift has already been reserved.",
        guestName: null,
      };
    }
    if (message.includes("not available")) {
      return {
        status: "error",
        error: "This gift is no longer available.",
        guestName: null,
      };
    }
    return {
      status: "error",
      error: "Something went wrong. Please try again.",
      guestName: null,
    };
  }

  // Intentionally do not revalidate here. Refreshing the registry immediately
  // would remount gift cards as "Reserved" and hide the thank-you dialog.
  // The client refreshes when the guest closes the success dialog.

  return {
    status: "success",
    error: null,
    guestName,
  };
}
