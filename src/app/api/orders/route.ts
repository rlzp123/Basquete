import { db } from "@/db";
import { orders } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json();
  const items = Array.isArray(body.items) ? body.items : [];
  if (!items.length) return Response.json({ error: "empty" }, { status: 400 });
  const subtotal = items.reduce((s: number, i: { price: number; qty: number }) => s + Number(i.price) * Number(i.qty), 0);
  const shipping = subtotal >= 299 ? 0 : 24.9;
  const [order] = await db
    .insert(orders)
    .values({
      userId: user.id,
      items: items.map((i: { productId: number; name: string; qty: number; price: number; size?: string; image: string }) => ({ productId: i.productId, name: i.name, qty: i.qty, price: Number(i.price), size: i.size, image: i.image })),
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      total: (subtotal + shipping).toFixed(2),
    })
    .returning({ id: orders.id });
  return Response.json({ id: order.id });
}
