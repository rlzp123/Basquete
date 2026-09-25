import { getProductsByIds } from "@/lib/data";

export async function GET(req: Request) {
  const ids = (new URL(req.url).searchParams.get("ids") || "").split(",").map(Number).filter((n) => Number.isFinite(n) && n > 0);
  const items = await getProductsByIds(ids);
  return Response.json(items);
}
