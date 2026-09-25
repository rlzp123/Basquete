"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/components/icons";

export function SearchForm({ initial = "" }: { initial?: string }) {
  const [q, setQ] = useState(initial);
  const router = useRouter();
  return (
    <form onSubmit={(e) => { e.preventDefault(); router.push(`/pesquisa?q=${encodeURIComponent(q.trim())}`); }} className="flex gap-2">
      <div className="relative flex-1">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Pesquisar produtos, notícias, times e jogos..." className="input pl-12" />
      </div>
      <button type="submit" className="btn-primary">Buscar</button>
    </form>
  );
}
