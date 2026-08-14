"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

function safeAdminPath(nextPath: string) {
  return nextPath.startsWith("/admin") && !nextPath.startsWith("//")
    ? nextPath
    : "/admin";
}

function loginErrorPath(nextPath: string, error: string) {
  const next = encodeURIComponent(safeAdminPath(nextPath));
  return `/admin/login?next=${next}&error=${error}`;
}

export async function loginAdmin(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const nextPath = String(formData.get("next") ?? "/admin");

  if (!email || !password) {
    redirect(loginErrorPath(nextPath, "required"));
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    redirect(loginErrorPath(nextPath, "invalid"));
  }

  const { data: adminRow } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (!adminRow) {
    await supabase.auth.signOut();
    redirect(loginErrorPath(nextPath, "unauthorized"));
  }

  redirect(safeAdminPath(nextPath));
}

export async function logoutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
