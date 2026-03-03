import { Droplets, Wrench, Leaf, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { value: '19+', label: 'Cores Disponíveis' },
  { value: '100%', label: 'Impermeável' },
  { value: '25+', label: 'Anos de Durabilidade' },
  { value: '0%', label: 'Manutenção' },
];

const features = [
  { icon: Droplets, title: 'Resistência à Umidade', desc: 'Painéis 100% resistentes à água, ideais para banheiros, cozinhas e áreas externas.' },
  { icon: Wrench, title: 'Fácil Instalação', desc: 'Sistema de encaixe prático, sem sujeira, instalação limpa e rápida.' },
  { icon: Leaf, title: 'Sustentável', desc: 'Materiais ecológicos, sem uso de madeira natural, preservando o meio ambiente.' },
  { icon: ShieldCheck, title: 'Garantia de Qualidade', desc: 'Produtos com garantia de fábrica e alta durabilidade comprovada.' },
];

const SobreNos = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/images/Logo_ELEVARE.png" alt="ELEVARE" className="h-8" />
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm tracking-widest uppercase text-gold/80 hover:text-gold transition-colors font-subtitle"
          >
            <ArrowLeft size={16} />
            Voltar
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 max-w-5xl mx-auto text-center">
        <div className="gold-line mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-heading font-light tracking-[0.3em] text-gold glow-gold mb-4">
          Sobre Nós
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
          A <span className="text-gold font-medium">ELEVARE – Cores e Formas</span> nasceu com a missão de transformar
          espaços em experiências únicas, oferecendo revestimentos de alta performance que unem design contemporâneo,
          sustentabilidade e praticidade.
        </p>
      </section>

      {/* História */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="glass-card rounded-2xl p-8 md:p-12 space-y-6">
          <h2 className="text-2xl md:text-3xl font-heading font-light tracking-wider text-gold">
            Nossa História
          </h2>
          <div className="space-y-4 text-foreground/80 font-body leading-relaxed text-sm md:text-base">
            <p>
              Sediada em <span className="text-gold">Teresina, Piauí</span>, a Elevare é referência em painéis ripados WPC,
              Bamboo Carbon e revestimentos premium. Trabalhamos com materiais de última geração que combinam a beleza
              da madeira natural com a resistência e durabilidade de compostos sustentáveis.
            </p>
            <p>
              Nossa proposta é simples: elevar o padrão dos ambientes — residenciais e comerciais — com soluções que
              dispensam manutenção, resistem à umidade e ao tempo, e entregam um acabamento impecável.
            </p>
            <p>
              Cada produto do nosso catálogo foi cuidadosamente selecionado para atender aos mais exigentes padrões de
              qualidade e design, garantindo que cada projeto seja verdadeiramente único.
            </p>
          </div>
        </div>
      </section>

      {/* Por que WPC */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="gold-line mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-heading font-light tracking-wider text-gold mb-2">
            Por que WPC e Bamboo Carbon?
          </h2>
          <p className="text-muted-foreground font-body text-sm">
            Tecnologia que une o melhor da natureza com a inovação moderna
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(f => (
            <div key={f.title} className="glass-card rounded-xl p-6 text-center transition-all duration-300 group">
              <div className="w-14 h-14 mx-auto rounded-full bg-[rgba(45,106,79,0.3)] flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                <f.icon className="text-gold" size={24} />
              </div>
              <h3 className="font-subtitle font-medium text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground font-body">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(s => (
            <div key={s.label} className="glass-card rounded-xl p-6 text-center">
              <p className="text-3xl md:text-4xl font-heading font-light text-gold glow-gold mb-1">{s.value}</p>
              <p className="text-xs text-muted-foreground font-subtitle tracking-wider uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Missão */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
          <div className="gold-line mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-heading font-light tracking-wider text-gold mb-4">
            Nossa Missão
          </h2>
          <p className="text-foreground/80 font-body leading-relaxed max-w-2xl mx-auto">
            Transformar espaços com qualidade e design premium, oferecendo soluções sustentáveis e inovadoras
            que elevam o padrão de cada ambiente — tornando o extraordinário acessível.
          </p>
          <div className="mt-8">
            <Link
              to="/#contato"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))] text-background font-semibold tracking-wider uppercase text-sm rounded hover:opacity-90 transition-opacity font-subtitle"
            >
              Solicitar Orçamento
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border text-center">
        <p className="text-xs text-muted-foreground tracking-wider font-body">
          © 2026 <span className="font-heading tracking-widest">ELEVARE</span> — Cores e Formas. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default SobreNos;
