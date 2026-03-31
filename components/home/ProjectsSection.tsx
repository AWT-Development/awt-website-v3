import Link from "next/link";

const projects = [
  {
    id: "invest-alpha",
    name: "Portal Invest Alpha",
    category: "Sistemas Web",
    description: "Redesenho completo da plataforma de investimentos, focando em visualização de dados em tempo real e performance de carregamento."
  },
  {
    id: "minimalist-store",
    name: "Minimalist Store",
    category: "E-Commerce",
    description: "Desenvolvimento de e-commerce headless com foco em experiência de compra ultra-rápida e design minimalista editorial."
  }
];

export default function ProjectsSection() {
  return (
    <section id="projetos" className="w-full py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span className="text-primary text-sm font-headline tracking-widest uppercase block mb-4">Portfólio</span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold max-w-xl">
              Projetos em Destaque.
            </h2>
          </div>
          <Link 
            href="#todos" 
            className="flex items-center gap-2 group text-primary-text font-medium text-sm hover:text-primary transition-colors uppercase tracking-widest"
          >
            Ver todos os projetos 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <div key={project.id} className={`flex flex-col gap-6 ${index % 2 === 1 ? 'md:mt-16' : ''}`}>
              {/* Project Image Placeholder - using "No-Line" rule with tonal elevation */}
              <div className="w-full md:w-[90%] lg:w-[85%] aspect-[4/3] md:aspect-video bg-surface rounded-2xl overflow-hidden relative group">
                {/* Simulated inner image container (Project Preview design spec) */}
                <div className="absolute inset-4 bg-surface-elevated rounded-xl group-hover:scale-[1.02] duration-500 ease-out flex items-center justify-center">
                  <span className="text-border-subtle/30 font-headline font-bold text-4xl">{project.name.charAt(0)}</span>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500"></div>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold px-3 py-1 bg-surface-deep text-primary rounded-full uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-2xl font-headline font-bold text-primary-text mb-3">
                  {project.name}
                </h3>
                <p className="text-secondary-text leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
