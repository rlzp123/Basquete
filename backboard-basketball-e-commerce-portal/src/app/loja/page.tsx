import Link from "next/link";
import { CATEGORIES, categoryBySlug, getProducts } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { PageHeader } from "@/components/page-header";

export const metadata = { title: "Loja" };

type SP = Promise<{ categoria?: string; q?: string; ordenar?: string; oferta?: string }>;

export default async function LojaPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const products = await getProducts({ category: sp.categoria, q: sp.q, sort: sp.ordenar, onSale: sp.oferta === "1" });
  const cat = categoryBySlug(sp.categoria);

  const link = (patch: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    const merged = { ...sp, ...patch };
    Object.entries(merged).forEach(([k, v]) => v && p.set(k, v));
    const s = p.toString();
    return `/loja${s ? `?${s}` : ""}`;
  };

  return (
    <>
      <PageHeader eyebrow="Loja Backboard" title={cat ? cat.name : "Encontre seu equipamento"} description="Camisetas, tênis, bolas e acessórios com tecnologia de quadra e estilo de rua." image="/images/products/shoes.jpg" />
      <div className="container-x py-10">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <Link href={link({ categoria: undefined })} className={`chip whitespace-nowrap ${!sp.categoria ? "chip-active" : ""}`}>Todos</Link>
            {CATEGORIES.map((c) => (
              <Link key={c.slug} href={link({ categoria: c.slug })} className={`chip whitespace-nowrap ${sp.categoria === c.slug ? "chip-active" : ""}`}>{c.name}</Link>
            ))}
            <Link href={link({ oferta: sp.oferta === "1" ? undefined : "1" })} className={`chip whitespace-nowrap ${sp.oferta === "1" ? "chip-active" : ""}`}>Ofertas</Link>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-zinc-500">Ordenar:</span>
            {[["", "Relevância"], ["price-asc", "Menor preço"], ["price-desc", "Maior preço"], ["rating", "Avaliação"]].map(([v, l]) => (
              <Link key={v} href={link({ ordenar: v || undefined })} className={`rounded-md px-2.5 py-1.5 font-semibold transition ${(sp.ordenar ?? "") === v ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white"}`}>{l}</Link>
            ))}
          </div>
        </div>

        {sp.q && <p className="mb-6 text-sm text-zinc-400">Resultados para <span className="font-semibold text-white">“{sp.q}”</span> · <Link href={link({ q: undefined })} className="text-brand-light">limpar</Link></p>}

        {products.length === 0 ? (
          <div className="card p-16 text-center text-zinc-400">Nenhum produto encontrado com esses filtros.</div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </>
  );
}
