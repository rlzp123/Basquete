import Link from "next/link";
import { COMPETITIONS, getResults, getUpcomingGames } from "@/lib/data";
import { GameCard, ResultRow, SectionHeader } from "@/components/cards";
import { PageHeader } from "@/components/page-header";

export const metadata = { title: "Jogos" };

const WHEN = [["", "Próximos jogos"], ["hoje", "Hoje"], ["amanha", "Amanhã"], ["semana", "Esta semana"]];

export default async function GamesPage({ searchParams }: { searchParams: Promise<{ quando?: string; competicao?: string }> }) {
  const sp = await searchParams;
  const [upcoming, results] = await Promise.all([
    getUpcomingGames({ when: sp.quando, competition: sp.competicao }),
    getResults({ competition: sp.competicao, limit: 6 }),
  ]);
  const link = (patch: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    Object.entries({ ...sp, ...patch }).forEach(([k, v]) => v && p.set(k, v));
    const s = p.toString();
    return `/jogos${s ? `?${s}` : ""}`;
  };

  return (
    <>
      <PageHeader eyebrow="Calendário" title="Próximos jogos" description="Datas, horários e resultados da NBA, do NBB e da EuroLeague em um só lugar." image="/images/arena.jpg" />
      <div className="container-x py-10">
        <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {WHEN.map(([v, l]) => <Link key={v} href={link({ quando: v || undefined })} className={`chip whitespace-nowrap ${(sp.quando ?? "") === v ? "chip-active" : ""}`}>{l}</Link>)}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Competição</span>
            <Link href={link({ competicao: undefined })} className={`chip ${!sp.competicao ? "chip-active" : ""}`}>Todas</Link>
            {COMPETITIONS.map((c) => <Link key={c} href={link({ competicao: c })} className={`chip ${sp.competicao === c ? "chip-active" : ""}`}>{c}</Link>)}
          </div>
        </div>

        {upcoming.length === 0 ? (
          <div className="card p-16 text-center text-zinc-400">Nenhum jogo encontrado para esse filtro.</div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{upcoming.map((g) => <GameCard key={g.id} game={g} />)}</div>
        )}

        <section className="mt-20">
          <SectionHeader eyebrow="Placar" title="Resultados recentes" href={`/jogos/resultados${sp.competicao ? `?competicao=${sp.competicao}` : ""}`} linkText="Todos os resultados" />
          <div className="grid gap-3">{results.map((g) => <ResultRow key={g.id} game={g} />)}</div>
        </section>
      </div>
    </>
  );
}
