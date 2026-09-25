import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createSession, verifyPassword } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) return Response.json({ error: "Informe e-mail e senha." }, { status: 400 });
  const [user] = await db.select().from(users).where(eq(users.email, String(email).toLowerCase()));
  if (!user || !verifyPassword(password, user.passwordHash)) return Response.json({ error: "E-mail ou senha inválidos." }, { status: 401 });
  await createSession(user.id);
  return Response.json({ ok: true });
}
