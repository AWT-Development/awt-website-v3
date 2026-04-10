"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import LogoAwtDefault from "@/assets/awtHeaderLogo.png";
import LogoAwtDarkOrange from "@/assets/awtHeaderLogoDarkOrange.png";
import LogoAwtPurple from "@/assets/awtHeaderLogoPurple.png";

export default function Header() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border-subtle/20"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2">
          {/* Logo container */}
          <div className="w-32 h-32 rounded-sm flex items-center justify-center pt-2">
            <Image src={logoSrc} alt="Logo AWT Development" className="w-full h-auto" />
          </div>
        </Link>

        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link href="#servicos" className="text-sm font-medium hover:text-primary transition-colors text-secondary-text">Serviços</Link>
          <Link href="#projetos" className="text-sm font-medium hover:text-primary transition-colors text-secondary-text">Projetos</Link>
          {/*<Link href="#sobre" className="text-sm font-medium hover:text-primary transition-colors text-secondary-text">Quem Somos</Link>*/}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="#contato"
            className="hidden md:flex items-center justify-center h-10 px-6 rounded-md bg-surface border border-border-subtle/20 text-sm font-medium hover:border-primary/50 hover:text-primary transition-all"
          >
            Fale Conosco
          </Link>
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
            aria-label="Toggle menu"
          >
            <motion.div 
              animate={isMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-primary-text rounded-full"
            />
            <motion.div 
              animate={isMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-primary-text rounded-full"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden w-full absolute top-20 left-0 bg-background/95 backdrop-blur-xl border-b border-border-subtle/20 shadow-xl"
          >
            <nav className="flex flex-col p-6 gap-6 items-center">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium hover:text-primary transition-colors">Home</Link>
              <Link href="#servicos" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium hover:text-primary transition-colors text-secondary-text">Serviços</Link>
              <Link href="#projetos" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium hover:text-primary transition-colors text-secondary-text">Projetos</Link>
              <Link
                href="#contato"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 flex items-center justify-center h-12 w-full max-w-xs rounded-md bg-primary text-surface font-sans font-bold text-sm tracking-widest uppercase hover:shadow-[0_0_32px_rgba(255,122,0,0.3)] transition-all"
              >
                Fale Conosco
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
