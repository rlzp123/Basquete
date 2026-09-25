import { db } from "@/db";
import { products, teams, players, games, news } from "@/db/schema";
import { and, asc, desc, eq, gte, ilike, inArray, lt, ne, or, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { ensureSeeded } from "@/db/seed";

export type Product = typeof products.$inferSelect;
export type Team = typeof teams.$inferSelect;
export type Player = typeof players.$inferSelect;
export type NewsItem = typeof news.$inferSelect;
export type Game = typeof games.$inferSelect & { home: Team; away: Team };

export const CATEGORIES = [
  { name: "Camisetas", slug: "camisetas", image: "/images/products/jersey.jpg" },
  { name: "Tênis", slug: "tenis", image: "/images/products/shoes.jpg" },
  { name: "Bolas", slug: "bolas", image: "/images/products/ball.jpg" },
  { name: "Shorts", slug: "shorts", image: "/images/products/shorts.jpg" },
  { name: "Acessórios", slug: "acessorios", image: "/images/products/accessories.jpg" },
  { name: "Bonés", slug: "bones", image: "/images/products/cap.jpg" },
  { name: "Mochilas", slug: "mochilas", image: "/images/products/backpack.jpg" },
  { name: "Colecionáveis", slug: "colecionaveis", image: "/images/products/collectible.jpg" },
];

export const NEWS_CATEGORIES = ["NBA", "Basquete nacional", "Internacional", "Mercado", "Jogadores", "Competições"];
export const COMPETITIONS = ["NBA", "NBB", "EuroLeague"];

export function categoryBySlug(slug?: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

// ---------- Products ----------
export async function getProducts(opts: { category?: string; q?: string; sort?: string; onSale?: boolean } = {}) {
  await ensureSeeded();
  const conds = [];
  const cat = categoryBySlug(opts.category);
  if (cat) conds.push(eq(products.category, cat.name));
  if (opts.q) conds.push(or(ilike(products.name, `%${opts.q}%`), ilike(products.description, `%${opts.q}%`)));
  if (opts.onSale) conds.push(sql`${products.salePrice} is not null`);
  const order =
    opts.sort === "price-asc"
      ? asc(sql`coalesce(${products.salePrice}, ${products.price})`)
      : opts.sort === "price-desc"
        ? desc(sql`coalesce(${products.salePrice}, ${products.price})`)
        : opts.sort === "rating"
          ? desc(products.rating)
          : asc(products.id);
  return db.select().from(products).where(conds.length ? and(...conds) : undefined).orderBy(order);
}

export async function getFeaturedProducts() {
  await ensureSeeded();
  return db.select().from(products).where(eq(products.featured, true)).orderBy(asc(products.id)).limit(8);
}

export async function getProductBySlug(slug: string) {
  await ensureSeeded();
  const [p] = await db.select().from(products).where(eq(products.slug, slug));
  return p ?? null;
}

export async function getProductsByIds(ids: number[]) {
  if (!ids.length) return [];
  return db.select().from(products).where(inArray(products.id, ids));
}

export async function getRelatedProducts(p: Product) {
  const same = await db.select().from(products).where(and(eq(products.category, p.category), ne(products.id, p.id))).limit(4);
  const others = await db.select().from(products).where(and(ne(products.category, p.category), ne(products.id, p.id))).orderBy(desc(products.rating)).limit(4);
  return { same, others };
}

// ---------- Teams ----------
export async function getTeams(opts: { competition?: string; q?: string } = {}) {
  await ensureSeeded();
  const conds = [];
  if (opts.competition) conds.push(eq(teams.competition, opts.competition));
  if (opts.q) conds.push(or(ilike(teams.name, `%${opts.q}%`), ilike(teams.city, `%${opts.q}%`)));
  return db.select().from(teams).where(conds.length ? and(...conds) : undefined).orderBy(asc(teams.competition), asc(teams.name));
}

export async function getTeamBySlug(slug: string) {
  await ensureSeeded();
  const [t] = await db.select().from(teams).where(eq(teams.slug, slug));
  return t ?? null;
}

export async function getPlayers(teamId: number) {
  return db.select().from(players).where(eq(players.teamId, teamId)).orderBy(asc(players.number));
}

// ---------- Games ----------
const home = alias(teams, "home");
const away = alias(teams, "away");

async function queryGames(where: ReturnType<typeof and> | undefined, order: "asc" | "desc", limit?: number): Promise<Game[]> {
  await ensureSeeded();
  const q = db
    .select({ game: games, home, away })
    .from(games)
    .innerJoin(home, eq(games.homeTeamId, home.id))
    .innerJoin(away, eq(games.awayTeamId, away.id))
    .where(where)
    .orderBy(order === "asc" ? asc(games.startsAt) : desc(games.startsAt));
  const rows = limit ? await q.limit(limit) : await q;
  return rows.map((r) => ({ ...r.game, home: r.home, away: r.away }));
}

function startOfDay(offset = 0) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + offset);
  return d;
}

export async function getUpcomingGames(opts: { when?: string; competition?: string; limit?: number; q?: string } = {}) {
  const conds = [eq(games.status, "scheduled")];
  const now = new Date();
  if (opts.when === "hoje") conds.push(gte(games.startsAt, now), lt(games.startsAt, startOfDay(1)));
  else if (opts.when === "amanha") conds.push(gte(games.startsAt, startOfDay(1)), lt(games.startsAt, startOfDay(2)));
  else if (opts.when === "semana") conds.push(gte(games.startsAt, now), lt(games.startsAt, startOfDay(7)));
  else conds.push(gte(games.startsAt, now));
  if (opts.competition) conds.push(eq(games.competition, opts.competition));
  if (opts.q) conds.push(or(ilike(home.name, `%${opts.q}%`), ilike(away.name, `%${opts.q}%`), ilike(games.competition, `%${opts.q}%`))!);
  return queryGames(and(...conds), "asc", opts.limit);
}

export async function getResults(opts: { competition?: string; limit?: number; q?: string } = {}) {
  const conds = [eq(games.status, "finished")];
  if (opts.competition) conds.push(eq(games.competition, opts.competition));
  if (opts.q) conds.push(or(ilike(home.name, `%${opts.q}%`), ilike(away.name, `%${opts.q}%`))!);
  return queryGames(and(...conds), "desc", opts.limit);
}

export async function getGameById(id: number) {
  const rows = await queryGames(eq(games.id, id), "asc", 1);
  return rows[0] ?? null;
}

export async function getTeamGames(teamId: number) {
  const teamCond = or(eq(games.homeTeamId, teamId), eq(games.awayTeamId, teamId));
  const upcoming = await queryGames(and(teamCond, eq(games.status, "scheduled")), "asc", 5);
  const results = await queryGames(and(teamCond, eq(games.status, "finished")), "desc", 5);
  return { upcoming, results };
}

// ---------- News ----------
export async function getNews(opts: { category?: string; q?: string; limit?: number; teamId?: number } = {}) {
  await ensureSeeded();
  const conds = [];
  if (opts.category) conds.push(eq(news.category, opts.category));
  if (opts.q) conds.push(or(ilike(news.title, `%${opts.q}%`), ilike(news.summary, `%${opts.q}%`)));
  if (opts.teamId) conds.push(eq(news.teamId, opts.teamId));
  const q = db.select().from(news).where(conds.length ? and(...conds) : undefined).orderBy(desc(news.publishedAt));
  return opts.limit ? q.limit(opts.limit) : q;
}

export async function getNewsBySlug(slug: string) {
  await ensureSeeded();
  const [n] = await db.select().from(news).where(eq(news.slug, slug));
  return n ?? null;
}

export async function search(q: string) {
  if (!q.trim()) return { products: [], news: [], teams: [], games: [] };
  const [p, n, t, g] = await Promise.all([
    getProducts({ q }),
    getNews({ q }),
    getTeams({ q }),
    getUpcomingGames({ q }),
  ]);
  return { products: p, news: n, teams: t, games: g };
}
