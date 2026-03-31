import Link from "next/link";

const services = [
  {
    id: "landing-pages",
    title: "Landing Pages",
    description: "Páginas de alta conversão focadas em transformar visitantes em clientes reais através de UX otimizada."
  },
  {
    id: "sites",
    title: "Sites Institucionais",
    description: "A presença digital da sua marca com autoridade, design premium e performance técnica superior."
  },
  {
    id: "sistemas",
    title: "Sistemas Web",
    description: "Aplicações complexas, dashboards e ferramentas internas desenvolvidas para otimizar processos."
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    description: "Plataformas de venda robustas e seguras com integração de pagamentos e logística fluída."
  },
  {
    id: "suporte",
    title: "Suporte e Manutenção",
    description: "Garantia de que seu projeto continue rodando com segurança, atualizado e sem quedas."
  },
  {
    id: "integracoes",
    title: "Integrações",
    description: "Conectamos seu sistema com APIs externas, CRMs e ferramentas de automação de mercado."
  }
];

export default function ServicesSection() {
  return (
    <section id="servicos" className="w-full py-24 bg-surface-deep">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-primary text-sm font-headline tracking-widest uppercase block mb-4">Nossa Expertise</span>
          <h2 className="font-headline text-3xl md:text-5xl font-bold max-w-2xl mb-6">
            Soluções sob medida desenhadas para escalar o seu negócio.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-surface rounded-2xl p-8 hover:bg-surface-elevated transition-colors border border-transparent hover:border-white/5 group flex flex-col"
            >
              <h3 className="text-xl font-headline font-bold text-primary-text mb-4 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-secondary-text leading-relaxed text-sm mb-8 flex-grow">
                {service.description}
              </p>
              <Link 
                href="#contato" 
                className="inline-flex items-center gap-2 text-primary text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity uppercase tracking-wider mt-auto"
              >
                Saber Mais
                <span className="text-lg leading-none group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
