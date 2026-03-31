"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import LogoAwtDefault from "../../assets/awtHeaderLogo.png";
import LogoAwtDarkOrange from "../../assets/awtHeaderLogoDarkOrange.png";
import LogoAwtPurple from "../../assets/awtHeaderLogoPurple.png";

export default function Header() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch by rendering default on server, then switching on client
  const logoSrc = !mounted
    ? LogoAwtDefault
    : resolvedTheme === "light"
      ? LogoAwtDarkOrange
      : resolvedTheme === "dark-purple"
        ? LogoAwtPurple
        : LogoAwtDefault; // fallback for 'dark'

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border-subtle/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* Logo container */}
          <div className="w-32 h-32 rounded-sm flex items-center justify-center pt-2">
            <Image src={logoSrc} alt="Logo AWT Development" className="w-full h-auto" />
          </div>
        </Link>
        
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link href="#projetos" className="text-sm font-medium hover:text-primary transition-colors text-secondary-text">Projetos</Link>
          <Link href="#servicos" className="text-sm font-medium hover:text-primary transition-colors text-secondary-text">Serviços</Link>
          <Link href="#sobre" className="text-sm font-medium hover:text-primary transition-colors text-secondary-text">Quem Somos</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="#contato"
            className="hidden md:flex items-center justify-center h-10 px-6 rounded-md bg-surface border border-border-subtle/20 text-sm font-medium hover:border-primary/50 hover:text-primary transition-all"
          >
            Fale Conosco
          </Link>
          {/* Mobile menu button mock */}
          <button className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none">
            <div className="w-5 h-0.5 bg-primary-text rounded-full"></div>
            <div className="w-5 h-0.5 bg-primary-text rounded-full"></div>
          </button>
        </div>
      </div>
    </header>
  );
}
