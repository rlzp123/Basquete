import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  numeric,
  jsonb,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  salePrice: numeric("sale_price", { precision: 10, scale: 2 }),
  rating: numeric("rating", { precision: 2, scale: 1 }).notNull().default("4.5"),
  reviews: integer("reviews").notNull().default(0),
  images: jsonb("images").$type<string[]>().notNull(),
  sizes: jsonb("sizes").$type<string[]>().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  badge: text("badge"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  short: text("short").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  competition: text("competition").notNull(),
  color: text("color").notNull(),
  founded: integer("founded").notNull(),
  arena: text("arena").notNull(),
  coach: text("coach").notNull(),
  titles: integer("titles").notNull().default(0),
  description: text("description").notNull(),
});

export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").notNull(),
  name: text("name").notNull(),
  number: integer("number").notNull(),
  position: text("position").notNull(),
  height: text("height").notNull(),
  age: integer("age").notNull(),
});

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  homeTeamId: integer("home_team_id").notNull(),
  awayTeamId: integer("away_team_id").notNull(),
  competition: text("competition").notNull(),
  startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
  status: text("status").notNull(), // scheduled | live | finished
  homeScore: integer("home_score"),
  awayScore: integer("away_score"),
  venue: text("venue").notNull(),
});

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
  author: text("author").notNull(),
  teamId: integer("team_id"),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull(),
  featured: boolean("featured").notNull().default(false),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: integer("user_id").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  items: jsonb("items")
    .$type<{ productId: number; name: string; qty: number; price: number; size?: string; image: string }[]>()
    .notNull(),
  subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull(),
  shipping: numeric("shipping", { precision: 10, scale: 2 }).notNull(),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("Confirmado"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
