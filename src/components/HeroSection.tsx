const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient: black -> green -> black */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#2D6B4F] to-background" />

      {/* Decorative vertical lines */}
      <div className="absolute inset-0 flex justify-between px-[15%] pointer-events-none">
        <div className="w-px h-full bg-gold/5" />
        <div className="w-px h-full bg-gold/5" />
        <div className="w-px h-full bg-gold/5" />
      </div>

      {/* Hero image overlay */}
      <div className="absolute inset-0">
        <img src="/images/hero-bg.png" alt="Ambiente ELEVARE" className="w-full h-full object-cover opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <div className="gold-line mx-auto mb-8" />
        <h1 className="text-6xl md:text-8xl font-heading font-light tracking-[0.4em] text-gold glow-gold mb-4">
          ELEVARE
        </h1>
        <p className="text-lg md:text-xl font-heading font-normal tracking-[0.2em] uppercase mb-2 text-gold/80">
          Cores e Formas
        </p>
        <p className="text-sm md:text-base text-foreground/90 max-w-lg mx-auto mb-10">
          Painéis WPC e Bamboo Carbon que transformam espaços em experiências únicas
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#catalogo"
            className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#E8C547] text-background font-semibold tracking-wider uppercase text-sm rounded hover:opacity-90 transition-opacity flex items-center justify-center"
          >
            Ver Catálogo
          </a>
          <a
            href="#contato"
            className="px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#E8C547] text-background font-bold tracking-wider uppercase text-sm rounded shadow-[0_0_20px_hsl(43_62%_52%/0.4)] hover:shadow-[0_0_30px_hsl(43_62%_52%/0.6)] hover:scale-105 transition-all duration-300"
          >
            Solicitar Orçamento
          </a>
        </div>
        <div className="gold-line mx-auto mt-8" />
      </div>
    </section>
  );
};

export default HeroSection;
