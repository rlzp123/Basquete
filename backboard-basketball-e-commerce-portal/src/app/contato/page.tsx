import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/icons";

export const metadata = { title: "Contato" };

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Fale conosco" title="Contato" description="Dúvidas sobre pedidos, parcerias, imprensa ou sugestões? Nosso time responde em até 1 dia útil." />
      <div className="container-x grid gap-10 py-12 lg:grid-cols-[1fr_360px]">
        <div className="card p-6 sm:p-8"><ContactForm /></div>
        <aside className="space-y-4">
          {[[MailIcon, "E-mail", "contato@backboard.com.br"], [PhoneIcon, "Telefone", "+55 (11) 4000-2026"], [PinIcon, "Endereço", "Av. das Arenas, 23 — São Paulo, SP"]].map(([I, l, v]) => {
            const Icon = I as typeof MailIcon;
            return <div key={l as string} className="card flex items-center gap-4 p-5"><span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/15 text-brand-light"><Icon /></span><div><p className="text-[11px] uppercase tracking-wider text-zinc-500">{l as string}</p><p className="font-semibold text-white">{v as string}</p></div></div>;
          })}
          <div className="card p-5"><p className="text-[11px] uppercase tracking-wider text-zinc-500">Horário de atendimento</p><p className="mt-1 font-semibold text-white">Segunda a sexta, 9h às 18h</p><p className="text-sm text-zinc-400">Sábados, 9h às 13h</p></div>
        </aside>
      </div>
    </>
  );
}
