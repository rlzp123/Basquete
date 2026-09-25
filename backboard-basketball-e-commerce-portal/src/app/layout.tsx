import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { StoreProvider } from "@/components/store-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: { default: "Backboard — Loja e portal de basquete", template: "%s | Backboard" },
  description: "Produtos, notícias, jogos e tudo que acontece no mundo do basquete em um só lugar.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser().catch(() => null);
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-ink text-zinc-100 antialiased">
        <StoreProvider>
          <Navbar user={user ? { name: user.name } : null} />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
