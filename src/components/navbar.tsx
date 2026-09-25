"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "@/components/store-provider";
import { CartIcon, CloseIcon, HeartIcon, Logo, MenuIcon, SearchIcon, UserIcon } from "@/components/icons";

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/loja", label: "Loja" },
  { href: "/noticias", label: "Notícias" },
  { href: "/jogos", label: "Jogos" },
  { href: "/times", label: "Times" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function Navbar({ user }: { user: { name: string } | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, hydrated, favorites } = useStore();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/pesquisa?q=${encodeURIComponent(q.trim())}`);
    setSearchOpen(false);
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? "border-b border-white/8 bg-ink/85 backdrop-blur-xl" : "bg-gradient-to-b from-ink/80 to-transparent"}`}>
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Link href="/" aria-label="Backboard"><Logo /></Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.filter((l) => l.href !== "/contato").map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link key={l.href} href={l.href} className={`relative rounded-md px-3.5 py-2 text-sm font-semibold transition-colors ${active ? "text-white" : "text-zinc-400 hover:text-white"}`}>
                {l.label}
                {active && <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-brand" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button type="button" aria-label="Pesquisar" onClick={() => setSearchOpen((s) => !s)} className="grid h-10 w-10 place-items-center rounded-lg text-zinc-300 transition hover:bg-white/8 hover:text-white">
            <SearchIcon />
          </button>
          <Link href="/perfil?tab=favoritos" aria-label="Favoritos" className="relative hidden h-10 w-10 place-items-center rounded-lg text-zinc-300 transition hover:bg-white/8 hover:text-white sm:grid">
            <HeartIcon />
            {hydrated && favorites.length > 0 && <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">{favorites.length}</span>}
          </Link>
          <Link href={user ? "/perfil" : "/login"} className="hidden h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-zinc-300 transition hover:bg-white/8 hover:text-white sm:flex">
            <UserIcon /> <span className="hidden md:inline">{user ? user.name.split(" ")[0] : "Entrar"}</span>
          </Link>
          <Link href="/carrinho" aria-label="Carrinho" className="relative grid h-10 w-10 place-items-center rounded-lg text-zinc-300 transition hover:bg-white/8 hover:text-white">
            <CartIcon />
            {hydrated && cartCount > 0 && <span className="absolute right-0.5 top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">{cartCount}</span>}
          </Link>
          <button type="button" aria-label="Menu" onClick={() => setOpen((o) => !o)} className="grid h-10 w-10 place-items-center rounded-lg text-zinc-300 transition hover:bg-white/8 hover:text-white lg:hidden">
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="animate-slide-up border-t border-white/8 bg-ink/95 backdrop-blur-xl">
          <form onSubmit={submit} className="container-x flex items-center gap-3 py-3">
            <SearchIcon className="text-brand-light" />
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Pesquisar produtos, notícias, times e jogos..." className="flex-1 bg-transparent text-base text-white placeholder:text-zinc-500 outline-none" />
            <button type="submit" className="btn-primary py-2">Buscar</button>
          </form>
        </div>
      )}

      {open && (
        <div className="animate-slide-up border-t border-white/8 bg-ink/95 backdrop-blur-xl lg:hidden">
          <nav className="container-x flex flex-col py-3">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={`rounded-lg px-3 py-3 text-base font-semibold ${pathname === l.href ? "bg-brand/15 text-white" : "text-zinc-300 hover:bg-white/5"}`}>
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 border-t border-white/8 pt-3">
              <Link href={user ? "/perfil" : "/login"} className="btn-ghost flex-1"><UserIcon width={16} height={16} /> {user ? "Minha conta" : "Entrar"}</Link>
              <Link href="/perfil?tab=favoritos" className="btn-ghost flex-1"><HeartIcon width={16} height={16} /> Favoritos</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
