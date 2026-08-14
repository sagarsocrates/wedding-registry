"use client";

import { reserveGiftAction } from "@/app/reserve/actions";
import { initialReserveState } from "@/app/reserve/state";
import { FloralDivider } from "@/components/wedding/ornaments";
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

  const showReservedBadge = isReserved && !open;

  return (
    <>
      {showReservedBadge ? (
        <p className="border border-gold/55 bg-gold-soft/25 px-3 py-2 text-center text-[0.55rem] tracking-[0.16em] text-muted uppercase sm:px-5 sm:py-3 sm:text-[0.65rem] sm:tracking-[0.2em]">
          Reserved
        </p>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full border border-gold bg-maroon-deep px-3 py-2 text-[0.55rem] tracking-[0.16em] text-surface uppercase transition duration-300 hover:bg-accent sm:px-5 sm:py-3 sm:text-[0.65rem] sm:tracking-[0.2em]"
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
        className="absolute inset-0 bg-maroon-deep/75 backdrop-blur-[3px] transition"
        onClick={() => {
          if (!pending) onClose();
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="wedding-frame relative z-10 w-full max-w-md animate-fade-up bg-surface px-6 py-8 sm:px-8"
      >
        {showSuccess ? (
          <div className="text-center">
            <FloralDivider />
            <p
              id={titleId}
              className="mt-6 font-ceremony text-2xl leading-snug text-maroon-deep sm:text-3xl"
            >
              Thank you, {state.guestName}
            </p>
            <p className="mt-2 text-2xl text-accent" aria-hidden>
              ❤️
            </p>
            <p className="mt-4 font-display text-lg text-muted">
              This gift has been reserved.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 w-full border border-gold bg-accent px-5 py-3 text-[0.65rem] tracking-[0.22em] text-surface uppercase transition hover:bg-maroon-deep"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="text-center font-ceremony text-[0.65rem] tracking-[0.28em] text-accent uppercase">
              Reserve a gift
            </p>
            <h2
              id={titleId}
              className="mt-3 text-center font-ceremony text-2xl leading-snug text-maroon-deep sm:text-3xl"
            >
              {giftTitle}
            </h2>
            <FloralDivider className="mt-5" />
            <p className="mt-5 text-center text-sm leading-relaxed text-muted">
              Enter your name to reserve this gift for Sagar &amp; Krithika.
            </p>

            <form action={formAction} className="mt-8 space-y-5">
              <input type="hidden" name="giftId" value={giftId} />
              <label className="block">
                <span className="text-[0.65rem] tracking-[0.18em] text-muted uppercase">
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
                  className="mt-2 w-full border border-gold/55 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-gold disabled:opacity-60"
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
                  className="flex-1 border border-gold bg-accent px-5 py-3 text-[0.65rem] tracking-[0.22em] text-surface uppercase transition hover:bg-maroon-deep disabled:opacity-60"
                >
                  {pending ? "Reserving…" : "Confirm reservation"}
                </button>
                <button
                  type="button"
                  disabled={pending}
                  onClick={onClose}
                  className="flex-1 border border-gold/55 bg-background px-5 py-3 text-[0.65rem] tracking-[0.22em] text-maroon-deep uppercase transition hover:border-gold hover:bg-gold-soft/30 disabled:opacity-60"
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
