import Link from "next/link";
import { search } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { GameCard, NewsCard, TeamCard } from "@/components/cards";
import { PageHeader } from "@/components/page-header";
import { SearchForm } from "@/components/search-form";

export const metadata = { title: "Pesquisa" };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const r = await search(q);
  const total = r.products.length + r.news.length + r.teams.length + r.games.length;

  return (
    <>
      <PageHeader eyebrow="Pesquisa" title={q ? `Resultados para “${q}”` : "O que você procura?"} description={q ? `${total} resultado${total === 1 ? "" : "s"} encontrado${total === 1 ? "" : "s"} em produtos, notícias, times e jogos.` : "Pesquise produtos, notícias, times e jogos."}>
        <div className="mt-6 max-w-xl"><SearchForm initial={q} /></div>
      </PageHeader>
      <div className="container-x space-y-16 py-10">
        {q && total === 0 && (
          <div className="card p-16 text-center"><p className="text-lg font-bold text-white">Nada encontrado.</p><p className="mt-1 text-sm text-zinc-400">Tente termos como “bola”, “Lakers”, “NBA” ou “tênis”.</p><Link href="/loja" className="btn-primary mt-6">Explorar loja</Link></div>
        )}
        {r.products.length > 0 && <section><h2 className="mb-6 text-2xl font-black text-white">Produtos <span className="text-base font-semibold text-zinc-500">({r.products.length})</span></h2><div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{r.products.map((p) => <ProductCard key={p.id} product={p} />)}</div></section>}
        {r.news.length > 0 && <section><h2 className="mb-6 text-2xl font-black text-white">Notícias <span className="text-base font-semibold text-zinc-500">({r.news.length})</span></h2><div className="grid gap-5 md:grid-cols-3">{r.news.map((n) => <NewsCard key={n.id} item={n} />)}</div></section>}
        {r.teams.length > 0 && <section><h2 className="mb-6 text-2xl font-black text-white">Times <span className="text-base font-semibold text-zinc-500">({r.teams.length})</span></h2><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{r.teams.map((t) => <TeamCard key={t.id} team={t} />)}</div></section>}
        {r.games.length > 0 && <section><h2 className="mb-6 text-2xl font-black text-white">Jogos <span className="text-base font-semibold text-zinc-500">({r.games.length})</span></h2><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{r.games.map((g) => <GameCard key={g.id} game={g} />)}</div></section>}
      </div>
    </>
  );
}
