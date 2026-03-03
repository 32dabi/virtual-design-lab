const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background (aurora boreal) */}
      <div className="absolute inset-0 hero-gradient-animated" />

      {/* Animated rippled lines */}
      <div className="absolute inset-0 flex justify-between px-[10%] pointer-events-none">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="w-px h-full ripple-line"
            style={{ animationDelay: `${i * 0.7}s` }}
          />
        ))}
      </div>

      {/* Hero image overlay */}
      <div className="absolute inset-0">
        <img src="/images/hero-bg.png" alt="Ambiente ELEVARE" className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <div className="gold-line mx-auto mb-8" />
        <img
          src="/images/Logo_ELEVARE.png"
          alt="ELEVARE"
          className="h-16 md:h-24 mx-auto mb-4 drop-shadow-[0_0_40px_rgba(212,175,55,0.4)]"
        />
        <p className="text-lg md:text-xl font-heading font-normal tracking-[0.2em] uppercase mb-2 text-gold/80">
          Cores e Formas
        </p>
        <p className="text-sm md:text-base text-foreground/90 max-w-lg mx-auto mb-10 font-body">
          Painéis WPC e Bamboo Carbon que transformam espaços em experiências únicas
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#catalogo"
            className="px-8 py-3 bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))] text-background font-semibold tracking-wider uppercase text-sm rounded hover:opacity-90 transition-opacity flex items-center justify-center font-subtitle"
          >
            Ver Catálogo
          </a>
          <a
            href="#contato"
            className="px-10 py-4 bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))] text-background font-bold tracking-wider uppercase text-sm rounded shadow-[0_0_20px_hsl(43_62%_52%/0.4)] hover:shadow-[0_0_30px_hsl(43_62%_52%/0.6)] hover:scale-105 transition-all duration-300 font-subtitle"
          >
            Solicitar Orçamento
          </a>
        </div>
        <a
          href="/sobre"
          className="inline-block mt-6 text-sm text-foreground/60 hover:text-gold underline underline-offset-4 transition-colors font-body"
        >
          Conheça nossa história &gt;
        </a>
        <div className="gold-line mx-auto mt-8" />
      </div>
    </section>
  );
};

export default HeroSection;
