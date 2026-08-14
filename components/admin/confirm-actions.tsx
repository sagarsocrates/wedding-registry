"use client";

import { cancelReservation, deleteGift } from "@/app/admin/gift-actions";

type DeleteGiftButtonProps = {
  giftId: string;
  giftTitle: string;
};

export function DeleteGiftButton({ giftId, giftTitle }: DeleteGiftButtonProps) {
  return (
    <form
      action={deleteGift}
      onSubmit={(event) => {
        if (
          !window.confirm(
            `Delete “${giftTitle}”? This cannot be undone.`,
          )
        ) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="giftId" value={giftId} />
      <button
        type="submit"
        className="text-[0.62rem] tracking-[0.16em] text-muted uppercase transition hover:text-maroon-deep"
      >
        Delete
      </button>
    </form>
  );
}

type CancelReservationButtonProps = {
  reservationId: string;
  guestName: string;
};

export function CancelReservationButton({
  reservationId,
  guestName,
}: CancelReservationButtonProps) {
  return (
    <form
      action={cancelReservation}
      onSubmit={(event) => {
        if (
          !window.confirm(
            `Cancel reservation for ${guestName}? The gift will become available again if it was a single-reservation item.`,
          )
        ) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="reservationId" value={reservationId} />
      <button
        type="submit"
        className="text-[0.62rem] tracking-[0.16em] text-maroon-deep uppercase transition hover:text-accent"
      >
        Cancel
      </button>
    </form>
  );
}
