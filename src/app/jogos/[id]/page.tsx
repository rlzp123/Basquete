import Link from "next/link";
import { notFound } from "next/navigation";
import { getGameById, getNews, getTeamGames } from "@/lib/data";
import { longDate, time } from "@/lib/format";
import { GameCard, NewsCard, StatusBadge, TeamLogo } from "@/components/cards";
import { CalendarIcon, ClockIcon, PinIcon, TrophyIcon } from "@/components/icons";

export default async function GameDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const game = await getGameById(Number(id));
  if (!game) notFound();
  const finished = game.status === "finished";
  const homeWin = finished && (game.homeScore ?? 0) > (game.awayScore ?? 0);
  const [homeGames, awayGames, news] = await Promise.all([getTeamGames(game.homeTeamId), getTeamGames(game.awayTeamId), getNews({ limit: 3 })]);
  const record = (r: { results: { homeTeamId: number; homeScore: number | null; awayScore: number | null }[] }, teamId: number) => {
    let w = 0, l = 0;
    r.results.forEach((g) => { const win = g.homeTeamId === teamId ? (g.homeScore ?? 0) > (g.awayScore ?? 0) : (g.awayScore ?? 0) > (g.homeScore ?? 0); win ? w++ : l++; });
    return `${w}V – ${l}D`;
  };

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-14 lg:pt-36">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/arena.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/80 to-ink" />
        <div className="container-x relative">
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3 text-sm text-zinc-300">
            <span className="rounded-md bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">{game.competition}</span>
            <StatusBadge status={game.status} />
          </div>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-10">
            <Link href={`/times/${game.home.slug}`} className="group flex flex-col items-center text-center">
              <TeamLogo team={game.home} size={112} className="transition-transform group-hover:scale-105" />
              <p className="mt-4 text-lg font-black text-white sm:text-2xl">{game.home.name}</p>
              <p className="text-xs text-zinc-400">Mandante · {record(homeGames, game.home.id)}</p>
            </Link>
            <div className="text-center">
              {finished ? (
                <div className="flex items-center gap-3 text-5xl font-black tabular-nums sm:text-7xl">
                  <span className={homeWin ? "text-white" : "text-zinc-500"}>{game.homeScore}</span><span className="text-2xl text-zinc-600">×</span><span className={!homeWin ? "text-white" : "text-zinc-500"}>{game.awayScore}</span>
                </div>
              ) : (
                <><p className="text-4xl font-black text-white sm:text-6xl">{time(game.startsAt)}</p><p className="mt-1 text-sm font-semibold uppercase tracking-wider text-brand-light">{longDate(game.startsAt)}</p></>
              )}
            </div>
            <Link href={`/times/${game.away.slug}`} className="group flex flex-col items-center text-center">
              <TeamLogo team={game.away} size={112} className="transition-transform group-hover:scale-105" />
              <p className="mt-4 text-lg font-black text-white sm:text-2xl">{game.away.name}</p>
              <p className="text-xs text-zinc-400">Visitante · {record(awayGames, game.away.id)}</p>
            </Link>
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-4">
            {[[CalendarIcon, "Data", longDate(game.startsAt)], [ClockIcon, "Horário", time(game.startsAt)], [PinIcon, "Local", game.venue], [TrophyIcon, "Competição", game.competition]].map(([I, l, v]) => {
              const Icon = I as typeof PinIcon;
              return <div key={l as string} className="card flex items-center gap-3 p-4"><Icon className="text-brand-light shrink-0" /><div><p className="text-[11px] uppercase tracking-wider text-zinc-500">{l as string}</p><p className="text-sm font-semibold text-white">{v as string}</p></div></div>;
            })}
          </div>
        </div>
      </section>

      <div className="container-x grid gap-12 py-10 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-black text-white">Últimos jogos · {game.home.short}</h2>
          <div className="grid gap-4">{homeGames.results.slice(0, 3).map((g) => <GameCard key={g.id} game={g} />)}</div>
        </div>
        <div>
          <h2 className="mb-4 text-xl font-black text-white">Últimos jogos · {game.away.short}</h2>
          <div className="grid gap-4">{awayGames.results.slice(0, 3).map((g) => <GameCard key={g.id} game={g} />)}</div>
        </div>
      </div>
      <section className="container-x py-10">
        <h2 className="mb-6 text-2xl font-black text-white">Notícias em destaque</h2>
        <div className="grid gap-5 md:grid-cols-3">{news.map((n) => <NewsCard key={n.id} item={n} />)}</div>
      </section>
    </>
  );
}
