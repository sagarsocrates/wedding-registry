"use client";

import { loginAdmin } from "@/app/admin/actions";
import { useFormStatus } from "react-dom";

type LoginFormProps = {
  nextPath: string;
  errorFromQuery?: string | null;
};

const fieldClass =
  "mt-2 w-full border border-gold/45 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-gold";

const ERRORS: Record<string, string> = {
  unauthorized: "This account is not authorized for admin access.",
  invalid: "Invalid email or password.",
  required: "Email and password are required.",
};

function SignInButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full border border-gold bg-maroon-deep px-5 py-3 text-[0.65rem] tracking-[0.2em] text-surface uppercase transition hover:bg-accent disabled:opacity-60"
    >
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export function LoginForm({ nextPath, errorFromQuery }: LoginFormProps) {
  const error = errorFromQuery ? (ERRORS[errorFromQuery] ?? null) : null;

  return (
    <form action={loginAdmin} className="mt-8 space-y-5 text-left">
      <input type="hidden" name="next" value={nextPath} />

      <label className="block">
        <span className="text-[0.65rem] tracking-[0.18em] text-muted uppercase">
          Email
        </span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className={fieldClass}
        />
      </label>

      <label className="block">
        <span className="text-[0.65rem] tracking-[0.18em] text-muted uppercase">
          Password
        </span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className={fieldClass}
        />
      </label>

      {error ? (
        <p className="text-sm text-accent" role="alert">
          {error}
        </p>
      ) : null}

      <SignInButton />
    </form>
  );
}
