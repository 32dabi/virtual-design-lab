import { useState } from 'react';

const HeroSection = () => {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 hero-gradient-animated" />

      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ${
            videoReady ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
          aria-hidden="true"
        />

        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-bg.png"
          onCanPlay={() => setVideoReady(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/90" />
      </div>

      <div className={`absolute inset-0 flex justify-between px-[10%] pointer-events-none transition-opacity duration-700 ${videoReady ? 'opacity-100' : 'opacity-40'}`}>
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="w-px h-full ripple-line"
            style={{ animationDelay: `${i * 0.7}s` }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6">
        <div className="gold-line mx-auto mb-8" />
        <h1 className="font-logo text-6xl md:text-8xl lg:text-9xl text-gold tracking-[0.15em] uppercase glow-gold mb-4">
          ELEVARE
        </h1>
        <p className="text-xl md:text-2xl font-heading font-normal tracking-[0.2em] uppercase mb-2 text-gold/80">
          Cores e Formas
        </p>
        <p className="text-base md:text-lg text-foreground/90 max-w-lg mx-auto mb-10 font-body">
          Painéis WPC e Bamboo Carbon que transformam espaços em experiências únicas
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <a
            href="#catalogo"
            className="px-12 py-4 border border-gold/60 text-gold font-medium tracking-wider uppercase text-base rounded hover:bg-gold/10 hover:border-gold transition-all flex items-center justify-center font-subtitle"
          >
            Ver Catálogo
          </a>
          <a
            href="#contato"
            className="px-14 py-5 bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))] text-background font-bold tracking-wider uppercase text-base rounded shadow-[0_0_20px_hsl(43_62%_52%/0.4)] hover:shadow-[0_0_30px_hsl(43_62%_52%/0.6)] hover:scale-105 transition-all duration-300 font-subtitle"
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
