import Link from "next/link";
import { CATEGORIES, getFeaturedProducts, getNews, getResults, getUpcomingGames } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { GameCard, NewsCard, ResultRow, SectionHeader } from "@/components/cards";
import { ArrowRight, BoltIcon, RefreshIcon, ShieldIcon, TruckIcon } from "@/components/icons";

export default async function HomePage() {
  const [featured, latestNews, upcoming, results] = await Promise.all([
    getFeaturedProducts(),
    getNews({ limit: 4 }),
    getUpcomingGames({ limit: 3 }),
    getResults({ limit: 4 }),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero.jpg" alt="Jogador de basquete enterrando" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />
        <div className="container-x relative pb-20 pt-40">
          <div className="max-w-3xl animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-200 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-brand-light" /> Loja + Portal de basquete
            </span>
            <h1 className="mt-6 text-5xl font-black leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
              O jogo não para.<br /><span className="text-brand-light">Você também não.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-zinc-300">Produtos, notícias, jogos e tudo que acontece no mundo do basquete em um só lugar.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/loja" className="btn-primary px-7 py-3.5 text-base">Comprar agora <ArrowRight width={18} height={18} /></Link>
              <Link href="/jogos" className="btn-ghost px-7 py-3.5 text-base">Ver próximos jogos</Link>
            </div>
          </div>
          <div className="mt-14 grid max-w-3xl grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            {[["+500", "Produtos"], ["24/7", "Cobertura"], ["3", "Ligas"], ["12", "Times"]].map(([v, l]) => (
              <div key={l}><p className="text-3xl font-black text-white">{v}</p><p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{l}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="border-y border-white/8 bg-panel">
        <div className="flex overflow-hidden py-3">
          <div className="flex animate-marquee gap-12 whitespace-nowrap">
            {[...results, ...results].map((g, i) => (
              <Link key={`${g.id}-${i}`} href={`/jogos/${g.id}`} className="flex items-center gap-3 text-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-light">{g.competition}</span>
                <span className="font-semibold text-white">{g.home.short} {g.homeScore}</span>
                <span className="text-zinc-600">×</span>
                <span className="font-semibold text-white">{g.awayScore} {g.away.short}</span>
                <span className="text-xs text-zinc-500">Final</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <section className="container-x py-20">
        <SectionHeader eyebrow="Loja" title="Encontre seu equipamento" href="/loja" linkText="Ver toda a loja" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <Link key={c.slug} href={`/loja?categoria=${c.slug}`} className={`group relative overflow-hidden rounded-2xl border border-white/8 ${i === 0 || i === 5 ? "md:row-span-2 aspect-[4/5] md:aspect-auto" : "aspect-[4/5] md:aspect-[4/3]"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt={c.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Categoria</p>
                  <h3 className="text-xl font-black text-white">{c.name}</h3>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition group-hover:bg-brand"><ArrowRight width={18} height={18} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="container-x pb-20">
        <SectionHeader eyebrow="Produtos" title="Destaques da semana" href="/loja" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="mt-10 grid gap-4 rounded-2xl border border-white/8 bg-panel p-6 sm:grid-cols-2 lg:grid-cols-4">
          {[[TruckIcon, "Frete grátis", "Acima de R$ 299"], [RefreshIcon, "Troca fácil", "30 dias para trocar"], [ShieldIcon, "Compra segura", "Pagamento protegido"], [BoltIcon, "Envio rápido", "Despacho em 24h"]].map(([Icon, t, s]) => {
            const I = Icon as typeof TruckIcon;
            return (
              <div key={t as string} className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/15 text-brand-light"><I /></span>
                <div><p className="font-bold text-white">{t as string}</p><p className="text-xs text-zinc-400">{s as string}</p></div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Games */}
      <section className="relative overflow-hidden py-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/arena.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
        <div className="container-x relative">
          <SectionHeader eyebrow="Calendário" title="Próximos jogos" href="/jogos" linkText="Calendário completo" />
          <div className="grid gap-5 lg:grid-cols-3">
            {upcoming.map((g) => <GameCard key={g.id} game={g} />)}
          </div>
          <div className="mt-16">
            <SectionHeader eyebrow="Placar" title="Resultados recentes" href="/jogos/resultados" linkText="Todos os resultados" />
            <div className="grid gap-3">
              {results.map((g) => <ResultRow key={g.id} game={g} />)}
            </div>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="container-x py-20">
        <SectionHeader eyebrow="Portal" title="Últimas notícias" href="/noticias" linkText="Todas as notícias" />
        <div className="grid gap-5 lg:grid-cols-3 lg:grid-rows-2">
          {latestNews.map((n, i) => <NewsCard key={n.id} item={n} large={i === 0} />)}
        </div>
      </section>

      {/* Brand */}
      <section className="container-x pb-4">
        <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-panel p-10 sm:p-16">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand/30 blur-[100px]" />
          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Backboard</p>
              <h2 className="h-section mt-2">Mais que um esporte. Uma cultura.</h2>
              <p className="mt-4 text-zinc-400">A Backboard nasceu para conectar quem vive o basquete dentro e fora das quadras. Loja, notícias, jogos e times em uma única experiência.</p>
              <Link href="/sobre" className="btn-dark mt-6">Conheça a Backboard</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[["Loja", "/loja"], ["Notícias", "/noticias"], ["Jogos", "/jogos"], ["Times", "/times"]].map(([l, h]) => (
                <Link key={h} href={h} className="group rounded-2xl border border-white/8 bg-ink/60 p-5 transition hover:border-brand/50">
                  <p className="text-lg font-bold text-white">{l}</p>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-brand-light">Explorar <ArrowRight width={12} height={12} className="transition-transform group-hover:translate-x-1" /></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
