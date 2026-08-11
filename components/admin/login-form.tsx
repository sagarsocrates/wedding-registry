"use client";

import { loginAdmin, type AuthActionState } from "@/app/admin/actions";
import { useActionState } from "react";

const initialState: AuthActionState = { error: null };

type LoginFormProps = {
  nextPath: string;
  errorFromQuery?: string | null;
};

export function LoginForm({ nextPath, errorFromQuery }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(loginAdmin, initialState);
  const error =
    state.error ||
    (errorFromQuery === "unauthorized"
      ? "This account is not authorized for admin access."
      : null);

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <input type="hidden" name="next" value={nextPath} />

      <label className="block">
        <span className="text-xs tracking-[0.14em] uppercase text-muted">
          Email
        </span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className="mt-2 w-full border border-line bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-foreground/30"
        />
      </label>

      <label className="block">
        <span className="text-xs tracking-[0.14em] uppercase text-muted">
          Password
        </span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="mt-2 w-full border border-line bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-foreground/30"
        />
      </label>

      {error ? (
        <p className="text-sm text-accent" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full border border-foreground/25 bg-foreground px-5 py-3 text-xs tracking-[0.2em] uppercase text-surface transition hover:bg-foreground/90 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
