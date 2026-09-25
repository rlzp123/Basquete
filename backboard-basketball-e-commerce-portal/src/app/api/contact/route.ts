import { db } from "@/db";
import { contactMessages } from "@/db/schema";

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();
  if (!name || !email || !subject || !message) return Response.json({ error: "invalid" }, { status: 400 });
  await db.insert(contactMessages).values({ name, email, subject, message });
  return Response.json({ ok: true });
}
