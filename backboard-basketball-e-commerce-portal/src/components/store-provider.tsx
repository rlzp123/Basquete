"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  productId: number;
  slug: string;
  name: string;
  image: string;
  price: number;
  size?: string;
  qty: number;
};

type Toast = { id: number; message: string };

type Store = {
  cart: CartItem[];
  favorites: number[];
  hydrated: boolean;
  addToCart: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeFromCart: (productId: number, size?: string) => void;
  updateQty: (productId: number, size: string | undefined, qty: number) => void;
  clearCart: () => void;
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  cartCount: number;
  subtotal: number;
  toast: (message: string) => void;
  toasts: Toast[];
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("bb_cart") || "[]"));
      setFavorites(JSON.parse(localStorage.getItem("bb_favs") || "[]"));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("bb_cart", JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem("bb_favs", JSON.stringify(favorites));
  }, [favorites, hydrated]);

  const toast = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);

  const addToCart = useCallback(
    (item: Omit<CartItem, "qty">, qty = 1) => {
      setCart((c) => {
        const idx = c.findIndex((x) => x.productId === item.productId && x.size === item.size);
        if (idx >= 0) {
          const copy = [...c];
          copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
          return copy;
        }
        return [...c, { ...item, qty }];
      });
      toast(`${item.name} adicionado ao carrinho`);
    },
    [toast],
  );

  const removeFromCart = useCallback((productId: number, size?: string) => {
    setCart((c) => c.filter((x) => !(x.productId === productId && x.size === size)));
  }, []);

  const updateQty = useCallback((productId: number, size: string | undefined, qty: number) => {
    setCart((c) =>
      qty <= 0
        ? c.filter((x) => !(x.productId === productId && x.size === size))
        : c.map((x) => (x.productId === productId && x.size === size ? { ...x, qty } : x)),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleFavorite = useCallback(
    (productId: number) => {
      setFavorites((f) => {
        const has = f.includes(productId);
        toast(has ? "Removido dos favoritos" : "Adicionado aos favoritos");
        return has ? f.filter((x) => x !== productId) : [...f, productId];
      });
    },
    [toast],
  );

  const value = useMemo<Store>(
    () => ({
      cart,
      favorites,
      hydrated,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      toggleFavorite,
      isFavorite: (id) => favorites.includes(id),
      cartCount: cart.reduce((s, i) => s + i.qty, 0),
      subtotal: cart.reduce((s, i) => s + i.qty * i.price, 0),
      toast,
      toasts,
    }),
    [cart, favorites, hydrated, addToCart, removeFromCart, updateQty, clearCart, toggleFavorite, toast, toasts],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className="animate-slide-up rounded-xl border border-white/10 bg-zinc-900/95 px-4 py-3 text-sm text-white shadow-2xl backdrop-blur">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-brand" />
            {t.message}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
