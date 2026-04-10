"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center py-20 overflow-hidden text-center">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full opacity-60 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center"
      >
        {/* Top Badge */}
        <div className="mb-6 sm:mb-8 mx-auto inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-border-subtle/20 bg-surface-deep/40 w-fit max-w-[90vw]">
          <span className="text-primary-text/80 text-[10px] sm:text-xs font-headline tracking-[0.1em] sm:tracking-[0.15em] font-medium uppercase truncate">
            AWT Development
          </span>
        </div>

        <h1 className="font-headline text-3xl min-[390px]:text-4xl sm:text-5xl md:text-6xl pt-2 sm:pt-4 lg:text-[84px] font-bold leading-[1.15] sm:leading-[1.1] tracking-tight mb-6 w-full max-[360px]:break-all sm:break-words">
          TRANSFORMANDO<br />
          <span className="text-primary">CÓDIGO</span> EM VALOR.
        </h1>

        {/* Sub-headline */}
        <p className="text-base min-[390px]:text-lg md:text-xl text-secondary-text mb-8 sm:mb-12 max-w-3xl leading-relaxed w-full">
          Transformamos sua ideia em realidade, seu negócio em sua vitrine virtual e sistemas web que aumentam sua produtividade e poupam seu tempo.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full px-2 sm:px-0">
          <Link
            href="#contato"
            className="inline-flex h-12 sm:h-14 items-center justify-center px-4 sm:px-10 rounded-full bg-primary text-surface font-sans font-bold text-xs min-[390px]:text-sm tracking-widest uppercase hover:shadow-[0_0_32px_rgba(255,122,0,0.3)] hover:scale-[1.02] transition-all w-full sm:w-auto"
          >
            Iniciar um Projeto
          </Link>
          <Link
            href="#projetos"
            className="inline-flex h-12 sm:h-14 items-center justify-center px-4 sm:px-10 rounded-full bg-transparent border border-border-subtle/30 text-primary-text font-sans font-bold text-xs min-[390px]:text-sm tracking-widest uppercase hover:bg-surface transition-all w-full sm:w-auto"
          >
            Ver Portfólio
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
