import Link from "next/link";
import { NEWS_CATEGORIES, getNews } from "@/lib/data";
import { NewsCard } from "@/components/cards";
import { PageHeader } from "@/components/page-header";

export const metadata = { title: "Notícias" };

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ categoria?: string; q?: string }> }) {
  const sp = await searchParams;
  const items = await getNews({ category: sp.categoria, q: sp.q });
  const [first, ...rest] = items;

  return (
    <>
      <PageHeader eyebrow="Portal Backboard" title="Últimas notícias" description="Cobertura completa da NBA, do basquete nacional, do cenário internacional, do mercado e das competições." image="/images/arena.jpg" />
      <div className="container-x py-10">
        <div className="mb-8 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          <Link href="/noticias" className={`chip whitespace-nowrap ${!sp.categoria ? "chip-active" : ""}`}>Todas</Link>
          {NEWS_CATEGORIES.map((c) => (
            <Link key={c} href={`/noticias?categoria=${encodeURIComponent(c)}`} className={`chip whitespace-nowrap ${sp.categoria === c ? "chip-active" : ""}`}>{c}</Link>
          ))}
        </div>
        {items.length === 0 ? (
          <div className="card p-16 text-center text-zinc-400">Nenhuma notícia encontrada.</div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
            {first && <NewsCard item={first} large />}
            {rest.map((n) => <NewsCard key={n.id} item={n} />)}
          </div>
        )}
      </div>
    </>
  );
}
