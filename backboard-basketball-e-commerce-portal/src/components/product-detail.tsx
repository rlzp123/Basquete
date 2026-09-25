"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/data";
import { brl } from "@/lib/format";
import { useStore } from "@/components/store-provider";
import { Rating } from "@/components/product-card";
import { CartIcon, CheckIcon, HeartIcon, RefreshIcon, ShieldIcon, TruckIcon } from "@/components/icons";

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart, toggleFavorite, isFavorite, hydrated } = useStore();
  const [img, setImg] = useState(0);
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const price = Number(product.salePrice ?? product.price);
  const fav = hydrated && isFavorite(product.id);

  const item = { productId: product.id, slug: product.slug, name: product.name, image: product.images[0], price, size };

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {/* Gallery */}
      <div>
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/8 bg-panel">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={img} src={product.images[img]} alt={product.name} className="h-full w-full animate-fade-in object-cover" />
          {product.badge && <span className="absolute left-4 top-4 rounded-md bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">{product.badge}</span>}
        </div>
        {product.images.length > 1 && (
          <div className="mt-3 grid grid-cols-4 gap-3">
            {product.images.map((src, i) => (
              <button key={src + i} type="button" onClick={() => setImg(i)} className={`aspect-square overflow-hidden rounded-xl border-2 transition ${i === img ? "border-brand" : "border-transparent opacity-60 hover:opacity-100"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col">
        <span className="eyebrow">{product.category}</span>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">{product.name}</h1>
        <div className="mt-3"><Rating value={product.rating} count={product.reviews} size={16} /></div>
        <div className="mt-5 flex items-baseline gap-3">
          <span className="text-4xl font-black text-white">{brl(price)}</span>
          {product.salePrice && <><span className="text-lg text-zinc-500 line-through">{brl(product.price)}</span><span className="rounded-md bg-brand/15 px-2 py-0.5 text-xs font-bold text-brand-light">-{Math.round((1 - price / Number(product.price)) * 100)}%</span></>}
        </div>
        <p className="mt-1 text-sm text-zinc-500">ou 6x de {brl(price / 6)} sem juros</p>
        <p className="mt-6 leading-relaxed text-zinc-300">{product.description}</p>

        <div className="mt-6">
          <p className="mb-2 text-sm font-semibold text-zinc-300">Tamanho: <span className="text-white">{size}</span></p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button key={s} type="button" onClick={() => setSize(s)} className={`min-w-12 rounded-lg border px-3 py-2.5 text-sm font-bold transition ${s === size ? "border-brand bg-brand text-white" : "border-white/15 text-zinc-300 hover:border-white/40"}`}>{s}</button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-lg border border-white/15">
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-3 text-lg text-zinc-300 hover:text-white">−</button>
            <span className="w-10 text-center font-bold text-white">{qty}</span>
            <button type="button" onClick={() => setQty((q) => q + 1)} className="px-4 py-3 text-lg text-zinc-300 hover:text-white">+</button>
          </div>
          <button type="button" onClick={() => toggleFavorite(product.id)} className={`btn-ghost ${fav ? "text-brand-light border-brand/50" : ""}`}><HeartIcon width={18} height={18} filled={fav} /> {fav ? "Favoritado" : "Favoritar"}</button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button type="button" onClick={() => addToCart(item, qty)} className="btn-ghost py-3.5"><CartIcon width={18} height={18} /> Adicionar ao carrinho</button>
          <button type="button" onClick={() => { addToCart(item, qty); router.push("/carrinho"); }} className="btn-primary py-3.5">Comprar agora</button>
        </div>

        <ul className="mt-8 grid gap-3 border-t border-white/8 pt-6 text-sm text-zinc-300 sm:grid-cols-3">
          <li className="flex items-center gap-2"><TruckIcon className="text-brand-light" width={18} height={18} /> Frete grátis acima de R$ 299</li>
          <li className="flex items-center gap-2"><RefreshIcon className="text-brand-light" width={18} height={18} /> Troca em até 30 dias</li>
          <li className="flex items-center gap-2"><ShieldIcon className="text-brand-light" width={18} height={18} /> Produto original</li>
        </ul>
        <p className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-400"><CheckIcon width={16} height={16} /> Em estoque — envio em 24h</p>
      </div>
    </div>
  );
}
