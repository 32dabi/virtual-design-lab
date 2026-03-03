const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src="/images/hero-bg.png" alt="Ambiente ELEVARE" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <div className="gold-line mx-auto mb-8" />
        <h1 className="text-6xl md:text-8xl font-heading font-light tracking-[0.4em] text-gold glow-gold mb-4">
          ELEVARE
        </h1>
        <p className="text-lg md:text-xl font-heading font-normal tracking-[0.2em] uppercase text-foreground/60 mb-2">
          Cores e Formas
        </p>
        <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto mb-10">
          Painéis WPC e Bamboo Carbon que transformam espaços em experiências únicas
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#catalogo" className="px-8 py-3 bg-gold text-background font-semibold tracking-wider uppercase text-sm rounded hover:bg-gold/90 transition-colors">
            Ver Catálogo
          </a>
          <a href="#contato" className="px-8 py-3 border border-gold/40 text-gold font-semibold tracking-wider uppercase text-sm rounded hover:bg-gold/10 transition-colors">
            Solicitar Orçamento
          </a>
        </div>
        <div className="gold-line mx-auto mt-8" />
      </div>
    </section>
  );
};

export default HeroSection;
