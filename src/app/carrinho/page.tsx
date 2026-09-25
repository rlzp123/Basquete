"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/components/store-provider";
import { brl } from "@/lib/format";
import { ArrowRight, CartIcon, CheckIcon, TrashIcon } from "@/components/icons";

const FREE_SHIPPING = 299;

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQty, removeFromCart, subtotal, clearCart, hydrated } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : 24.9;
  const total = subtotal + shipping;

  const checkout = async () => {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: cart, shipping }) });
    setLoading(false);
    if (res.status === 401) {
      router.push("/login?next=/carrinho");
      return;
    }
    if (!res.ok) {
      setError("Não foi possível finalizar a compra. Tente novamente.");
      return;
    }
    const data = await res.json();
    setOrderId(data.id);
    clearCart();
  };

  if (orderId) {
    return (
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-28 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-brand text-white shadow-[0_0_60px_-10px_#5451d9]"><CheckIcon width={36} height={36} /></span>
        <h1 className="mt-6 text-3xl font-black text-white">Pedido #{orderId} confirmado!</h1>
        <p className="mt-2 max-w-md text-zinc-400">Obrigado por comprar na Backboard. Você pode acompanhar seus pedidos na área do usuário.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/perfil" className="btn-primary">Ver meus pedidos</Link>
          <Link href="/loja" className="btn-ghost">Continuar comprando</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-x pt-28 lg:pt-36">
      <p className="eyebrow">Checkout</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight text-white">Seu carrinho</h1>

      {hydrated && cart.length === 0 ? (
        <div className="card mt-10 flex flex-col items-center p-16 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-white/5 text-zinc-500"><CartIcon width={28} height={28} /></span>
          <p className="mt-4 text-lg font-bold text-white">Seu carrinho está vazio</p>
          <p className="mt-1 text-sm text-zinc-400">Explore a loja e encontre seu próximo equipamento.</p>
          <Link href="/loja" className="btn-primary mt-6">Ir para a loja <ArrowRight width={16} height={16} /></Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="card flex gap-4 p-4">
                <Link href={`/loja/${item.slug}`} className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-panel-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link href={`/loja/${item.slug}`} className="font-bold text-white hover:text-brand-light">{item.name}</Link>
                      {item.size && <p className="text-xs text-zinc-500">Tamanho: {item.size}</p>}
                    </div>
                    <button type="button" onClick={() => removeFromCart(item.productId, item.size)} aria-label="Remover" className="text-zinc-500 transition hover:text-red-400"><TrashIcon width={18} height={18} /></button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center rounded-lg border border-white/15">
                      <button type="button" onClick={() => updateQty(item.productId, item.size, item.qty - 1)} className="px-3 py-1.5 text-zinc-300 hover:text-white">−</button>
                      <span className="w-8 text-center text-sm font-bold text-white">{item.qty}</span>
                      <button type="button" onClick={() => updateQty(item.productId, item.size, item.qty + 1)} className="px-3 py-1.5 text-zinc-300 hover:text-white">+</button>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-white">{brl(item.price * item.qty)}</p>
                      {item.qty > 1 && <p className="text-xs text-zinc-500">{brl(item.price)} cada</p>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="card h-fit p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-bold text-white">Resumo</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between text-zinc-300"><dt>Subtotal</dt><dd className="font-semibold text-white">{brl(subtotal)}</dd></div>
              <div className="flex justify-between text-zinc-300"><dt>Frete</dt><dd className={`font-semibold ${shipping === 0 ? "text-emerald-400" : "text-white"}`}>{shipping === 0 ? "Grátis" : brl(shipping)}</dd></div>
              {shipping > 0 && (
                <div className="rounded-lg bg-brand/10 p-3 text-xs text-brand-light">
                  Faltam {brl(FREE_SHIPPING - subtotal)} para frete grátis.
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-brand transition-all" style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING) * 100)}%` }} /></div>
                </div>
              )}
              <div className="flex justify-between border-t border-white/8 pt-3 text-base"><dt className="font-bold text-white">Total</dt><dd className="text-2xl font-black text-white">{brl(total)}</dd></div>
            </dl>
            {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
            <button type="button" onClick={checkout} disabled={loading || cart.length === 0} className="btn-primary mt-5 w-full py-3.5">{loading ? "Processando..." : "Finalizar compra"}</button>
            <Link href="/loja" className="btn-ghost mt-2 w-full">Continuar comprando</Link>
            <p className="mt-4 text-center text-[11px] text-zinc-500">Pagamento seguro · Troca em 30 dias</p>
          </aside>
        </div>
      )}
    </div>
  );
}
