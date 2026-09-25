"use client";

import Link from "next/link";
import type { Product } from "@/lib/data";
import { brl } from "@/lib/format";
import { useStore } from "@/components/store-provider";
import { CartIcon, HeartIcon, StarIcon } from "@/components/icons";

export function Rating({ value, count, size = 14 }: { value: number | string; count?: number; size?: number }) {
  const v = Number(value);
  return (
    <span className="inline-flex items-center gap-1">
      <span className="flex text-amber-400">
        {[1, 2, 3, 4, 5].map((i) => (
          <StarIcon key={i} width={size} height={size} className={i <= Math.round(v) ? "" : "text-zinc-700"} />
        ))}
      </span>
      <span className="text-xs font-semibold text-zinc-300">{v.toFixed(1)}</span>
      {count !== undefined && <span className="text-xs text-zinc-500">({count})</span>}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, isFavorite, hydrated } = useStore();
  const price = Number(product.salePrice ?? product.price);
  const fav = hydrated && isFavorite(product.id);

  return (
    <div className="card card-hover group relative flex flex-col overflow-hidden">
      <Link href={`/loja/${product.slug}`} className="relative aspect-square overflow-hidden bg-panel-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {product.badge && (
          <span className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white ${product.salePrice ? "bg-brand" : "bg-white/15 backdrop-blur"}`}>
            {product.badge}
          </span>
        )}
      </Link>
      <button
        type="button"
        onClick={() => toggleFavorite(product.id)}
        aria-label="Favoritar"
        className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-ink/60 backdrop-blur transition hover:scale-110 ${fav ? "text-brand-light" : "text-white"}`}
      >
        <HeartIcon width={18} height={18} filled={fav} />
      </button>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">{product.category}</span>
        <Link href={`/loja/${product.slug}`} className="mt-1 line-clamp-2 font-bold leading-snug text-white transition-colors hover:text-brand-light">
          {product.name}
        </Link>
        <div className="mt-2">
          <Rating value={product.rating} count={product.reviews} />
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-xl font-black text-white">{brl(price)}</span>
          {product.salePrice && <span className="text-sm text-zinc-500 line-through">{brl(product.price)}</span>}
        </div>
        <button
          type="button"
          onClick={() => addToCart({ productId: product.id, slug: product.slug, name: product.name, image: product.images[0], price, size: product.sizes[0] })}
          className="btn-primary mt-4 w-full py-2.5"
        >
          <CartIcon width={16} height={16} /> Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
