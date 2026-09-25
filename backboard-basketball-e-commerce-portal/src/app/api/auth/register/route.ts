import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createSession, hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password || password.length < 6) return Response.json({ error: "Preencha todos os campos (senha com no mínimo 6 caracteres)." }, { status: 400 });
  const [existing] = await db.select({ id: users.id }).from(users).where(eq(users.email, email.toLowerCase()));
  if (existing) return Response.json({ error: "Este e-mail já está cadastrado." }, { status: 409 });
  const [user] = await db.insert(users).values({ name, email: email.toLowerCase(), passwordHash: hashPassword(password) }).returning({ id: users.id });
  await createSession(user.id);
  return Response.json({ ok: true });
}
