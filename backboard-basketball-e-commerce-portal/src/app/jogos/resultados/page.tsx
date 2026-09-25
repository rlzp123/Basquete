import Link from "next/link";
import { COMPETITIONS, getResults } from "@/lib/data";
import { GameCard } from "@/components/cards";
import { PageHeader } from "@/components/page-header";

export const metadata = { title: "Resultados" };

export default async function ResultsPage({ searchParams }: { searchParams: Promise<{ competicao?: string }> }) {
  const sp = await searchParams;
  const results = await getResults({ competition: sp.competicao });
  return (
    <>
      <PageHeader eyebrow="Placar" title="Resultados recentes" description="Todas as partidas já finalizadas, com placar, data e competição.">
        <div className="mt-6 flex gap-2">
          <Link href="/jogos/resultados" className={`chip ${!sp.competicao ? "chip-active" : ""}`}>Todas</Link>
          {COMPETITIONS.map((c) => <Link key={c} href={`/jogos/resultados?competicao=${c}`} className={`chip ${sp.competicao === c ? "chip-active" : ""}`}>{c}</Link>)}
          <Link href="/jogos" className="chip">← Próximos jogos</Link>
        </div>
      </PageHeader>
      <div className="container-x py-10">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{results.map((g) => <GameCard key={g.id} game={g} />)}</div>
      </div>
    </>
  );
}
