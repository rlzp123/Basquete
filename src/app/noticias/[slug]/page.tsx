import Link from "next/link";
import { notFound } from "next/navigation";
import { getNews, getNewsBySlug, getTeamBySlug, getTeams } from "@/lib/data";
import { longDate } from "@/lib/format";
import { NewsCard, TeamLogo } from "@/components/cards";
import { ArrowRight } from "@/components/icons";

export default async function NewsDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) notFound();
  const related = (await getNews({ category: item.category, limit: 4 })).filter((n) => n.id !== item.id).slice(0, 3);
  const team = item.teamId ? (await getTeams()).find((t) => t.id === item.teamId) ?? null : null;
  void getTeamBySlug;

  return (
    <article>
      <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
        <div className="container-x absolute inset-x-0 bottom-0 pb-10">
          <Link href={`/noticias?categoria=${encodeURIComponent(item.category)}`} className="rounded-md bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">{item.category}</Link>
          <h1 className="mt-4 max-w-4xl text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">{item.title}</h1>
          <p className="mt-4 text-sm text-zinc-300">Por <span className="font-semibold text-white">{item.author}</span> · {longDate(item.publishedAt)}</p>
        </div>
      </div>
      <div className="container-x grid gap-12 py-12 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="text-xl font-medium leading-relaxed text-zinc-200">{item.summary}</p>
          <div className="prose-bb mt-8 border-t border-white/8 pt-8">
            {item.content.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
        <aside className="space-y-6">
          {team && (
            <Link href={`/times/${team.slug}`} className="card card-hover flex items-center gap-4 p-5">
              <TeamLogo team={team} size={56} />
              <div><p className="text-xs uppercase tracking-wider text-zinc-500">Time relacionado</p><p className="font-bold text-white">{team.name}</p><span className="text-xs font-semibold text-brand-light">Ver página do time →</span></div>
            </Link>
          )}
          <div className="card p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Categorias</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["NBA", "Basquete nacional", "Internacional", "Mercado", "Jogadores", "Competições"].map((c) => <Link key={c} href={`/noticias?categoria=${encodeURIComponent(c)}`} className="chip">{c}</Link>)}
            </div>
          </div>
          <Link href="/loja" className="group relative block overflow-hidden rounded-2xl border border-white/8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/products/shoes.jpg" alt="" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
            <div className="absolute bottom-4 left-4 right-4"><p className="text-xs uppercase tracking-wider text-zinc-400">Loja</p><p className="font-bold text-white">Equipe-se como os profissionais</p><span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-light">Ver produtos <ArrowRight width={12} height={12} /></span></div>
          </Link>
        </aside>
      </div>
      {related.length > 0 && (
        <section className="container-x pb-8">
          <h2 className="mb-6 text-2xl font-black text-white">Leia também</h2>
          <div className="grid gap-5 md:grid-cols-3">{related.map((n) => <NewsCard key={n.id} item={n} />)}</div>
        </section>
      )}
    </article>
  );
}
