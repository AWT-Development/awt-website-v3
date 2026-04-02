import type { Metadata } from "next";
import { Alexandria, Aldrich } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import { ThemeSwitcher } from "../components/theme/ThemeSwitcher";

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["latin"],
});

const aldrich = Aldrich({
  weight: "400",
  variable: "--font-aldrich",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AWT Development | Arquitetura Digital de Alta Performance",
  description: "Desenvolvemos soluções digitais de alta performance com precisão técnica e design orientado a resultados. A arquitetura do seu sucesso começa aqui.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${alexandria.variable} ${aldrich.variable} antialiased h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans bg-background text-primary-text transition-colors duration-500">
        <ThemeProvider>
          {children}
          <ThemeSwitcher />
        </ThemeProvider>
      </body>
    </html>
  );
}
