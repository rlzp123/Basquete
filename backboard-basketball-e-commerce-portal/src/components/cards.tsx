import Link from "next/link";
import type { Game, NewsItem, Team } from "@/lib/data";
import { longDate, relativeDay, shortDate, time } from "@/lib/format";
import { ArrowRight, PinIcon } from "@/components/icons";

/* ---------- Team logo (generated) ---------- */
export function TeamLogo({ team, size = 48, className = "" }: { team: Pick<Team, "short" | "color" | "name">; size?: number; className?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full font-black tracking-tight text-white ring-2 ring-white/10 ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.3,
        background: `radial-gradient(circle at 30% 30%, ${team.color}, #0a0a0c 140%)`,
        boxShadow: `0 8px 24px -8px ${team.color}99`,
      }}
      title={team.name}
      aria-label={team.name}
    >
      {team.short}
    </span>
  );
}

/* ---------- Status badge ---------- */
export function StatusBadge({ status }: { status: string }) {
  if (status === "finished") return <span className="rounded-full bg-white/8 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-300">Finalizado</span>;
  if (status === "live")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-red-400">
        <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-red-500" /> Ao vivo
      </span>
    );
  return <span className="rounded-full bg-brand/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-light">Agendado</span>;
}

/* ---------- Game card ---------- */
export function GameCard({ game }: { game: Game }) {
  const d = shortDate(game.startsAt);
  const finished = game.status === "finished";
  const homeWin = finished && (game.homeScore ?? 0) > (game.awayScore ?? 0);
  return (
    <Link href={`/jogos/${game.id}`} className="card card-hover group block p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">{game.competition}</span>
        <StatusBadge status={game.status} />
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="flex flex-col items-center gap-2 text-center">
          <TeamLogo team={game.home} size={56} />
          <span className={`text-sm font-semibold leading-tight ${finished && !homeWin ? "text-zinc-400" : "text-white"}`}>{game.home.name}</span>
        </div>
        <div className="flex flex-col items-center">
          {finished ? (
            <div className="flex items-baseline gap-2 text-3xl font-black tabular-nums">
              <span className={homeWin ? "text-white" : "text-zinc-500"}>{game.homeScore}</span>
              <span className="text-base text-zinc-600">×</span>
              <span className={!homeWin ? "text-white" : "text-zinc-500"}>{game.awayScore}</span>
            </div>
          ) : (
            <>
              <span className="text-2xl font-black leading-none text-white">{d.day} <span className="text-brand-light">{d.month}</span></span>
              <span className="mt-1 text-sm font-semibold text-zinc-300">{time(game.startsAt)}</span>
            </>
          )}
          <span className="mt-1 text-[11px] font-medium uppercase tracking-wider text-zinc-500">{finished ? longDate(game.startsAt) : relativeDay(game.startsAt)}</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <TeamLogo team={game.away} size={56} />
          <span className={`text-sm font-semibold leading-tight ${finished && homeWin ? "text-zinc-400" : "text-white"}`}>{game.away.name}</span>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4 text-xs text-zinc-400">
        <span className="inline-flex items-center gap-1.5"><PinIcon width={14} height={14} /> {game.venue}</span>
        <span className="inline-flex items-center gap-1 font-semibold text-brand-light transition-transform group-hover:translate-x-1">Ver detalhes <ArrowRight width={14} height={14} /></span>
      </div>
    </Link>
  );
}

/* ---------- Result row ---------- */
export function ResultRow({ game }: { game: Game }) {
  const homeWin = (game.homeScore ?? 0) > (game.awayScore ?? 0);
  return (
    <Link href={`/jogos/${game.id}`} className="group flex items-center gap-4 rounded-xl border border-white/8 bg-panel px-4 py-3 transition hover:border-brand/40 hover:bg-panel-2">
      <span className="hidden w-24 text-xs font-bold uppercase tracking-wider text-zinc-500 sm:block">{game.competition}</span>
      <div className="flex flex-1 items-center justify-end gap-3">
        <span className={`text-sm font-semibold ${homeWin ? "text-white" : "text-zinc-400"}`}>{game.home.name}</span>
        <TeamLogo team={game.home} size={32} />
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-lg font-black tabular-nums">
        <span className={homeWin ? "text-white" : "text-zinc-500"}>{game.homeScore}</span>
        <span className="text-xs text-zinc-600">×</span>
        <span className={!homeWin ? "text-white" : "text-zinc-500"}>{game.awayScore}</span>
      </div>
      <div className="flex flex-1 items-center gap-3">
        <TeamLogo team={game.away} size={32} />
        <span className={`text-sm font-semibold ${!homeWin ? "text-white" : "text-zinc-400"}`}>{game.away.name}</span>
      </div>
      <div className="hidden flex-col items-end md:flex">
        <StatusBadge status="finished" />
        <span className="mt-1 text-[11px] text-zinc-500">{longDate(game.startsAt)}</span>
      </div>
    </Link>
  );
}

/* ---------- News card ---------- */
export function NewsCard({ item, large = false }: { item: NewsItem; large?: boolean }) {
  return (
    <Link href={`/noticias/${item.slug}`} className={`card card-hover group flex overflow-hidden ${large ? "flex-col lg:row-span-2" : "flex-col"}`}>
      <div className={`relative overflow-hidden ${large ? "aspect-[16/10] lg:aspect-auto lg:flex-1" : "aspect-[16/10]"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-md bg-brand px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">{item.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className={`font-bold leading-snug text-white transition-colors group-hover:text-brand-light ${large ? "text-2xl" : "text-lg"}`}>{item.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-400">{item.summary}</p>
        <div className="mt-auto flex items-center justify-between pt-4 text-xs text-zinc-500">
          <span>{longDate(item.publishedAt)}</span>
          <span className="inline-flex items-center gap-1 font-semibold text-brand-light">Ler notícia <ArrowRight width={14} height={14} /></span>
        </div>
      </div>
    </Link>
  );
}

/* ---------- Team card ---------- */
export function TeamCard({ team }: { team: Team }) {
  return (
    <Link href={`/times/${team.slug}`} className="card card-hover group relative overflow-hidden p-6">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40" style={{ background: team.color }} />
      <div className="relative flex items-center gap-4">
        <TeamLogo team={team} size={64} />
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold text-white">{team.name}</h3>
          <p className="text-sm text-zinc-400">{team.city} · {team.country}</p>
          <span className="mt-2 inline-block rounded-md bg-white/8 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-zinc-300">{team.competition}</span>
        </div>
      </div>
      <div className="relative mt-5 flex items-center justify-between border-t border-white/8 pt-4 text-xs text-zinc-400">
        <span>{team.titles} título{team.titles === 1 ? "" : "s"}</span>
        <span className="inline-flex items-center gap-1 font-semibold text-brand-light transition-transform group-hover:translate-x-1">Ver time <ArrowRight width={14} height={14} /></span>
      </div>
    </Link>
  );
}

/* ---------- Section header ---------- */
export function SectionHeader({ eyebrow, title, href, linkText = "Ver tudo", children }: { eyebrow: string; title: string; href?: string; linkText?: string; children?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="h-section mt-2">{title}</h2>
        {children}
      </div>
      {href && (
        <Link href={href} className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 transition-colors hover:text-white">
          {linkText} <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1 text-brand-light" />
        </Link>
      )}
    </div>
  );
}
