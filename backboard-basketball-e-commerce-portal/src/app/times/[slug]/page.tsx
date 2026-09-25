import Link from "next/link";
import { notFound } from "next/navigation";
import { getNews, getPlayers, getTeamBySlug, getTeamGames } from "@/lib/data";
import { GameCard, NewsCard, ResultRow, TeamLogo } from "@/components/cards";

export default async function TeamDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const team = await getTeamBySlug(slug);
  if (!team) notFound();
  const [{ upcoming, results }, roster, teamNews] = await Promise.all([getTeamGames(team.id), getPlayers(team.id), getNews({ teamId: team.id })]);
  const fallbackNews = teamNews.length ? teamNews : await getNews({ limit: 3 });
  let wins = 0;
  results.forEach((g) => { const isHome = g.homeTeamId === team.id; if ((isHome ? g.homeScore! > g.awayScore! : g.awayScore! > g.homeScore!)) wins++; });

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-14 lg:pt-36">
        <div className="absolute inset-0 court-lines" />
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full opacity-30 blur-[140px]" style={{ background: team.color }} />
        <div className="container-x relative">
          <Link href="/times" className="text-xs font-semibold text-zinc-400 hover:text-white">← Todos os times</Link>
          <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-center">
            <TeamLogo team={team} size={140} />
            <div className="flex-1">
              <span className="rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">{team.competition}</span>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-6xl">{team.name}</h1>
              <p className="mt-2 text-zinc-400">{team.city} · {team.country}</p>
              <p className="mt-4 max-w-2xl text-zinc-300">{team.description}</p>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[["Fundação", team.founded], ["Títulos", team.titles], ["Arena", team.arena], ["Técnico", team.coach], ["Últimos 5", `${wins}V – ${results.length - wins}D`], ["Elenco", `${roster.length} atletas`]].map(([l, v]) => (
              <div key={l as string} className="card p-4"><p className="text-[11px] uppercase tracking-wider text-zinc-500">{l}</p><p className="mt-1 truncate font-bold text-white">{v}</p></div>
            ))}
          </div>
        </div>
      </section>

      <div className="container-x space-y-16 py-10">
        <section>
          <h2 className="mb-6 text-2xl font-black text-white">Próximos jogos</h2>
          {upcoming.length === 0 ? <p className="text-zinc-500">Sem jogos agendados.</p> : <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{upcoming.slice(0, 3).map((g) => <GameCard key={g.id} game={g} />)}</div>}
        </section>
        <section>
          <h2 className="mb-6 text-2xl font-black text-white">Últimos resultados</h2>
          <div className="grid gap-3">{results.map((g) => <ResultRow key={g.id} game={g} />)}</div>
        </section>
        <section>
          <h2 className="mb-6 text-2xl font-black text-white">Elenco</h2>
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-left text-[11px] uppercase tracking-wider text-zinc-500"><tr><th className="px-5 py-3">#</th><th className="px-5 py-3">Jogador</th><th className="px-5 py-3">Posição</th><th className="hidden px-5 py-3 sm:table-cell">Altura</th><th className="hidden px-5 py-3 sm:table-cell">Idade</th></tr></thead>
              <tbody>
                {roster.map((p) => (
                  <tr key={p.id} className="border-t border-white/5 transition hover:bg-white/[0.03]">
                    <td className="px-5 py-3 font-black text-brand-light">{p.number}</td>
                    <td className="px-5 py-3 font-semibold text-white">{p.name}</td>
                    <td className="px-5 py-3 text-zinc-300">{p.position}</td>
                    <td className="hidden px-5 py-3 text-zinc-300 sm:table-cell">{p.height}</td>
                    <td className="hidden px-5 py-3 text-zinc-300 sm:table-cell">{p.age} anos</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 className="mb-6 text-2xl font-black text-white">Notícias relacionadas</h2>
          <div className="grid gap-5 md:grid-cols-3">{fallbackNews.slice(0, 3).map((n) => <NewsCard key={n.id} item={n} />)}</div>
        </section>
      </div>
    </>
  );
}
