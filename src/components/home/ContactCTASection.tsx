import Link from "next/link";

export default function ContactCTASection() {
  return (
    <section id="contato" className="w-full py-32 bg-background relative overflow-hidden">
      {/* Background graphic element */}
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="font-headline text-4xl md:text-6xl font-bold mb-8">
          Pronto para tirar sua<br />
          <span className="text-primary italic font-light font-sans">ideia do papel?</span>
        </h2>

        <p className="text-lg md:text-xl text-secondary-text mb-12 max-w-2xl mx-auto leading-relaxed">
          Entre em contato agora mesmo e descubra como nossa arquitetura digital pode escalar os resultados do seu negócio.
        </p>

        <Link
          href="mailto:awtdevelopment@gmail.com"
          className="inline-flex h-16 items-center justify-center px-10 rounded-full bg-primary text-surface font-headline font-bold text-lg hover:shadow-[0_0_40px_rgba(255,122,0,0.4)] hover:-translate-y-1 transition-all duration-300"
        >
          Entre em Contato
        </Link>
      </div>
    </section>
  );
}
