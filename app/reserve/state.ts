export type ReserveActionState = {
  status: "idle" | "success" | "error";
  error: string | null;
  guestName: string | null;
};

export const initialReserveState: ReserveActionState = {
  status: "idle",
  error: null,
  guestName: null,
};
