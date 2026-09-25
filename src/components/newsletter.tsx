"use client";

import { useState } from "react";
import { CheckIcon, MailIcon } from "@/components/icons";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    setState(res.ok ? "done" : "error");
  };

  return (
    <section className="relative overflow-hidden border-b border-white/8">
      <div className="absolute inset-0 court-lines opacity-60" />
      <div className="absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-brand/30 blur-[120px]" />
      <div className="container-x relative grid items-center gap-8 py-16 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Newsletter</p>
          <h2 className="h-section mt-2">Fique por dentro do jogo.</h2>
          <p className="mt-3 max-w-md text-zinc-400">Receba novidades, notícias, lançamentos e informações sobre os próximos jogos.</p>
        </div>
        {state === "done" ? (
          <div className="flex items-center gap-3 rounded-2xl border border-brand/40 bg-brand/10 p-5 text-white">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-brand"><CheckIcon /></span>
            <div><p className="font-bold">Inscrição confirmada!</p><p className="text-sm text-zinc-300">Você receberá as novidades da Backboard em primeira mão.</p></div>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <MailIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu e-mail" className="input pl-12 py-3.5" />
            </div>
            <button type="submit" disabled={state === "loading"} className="btn-primary py-3.5">{state === "loading" ? "Enviando..." : "Inscrever-se"}</button>
            {state === "error" && <p className="text-sm text-red-400 sm:absolute sm:mt-14">Não foi possível inscrever. Tente novamente.</p>}
          </form>
        )}
      </div>
    </section>
  );
}
