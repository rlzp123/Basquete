import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[80vh] flex-col items-center justify-center pt-24 text-center">
      <p className="text-8xl font-black text-brand">404</p>
      <h1 className="mt-4 text-2xl font-bold text-white">Airball! Página não encontrada.</h1>
      <p className="mt-2 text-zinc-400">O conteúdo que você procura não existe ou foi movido.</p>
      <Link href="/" className="btn-primary mt-6">Voltar ao início</Link>
    </div>
  );
}
