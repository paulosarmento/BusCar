import type React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RJ Transfer — Transporte Particular para o Rio de Janeiro",
  description:
    "Serviço de transporte particular e confortável para o Rio de Janeiro. Atendemos Copacabana, Ipanema, Cristo Redentor, Galeão e Santos Dumont com preço fixo e segurança.",
  keywords:
    "transporte particular, Rio de Janeiro, Copacabana, Ipanema, Cristo Redentor, Galeão, Santos Dumont, viagem, motorista, conforto, RJ Transfer",
  authors: [{ name: "RJ Transfer" }],
  openGraph: {
    title: "RJ Transfer — Transporte Particular para o Rio de Janeiro",
    description:
      "Viagens com conforto e segurança para o Rio de Janeiro — Copacabana, Ipanema, Cristo Redentor, Galeão e Santos Dumont.",
    type: "website",
    locale: "pt_BR",
    url: "https://rjtransfer.com.br", // coloque o domínio real se tiver
    siteName: "RJ Transfer",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "Next.js 14",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Meta viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body
        style={{
          margin: 0,
          fontFamily: "Poppins, sans-serif",
          backgroundColor: "#FFFFFF",
          color: "#1A1A1A",
        }}
      >
        {children}
      </body>
    </html>
  );
}
