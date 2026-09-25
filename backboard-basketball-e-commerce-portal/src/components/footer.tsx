import Link from "next/link";
import { Logo } from "@/components/icons";
import { Newsletter } from "@/components/newsletter";

const SOCIAL = [
  { name: "Instagram", path: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.5-1.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" },
  { name: "TikTok", path: "M14 3v10.5a3 3 0 1 1-3-3v-3a6 6 0 1 0 6 6V8.5a6.5 6.5 0 0 0 3.5 1V6.5A3.5 3.5 0 0 1 17 3h-3Z" },
  { name: "YouTube", path: "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" },
  { name: "X", path: "M17.5 3h3l-7.3 8.3L21.8 21h-6.6l-4.6-6-5.3 6h-3l7.8-8.9L1.9 3h6.7l4.2 5.5L17.5 3Zm-1 16h1.7L7.6 4.8H5.8L16.5 19Z" },
  { name: "Facebook", path: "M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.5-1.5h1.5V5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9V11H8v3h2.5v7h3Z" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/8 bg-panel">
      <Newsletter />
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-lg font-bold text-white">Seu jogo. Sua paixão. Seu lugar.</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-400">O ecossistema digital de quem vive o basquete: loja, notícias, jogos e times em um só lugar.</p>
          <div className="mt-6 flex gap-2">
            {SOCIAL.map((s) => (
              <a key={s.name} href="#" aria-label={s.name} title={s.name} className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-zinc-400 transition hover:border-brand hover:bg-brand hover:text-white">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d={s.path} /></svg>
              </a>
            ))}
          </div>
        </div>
        <FooterCol title="Plataforma" links={[["Loja", "/loja"], ["Notícias", "/noticias"], ["Jogos", "/jogos"], ["Times", "/times"]]} />
        <FooterCol title="Backboard" links={[["Sobre", "/sobre"], ["Contato", "/contato"], ["Minha conta", "/perfil"], ["Carrinho", "/carrinho"]]} />
        <FooterCol title="Legal" links={[["Política de privacidade", "/privacidade"], ["Termos de uso", "/termos"]]} />
      </div>
      <div className="border-t border-white/8">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-zinc-500 sm:flex-row">
          <span>© 2026 Backboard. Todos os direitos reservados.</span>
          <span>Feito para quem não para.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map(([label, href]) => (
          <li key={href}><Link href={href} className="text-sm text-zinc-300 transition hover:text-brand-light">{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
