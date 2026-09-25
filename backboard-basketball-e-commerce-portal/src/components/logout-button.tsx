"use client";

import { useRouter } from "next/navigation";
import { LogoutIcon } from "@/components/icons";

export function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => { await fetch("/api/auth/logout", { method: "POST" }); router.push("/"); router.refresh(); }}
      className="btn-ghost py-2 text-xs"
    >
      <LogoutIcon width={16} height={16} /> Sair da conta
    </button>
  );
}
