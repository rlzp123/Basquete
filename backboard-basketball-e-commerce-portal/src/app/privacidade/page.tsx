import { PageHeader } from "@/components/page-header";

export const metadata = { title: "Política de privacidade" };

export default function LegalPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Política de privacidade" description="Última atualização: janeiro de 2026." />
      <div className="container-x prose-bb max-w-3xl py-12">
        <p>Este documento descreve como a Backboard trata as informações dos usuários da plataforma, incluindo loja virtual, portal de notícias, calendário de jogos e área do usuário.</p>
        <p>Coletamos apenas os dados necessários para a operação do serviço: nome, e-mail, histórico de pedidos e preferências de navegação, como favoritos e carrinho. Esses dados não são compartilhados com terceiros sem consentimento.</p>
        <p>Ao utilizar a plataforma você concorda com o uso responsável das funcionalidades, com o respeito às regras da comunidade e com as condições comerciais apresentadas em cada compra, incluindo prazos de entrega e políticas de troca.</p>
        <p>Você pode solicitar a atualização ou exclusão de seus dados a qualquer momento pela página de contato. Dúvidas podem ser enviadas para contato@backboard.com.br.</p>
      </div>
    </>
  );
}
