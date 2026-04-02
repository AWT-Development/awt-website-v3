"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

import Instagram from "@/assets/instagram.svg";
import AwtFooterLogoDefault from "@/assets/awtFooterLogo.png";
import AwtFooterLogoDarkOrange from "@/assets/awtFooterLogoDarkOrange.png";
import AwtFooterLogoPurple from "@/assets/awtFooterLogoPurple.png";

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = !mounted
    ? AwtFooterLogoDefault
    : resolvedTheme === "light"
      ? AwtFooterLogoDarkOrange
      : resolvedTheme === "dark-purple"
        ? AwtFooterLogoPurple
        : AwtFooterLogoDefault; // fallback for 'dark'

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full bg-surface-deep pt-16 pb-8 border-t border-border-subtle/10 mt-auto"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2 space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <Image src={logoSrc} alt="AWT Development Footer Logo" className="w-48 h-auto" />
          </div>
          <p className="text-secondary-text max-w-sm leading-relaxed">
            Elevamos o padrão do desenvolvimento web. Criamos infraestruturas digitais que suportam o crescimento acelerado do seu negócio.
          </p>
        </div>

        <div>
          <h4 className="font-headline font-medium text-primary-text mb-6">Navegação</h4>
          <ul className="space-y-4">
            <li><Link href="/" className="text-secondary-text hover:text-primary transition-colors text-sm">Home</Link></li>
            <li><Link href="#servicos" className="text-secondary-text hover:text-primary transition-colors text-sm">Serviços</Link></li>
            <li><Link href="#projetos" className="text-secondary-text hover:text-primary transition-colors text-sm">Projetos</Link></li>
            <li><Link href="#contato" className="text-secondary-text hover:text-primary transition-colors text-sm">Contato</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-medium text-primary-text mb-6">Contato</h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-sm text-secondary-text">
              <MapPin className="text-primary w-5 h-5 flex-shrink-0" />
              Goiânia, GO - Brasil
            </li>
            <li className="flex items-center gap-3 text-sm text-secondary-text">
              <Phone className="text-primary w-5 h-5 flex-shrink-0" />
              +55 62 8315-5703
            </li>
            <li className="flex items-center gap-3 text-sm text-secondary-text">
              <Mail className="text-primary w-5 h-5 flex-shrink-0" />
              awtdevelopment@gmail.com
            </li>
            <li className="flex items-center gap-3 text-sm text-secondary-text">
              <Image src={Instagram} alt="Instagram" className="w-5 h-5 flex-shrink-0" />
              @awtdevelopment (instagram)
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-border-subtle/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-secondary-text">
          © {new Date().getFullYear()} AWT Development. Todos os direitos reservados.
        </p>
        <div className="flex gap-4">
          <Link href="#" className="text-xs text-secondary-text hover:text-primary-text transition-colors">Privacy Policy</Link>
          <Link href="#" className="text-xs text-secondary-text hover:text-primary-text transition-colors">Terms of Service</Link>
        </div>
      </div>
    </motion.footer>
  );
}
