import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return Response.json({ error: "invalid" }, { status: 400 });
  await db.insert(newsletterSubscribers).values({ email: email.toLowerCase() }).onConflictDoNothing();
  return Response.json({ ok: true });
}
