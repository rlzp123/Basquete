import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";
import { brl, longDate } from "@/lib/format";
import { PageHeader } from "@/components/page-header";
import { Favorites } from "@/components/favorites";
import { LogoutButton } from "@/components/logout-button";
import { HeartIcon, PackageIcon, UserIcon } from "@/components/icons";

export const metadata = { title: "Minha conta" };

export default async function ProfilePage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/perfil");
  const { tab = "pedidos" } = await searchParams;
  const myOrders = await db.select().from(orders).where(eq(orders.userId, user.id)).orderBy(desc(orders.createdAt));

  const tabs = [
    { id: "pedidos", label: "Pedidos", icon: PackageIcon },
    { id: "favoritos", label: "Favoritos", icon: HeartIcon },
    { id: "dados", label: "Meus dados", icon: UserIcon },
  ];

  return (
    <>
      <PageHeader eyebrow="Área do usuário" title={`Olá, ${user.name.split(" ")[0]}!`} description="Acompanhe seus pedidos, favoritos e dados da conta.">
        <div className="mt-6"><LogoutButton /></div>
      </PageHeader>
      <div className="container-x grid gap-8 py-10 lg:grid-cols-[240px_1fr]">
        <aside className="flex gap-2 overflow-x-auto lg:flex-col">
          {tabs.map((t) => (
            <Link key={t.id} href={`/perfil?tab=${t.id}`} className={`flex items-center gap-3 whitespace-nowrap rounded-xl px-4 py-3 text-sm font-semibold transition ${tab === t.id ? "bg-brand text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}>
              <t.icon width={18} height={18} /> {t.label}
            </Link>
          ))}
        </aside>

        <div>
          {tab === "pedidos" && (
            <div className="space-y-4">
              {myOrders.length === 0 ? (
                <div className="card p-12 text-center"><p className="font-bold text-white">Você ainda não fez pedidos.</p><Link href="/loja" className="btn-primary mt-4">Ir para a loja</Link></div>
              ) : (
                myOrders.map((o) => (
                  <div key={o.id} className="card p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/8 pb-3">
                      <div><p className="font-bold text-white">Pedido #{o.id}</p><p className="text-xs text-zinc-500">{longDate(o.createdAt)}</p></div>
                      <div className="flex items-center gap-3"><span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">{o.status}</span><span className="text-lg font-black text-white">{brl(o.total)}</span></div>
                    </div>
                    <ul className="mt-3 space-y-2">
                      {o.items.map((it, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={it.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                          <span className="flex-1 text-zinc-300">{it.name}{it.size ? ` · ${it.size}` : ""} <span className="text-zinc-500">× {it.qty}</span></span>
                          <span className="font-semibold text-white">{brl(it.price * it.qty)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
          )}
          {tab === "favoritos" && <Favorites />}
          {tab === "dados" && (
            <div className="card p-6">
              <h2 className="text-lg font-bold text-white">Meus dados</h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2 text-sm">
                <div><dt className="text-zinc-500">Nome</dt><dd className="font-semibold text-white">{user.name}</dd></div>
                <div><dt className="text-zinc-500">E-mail</dt><dd className="font-semibold text-white">{user.email}</dd></div>
                <div><dt className="text-zinc-500">Membro desde</dt><dd className="font-semibold text-white">{longDate(user.createdAt)}</dd></div>
                <div><dt className="text-zinc-500">Pedidos</dt><dd className="font-semibold text-white">{myOrders.length}</dd></div>
              </dl>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
