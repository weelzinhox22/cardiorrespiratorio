import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

// Otimizar carregamento da fonte
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap", // Garantir que o texto seja exibido mesmo enquanto a fonte carrega
  preload: true,
});

export const metadata = {
  title: "Cardio Site - Fisioterapia Cardiorrespiratória",
  description: "Site dedicado ao estudo da fisioterapia cardiorrespiratória",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* Preload das imagens críticas */}
        <link 
          rel="preload" 
          href="/images/hero-bg.jpg" 
          as="image"
          type="image/jpeg"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {/* Variáveis CSS para o sistema de design consistente */}
        <div className="contents [--primary-rgb:38,38,38] [--secondary-rgb:99,102,241] [--accent-rgb:16,185,129]">
          <div className="contents [--primary:hsl(0,0%,15%)] [--primary-light:hsl(0,0%,25%)] [--primary-dark:hsl(0,0%,0%)]">
            <div className="contents [--secondary:hsl(244,92%,67%)] [--secondary-light:hsl(244,92%,77%)] [--secondary-dark:hsl(244,92%,57%)]">
              <div className="contents [--accent:hsl(160,84%,39%)] [--accent-light:hsl(160,84%,49%)] [--accent-dark:hsl(160,84%,29%)]">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
