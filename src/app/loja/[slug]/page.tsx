import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";
import { ProductDetail } from "@/components/product-detail";
import { ProductCard } from "@/components/product-card";
import { SectionHeader } from "@/components/cards";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const { same, others } = await getRelatedProducts(product);

  return (
    <div className="container-x pt-28 lg:pt-36">
      <nav className="mb-6 text-xs text-zinc-500">
        <Link href="/" className="hover:text-white">Início</Link> / <Link href="/loja" className="hover:text-white">Loja</Link> / <Link href={`/loja?categoria=${product.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} className="hover:text-white">{product.category}</Link> / <span className="text-zinc-300">{product.name}</span>
      </nav>
      <ProductDetail product={product} />

      {same.length > 0 && (
        <section className="mt-24">
          <SectionHeader eyebrow="Relacionados" title="Produtos relacionados" href={`/loja?categoria=${product.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{same.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </section>
      )}
      <section className="mt-20">
        <SectionHeader eyebrow="Para você" title="Você também pode gostar" href="/loja" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{others.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>
    </div>
  );
}
