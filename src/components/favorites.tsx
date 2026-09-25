"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/data";
import { useStore } from "@/components/store-provider";
import { ProductCard } from "@/components/product-card";

export function Favorites() {
  const { favorites, hydrated } = useStore();
  const [items, setItems] = useState<Product[] | null>(null);

  useEffect(() => {
    if (!hydrated) return;
    if (favorites.length === 0) { setItems([]); return; }
    fetch(`/api/products?ids=${favorites.join(",")}`).then((r) => r.json()).then(setItems);
  }, [favorites, hydrated]);

  if (!items) return <div className="card p-12 text-center text-zinc-500">Carregando favoritos...</div>;
  if (items.length === 0)
    return <div className="card p-12 text-center"><p className="font-bold text-white">Nenhum favorito ainda.</p><p className="mt-1 text-sm text-zinc-400">Toque no coração dos produtos para salvá-los aqui.</p><Link href="/loja" className="btn-primary mt-4">Explorar loja</Link></div>;
  return <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div>;
}
