"use client";

import { reserveGiftAction } from "@/app/reserve/actions";
import { initialReserveState } from "@/app/reserve/state";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

type GiftReserveControlsProps = {
  giftId: string;
  giftTitle: string;
  isReserved: boolean;
};

export function GiftReserveControls({
  giftId,
  giftTitle,
  isReserved,
}: GiftReserveControlsProps) {
  const [open, setOpen] = useState(false);
  const [reservationSucceeded, setReservationSucceeded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleClose() {
    const shouldRefresh = reservationSucceeded || isReserved;
    setOpen(false);
    setReservationSucceeded(false);
    if (shouldRefresh) {
      router.refresh();
    }
  }

  // While the thank-you dialog is open, keep the Reserve button area stable
  // even if the server marks the gift reserved after revalidatePath.
  const showReservedBadge = isReserved && !open;

  return (
    <>
      {showReservedBadge ? (
        <p className="border border-line bg-surface/80 px-5 py-3 text-center text-xs tracking-[0.2em] uppercase text-muted">
          Reserved
        </p>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full border border-foreground/25 bg-foreground px-5 py-3 text-xs tracking-[0.2em] uppercase text-surface transition duration-300 hover:bg-foreground/90"
        >
          Reserve
        </button>
      )}

      {mounted && open
        ? createPortal(
            <ReserveDialog
              giftId={giftId}
              giftTitle={giftTitle}
              onReserved={() => setReservationSucceeded(true)}
              onClose={handleClose}
            />,
            document.body,
          )
        : null}
    </>
  );
}

type ReserveDialogProps = {
  giftId: string;
  giftTitle: string;
  onReserved: () => void;
  onClose: () => void;
};

function ReserveDialog({
  giftId,
  giftTitle,
  onReserved,
  onClose,
}: ReserveDialogProps) {
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const reservedNotified = useRef(false);
  const [state, formAction, pending] = useActionState(
    reserveGiftAction,
    initialReserveState,
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => {
      if (state.status !== "success") inputRef.current?.focus();
    }, 50);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(timer);
    };
  }, [state.status]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !pending) {
        onClose();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, pending]);

  useEffect(() => {
    if (state.status === "success" && !reservedNotified.current) {
      reservedNotified.current = true;
      onReserved();
    }
  }, [state.status, onReserved]);

  const showSuccess = state.status === "success" && Boolean(state.guestName);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-foreground/35 backdrop-blur-[2px] transition"
        onClick={() => {
          if (!pending) onClose();
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-md animate-fade-up border border-line bg-surface px-6 py-8 shadow-[0_24px_80px_rgba(44,38,34,0.18)] sm:px-8"
      >
        {showSuccess ? (
          <div className="text-center">
            <p
              id={titleId}
              className="font-display text-3xl leading-snug text-foreground"
            >
              Thank you, {state.guestName} ❤️
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              This gift has been reserved.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 w-full border border-foreground/25 bg-foreground px-5 py-3 text-xs tracking-[0.2em] uppercase text-surface transition hover:bg-foreground/90"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="text-[0.7rem] tracking-[0.18em] uppercase text-accent">
              Reserve a gift
            </p>
            <h2
              id={titleId}
              className="mt-3 font-display text-3xl leading-snug text-foreground"
            >
              {giftTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Enter your name to reserve this gift for Sagar &amp; Krithika.
            </p>

            <form action={formAction} className="mt-8 space-y-5">
              <input type="hidden" name="giftId" value={giftId} />
              <label className="block">
                <span className="text-xs tracking-[0.14em] uppercase text-muted">
                  Your name
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  name="guestName"
                  required
                  maxLength={80}
                  autoComplete="name"
                  disabled={pending}
                  className="mt-2 w-full border border-line bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-foreground/30 disabled:opacity-60"
                />
              </label>

              {state.status === "error" && state.error ? (
                <p className="text-sm text-accent" role="alert">
                  {state.error}
                </p>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row-reverse">
                <button
                  type="submit"
                  disabled={pending}
                  className="flex-1 border border-foreground/25 bg-foreground px-5 py-3 text-xs tracking-[0.2em] uppercase text-surface transition hover:bg-foreground/90 disabled:opacity-60"
                >
                  {pending ? "Reserving…" : "Confirm reservation"}
                </button>
                <button
                  type="button"
                  disabled={pending}
                  onClick={onClose}
                  className="flex-1 border border-line px-5 py-3 text-xs tracking-[0.2em] uppercase text-muted transition hover:border-foreground/20 hover:text-foreground disabled:opacity-60"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
