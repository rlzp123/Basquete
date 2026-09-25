"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/icons";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "Dúvida sobre pedido", message: "" });
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [k]: e.target.value });

  if (state === "done")
    return <div className="flex flex-col items-center py-10 text-center"><span className="grid h-16 w-16 place-items-center rounded-full bg-brand text-white"><CheckIcon width={28} height={28} /></span><p className="mt-4 text-xl font-bold text-white">Mensagem enviada!</p><p className="mt-1 text-sm text-zinc-400">Obrigado, {form.name.split(" ")[0]}. Responderemos em breve.</p></div>;

  return (
    <form onSubmit={async (e) => { e.preventDefault(); setState("loading"); const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); setState(r.ok ? "done" : "error"); }} className="grid gap-4 sm:grid-cols-2">
      <input required value={form.name} onChange={set("name")} placeholder="Seu nome" className="input" />
      <input required type="email" value={form.email} onChange={set("email")} placeholder="Seu e-mail" className="input" />
      <select value={form.subject} onChange={set("subject")} className="input sm:col-span-2 bg-panel">
        {["Dúvida sobre pedido", "Trocas e devoluções", "Parcerias", "Imprensa", "Sugestões", "Outro"].map((o) => <option key={o}>{o}</option>)}
      </select>
      <textarea required rows={6} value={form.message} onChange={set("message")} placeholder="Sua mensagem" className="input sm:col-span-2 resize-none" />
      {state === "error" && <p className="text-sm text-red-400 sm:col-span-2">Não foi possível enviar. Tente novamente.</p>}
      <button type="submit" disabled={state === "loading"} className="btn-primary sm:col-span-2 py-3.5">{state === "loading" ? "Enviando..." : "Enviar mensagem"}</button>
    </form>
  );
}
