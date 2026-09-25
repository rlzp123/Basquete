import Link from "next/link";
import { COMPETITIONS, getTeams } from "@/lib/data";
import { TeamCard } from "@/components/cards";
import { PageHeader } from "@/components/page-header";

export const metadata = { title: "Times" };

export default async function TeamsPage({ searchParams }: { searchParams: Promise<{ competicao?: string }> }) {
  const sp = await searchParams;
  const teams = await getTeams({ competition: sp.competicao });
  const groups = COMPETITIONS.filter((c) => !sp.competicao || c === sp.competicao).map((c) => ({ c, list: teams.filter((t) => t.competition === c) }));
  return (
    <>
      <PageHeader eyebrow="Franquias e clubes" title="Times" description="Conheça os times, elencos, próximos jogos e resultados das principais ligas do mundo.">
        <div className="mt-6 flex gap-2">
          <Link href="/times" className={`chip ${!sp.competicao ? "chip-active" : ""}`}>Todas</Link>
          {COMPETITIONS.map((c) => <Link key={c} href={`/times?competicao=${c}`} className={`chip ${sp.competicao === c ? "chip-active" : ""}`}>{c}</Link>)}
        </div>
      </PageHeader>
      <div className="container-x space-y-14 py-10">
        {groups.map(({ c, list }) => list.length > 0 && (
          <section key={c}>
            <div className="mb-6 flex items-center gap-3"><h2 className="text-2xl font-black text-white">{c}</h2><span className="h-px flex-1 bg-white/8" /><span className="text-xs text-zinc-500">{list.length} times</span></div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((t) => <TeamCard key={t.id} team={t} />)}</div>
          </section>
        ))}
      </div>
    </>
  );
}
