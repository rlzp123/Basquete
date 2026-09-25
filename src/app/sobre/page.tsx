import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { BallIcon, BoltIcon, CartIcon, ShieldIcon, TrophyIcon, UserIcon } from "@/components/icons";

export const metadata = { title: "Sobre" };

const PILLARS = [
  { icon: CartIcon, t: "Produtos", d: "Equipamentos e vestuário com tecnologia de quadra, selecionados para quem leva o jogo a sério." },
  { icon: BoltIcon, t: "Notícias", d: "Cobertura diária da NBA, do basquete nacional e internacional, do mercado e dos bastidores." },
  { icon: BallIcon, t: "Jogos", d: "Calendário completo com datas, horários, placares e detalhes das partidas." },
  { icon: ShieldIcon, t: "Times", d: "Perfis de franquias e clubes com elenco, histórico, resultados e próximos confrontos." },
  { icon: TrophyIcon, t: "Competições", d: "Informações sobre ligas, torneios e a corrida por títulos ao redor do mundo." },
  { icon: UserIcon, t: "Comunidade", d: "Um espaço para quem vive o basquete como cultura, estilo de vida e paixão." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="Sobre a Backboard" title="Mais que um esporte. Uma cultura." image="/images/hero.jpg" />
      <div className="container-x py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-2xl font-bold leading-snug text-white sm:text-3xl">“A Backboard nasceu para conectar quem vive o basquete dentro e fora das quadras.”</p>
            <div className="prose-bb mt-6">
              <p>Somos uma plataforma que une loja virtual e portal esportivo em uma única experiência. Aqui você encontra produtos, notícias, jogos, times e informações sobre competições — tudo pensado para quem respira basquete.</p>
              <p>Acreditamos que o basquete não é apenas um esporte: é uma cultura e uma comunidade. Está na música, na moda, nas quadras de rua e nas grandes arenas. A Backboard existe para celebrar e conectar cada parte desse universo.</p>
              <p>Velocidade, competitividade, energia e tecnologia guiam tudo o que fazemos — do design dos nossos produtos à cobertura das partidas.</p>
            </div>
            <div className="mt-8 flex gap-3"><Link href="/loja" className="btn-primary">Conhecer a loja</Link><Link href="/contato" className="btn-ghost">Fale conosco</Link></div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/arena.jpg" alt="Arena de basquete" className="aspect-[4/5] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-4 text-center">
              {[["2026", "Fundação"], ["3", "Ligas cobertas"], ["+50k", "Comunidade"]].map(([v, l]) => <div key={l}><p className="text-2xl font-black text-white">{v}</p><p className="text-[11px] uppercase tracking-wider text-zinc-400">{l}</p></div>)}
            </div>
          </div>
        </div>

        <section className="mt-24">
          <p className="eyebrow">O que reunimos</p>
          <h2 className="h-section mt-2">Um ecossistema completo</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.t} className="card card-hover p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand/15 text-brand-light"><p.icon /></span>
                <h3 className="mt-4 text-lg font-bold text-white">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.d}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
