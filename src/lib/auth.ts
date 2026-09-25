import { cookies } from "next/headers";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { db } from "@/db";
import { sessions, users } from "@/db/schema";
import { and, eq, gt } from "drizzle-orm";

const COOKIE = "bb_session";
const WEEK = 7 * 24 * 60 * 60 * 1000;

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const original = Buffer.from(hash, "hex");
  return candidate.length === original.length && timingSafeEqual(candidate, original);
}

export async function createSession(userId: number) {
  const id = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + WEEK);
  await db.insert(sessions).values({ id, userId, expiresAt });
  const store = await cookies();
  store.set(COOKIE, id, { httpOnly: true, sameSite: "lax", path: "/", expires: expiresAt });
}

export async function destroySession() {
  const store = await cookies();
  const id = store.get(COOKIE)?.value;
  if (id) await db.delete(sessions).where(eq(sessions.id, id));
  store.delete(COOKIE);
}

export async function getCurrentUser() {
  const store = await cookies();
  const id = store.get(COOKIE)?.value;
  if (!id) return null;
  const [row] = await db
    .select({ id: users.id, name: users.name, email: users.email, createdAt: users.createdAt })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(and(eq(sessions.id, id), gt(sessions.expiresAt, new Date())));
  return row ?? null;
}
