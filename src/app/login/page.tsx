"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/icons";

function LoginForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/perfil";
  const [mode, setMode] = useState<"login" | "register">(sp.get("modo") === "cadastro" ? "register" : "login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch(`/api/auth/${mode}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setLoading(false);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error || "Algo deu errado.");
      return;
    }
    router.push(next);
    router.refresh();
  };

  return (
    <div className="card w-full max-w-md p-8">
      <Logo />
      <h1 className="mt-6 text-2xl font-black text-white">{mode === "login" ? "Bem-vindo de volta" : "Crie sua conta"}</h1>
      <p className="mt-1 text-sm text-zinc-400">{mode === "login" ? "Entre para acompanhar pedidos, favoritos e novidades." : "Junte-se à comunidade Backboard."}</p>

      <div className="mt-6 grid grid-cols-2 rounded-lg bg-white/5 p-1 text-sm font-semibold">
        <button type="button" onClick={() => setMode("login")} className={`rounded-md py-2 transition ${mode === "login" ? "bg-brand text-white" : "text-zinc-400"}`}>Entrar</button>
        <button type="button" onClick={() => setMode("register")} className={`rounded-md py-2 transition ${mode === "register" ? "bg-brand text-white" : "text-zinc-400"}`}>Cadastrar</button>
      </div>

      <form onSubmit={submit} className="mt-6 space-y-4">
        {mode === "register" && <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome completo" className="input" />}
        <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="E-mail" className="input" />
        <input type="password" required minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Senha" className="input" />
        {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full py-3.5">{loading ? "Aguarde..." : mode === "login" ? "Entrar" : "Criar conta"}</button>
      </form>
      <p className="mt-6 text-center text-xs text-zinc-500">Ao continuar você concorda com os <Link href="/termos" className="text-brand-light">Termos de uso</Link>.</p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24 pb-12">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/arena.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/80 to-ink" />
      <div className="relative w-full flex justify-center animate-rise">
        <Suspense><LoginForm /></Suspense>
      </div>
    </div>
  );
}
