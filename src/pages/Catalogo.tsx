import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Search, MessageCircle } from 'lucide-react';
import { products, categoryLabels, type Product, type ProductCategory } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import WhatsAppButton from '@/components/WhatsAppButton';

/* ── Category config ────────────────────────────── */
const categoryIcons: { key: ProductCategory | 'all'; label: string; icon: string }[] = [
  { key: 'all', label: 'Todos', icon: '◆' },
  { key: 'wpc-fluted', label: 'Ripados WPC', icon: '▤' },
  { key: 'fluted-panel', label: 'Fluted Premium', icon: '▥' },
  { key: 'bamboo-carbon', label: 'Bamboo Carbon', icon: '▧' },
  { key: 'pvc-ceiling', label: 'Forro PVC', icon: '▨' },
  { key: 'wpc-outdoor', label: 'WPC Externo', icon: '▩' },
  { key: 'clips', label: 'Clips de Fixação', icon: '⬡' },
];

const marqueeItems = [
  'RIPADOS WPC', 'FLUTED PREMIUM', 'BAMBOO CARBON', 'FORRO PVC',
  'WPC EXTERNO', 'PERFIS', 'CANTONEIRAS', 'CLIPS', 'SUSTENTABILIDADE',
  'QUALIDADE', 'DESIGN', 'INOVAÇÃO',
];

const benefits = [
  { title: 'Sustentável', desc: 'Materiais ecológicos e recicláveis' },
  { title: 'Resistente', desc: 'Alta durabilidade e resistência à umidade' },
  { title: 'Fácil Instalação', desc: 'Sistema de encaixe inteligente' },
  { title: 'Garantia', desc: 'Qualidade garantida pela ELEVARE' },
];

const faqItems = [
  {
    q: 'Qual a diferença entre WPC e PVC?',
    a: 'O WPC (Wood Plastic Composite) combina fibras de madeira com polímeros, oferecendo aparência natural e alta resistência. O PVC é 100% plástico, mais leve e indicado para áreas úmidas como forros de banheiro.',
  },
  {
    q: 'Os painéis podem ser usados em áreas externas?',
    a: 'Sim! Nossa linha WPC Externo é especialmente formulada para resistir a intempéries, raios UV e variações de temperatura, mantendo a beleza por muito mais tempo.',
  },
  {
    q: 'Como funciona a instalação?',
    a: 'Nossos painéis utilizam sistema de encaixe e clips de fixação, facilitando a instalação sem necessidade de cola ou pregos. Disponibilizamos manuais e suporte técnico.',
  },
  {
    q: 'Vocês entregam para todo o Brasil?',
    a: 'Sim, realizamos entregas em todo o território nacional. Entre em contato conosco para consultar prazos e condições para sua região.',
  },
  {
    q: 'Qual a manutenção necessária?',
    a: 'Os painéis exigem manutenção mínima. Basta limpar com pano úmido e detergente neutro. Não necessitam de verniz, pintura ou impermeabilização.',
  },
];

const Catalogo = () => {
  const [active, setActive] = useState<string>('all');
  const [selected, setSelected] = useState<Product | null>(null);
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const filtered = products.filter(p => {
    const matchCat = active === 'all'
      ? true
      : active === 'perfis-acabamentos'
        ? p.category === 'pvc-corner' || p.category === 'mental-line'
        : p.category === active;
    const matchSearch = search === '' || p.name.toLowerCase().includes(search.toLowerCase()) || p.code.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* ── Navbar ────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gold/80 hover:text-gold transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <Link to="/" className="font-logo text-gold text-xl tracking-[0.4em] uppercase">
              ELEVARE
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm tracking-widest uppercase text-gold/80 hover:text-gold transition-colors font-subtitle">Home</Link>
            <a href="#produtos" className="text-sm tracking-widest uppercase text-gold/80 hover:text-gold transition-colors font-subtitle">Produtos</a>
            <Link to="/#simulador" className="text-sm tracking-widest uppercase text-gold/80 hover:text-gold transition-colors font-subtitle">Simulador</Link>
            <Link to="/#contato" className="text-sm tracking-widest uppercase text-gold/80 hover:text-gold transition-colors font-subtitle">Contato</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Banner ────────────────── */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 hero-gradient-animated" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />

        {/* Ripple lines */}
        <div className="absolute inset-0 flex justify-between px-[10%] pointer-events-none opacity-40">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="w-px h-full ripple-line" style={{ animationDelay: `${i * 0.7}s` }} />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="gold-line mx-auto mb-6" />
          <p className="text-sm tracking-[0.3em] uppercase text-gold/60 font-subtitle mb-3">Elevare Cores e Formas</p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-gold tracking-wider uppercase glow-gold mb-4 font-normal">
            Revestimentos
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-8 font-body">
            Descubra nossa linha completa de painéis WPC, Bamboo Carbon e revestimentos premium para transformar qualquer ambiente
          </p>
          <a
            href="#produtos"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))] text-background font-medium tracking-wider uppercase text-sm rounded shadow-[0_0_20px_hsl(43_62%_52%/0.4)] hover:shadow-[0_0_30px_hsl(43_62%_52%/0.6)] hover:scale-105 transition-all duration-300 font-subtitle"
          >
            Explorar Produtos <ChevronRight size={18} />
          </a>
          <div className="gold-line mx-auto mt-6" />
        </div>
      </section>

      {/* ── Scrolling Marquee ────────────────── */}
      <div className="overflow-hidden py-6 border-y border-gold/10 bg-secondary/50">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-3xl md:text-5xl font-heading font-normal text-gold/10 tracking-wider mx-8">
              {item}
              <span className="text-gold/20 mx-6">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Category Cards (Carousel) ────────────────── */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="gold-line mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-heading font-normal text-gold tracking-wider">Nossas Linhas</h2>
          <p className="text-muted-foreground mt-2 font-body">Selecione uma categoria para explorar</p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide justify-center flex-wrap">
          {categoryIcons.map(cat => (
            <button
              key={cat.key}
              onClick={() => {
                setActive(cat.key);
                document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`flex flex-col items-center gap-3 px-6 py-5 rounded-xl transition-all duration-300 min-w-[130px] ${
                active === cat.key
                  ? 'glass-card border-gold/40 shadow-[0_0_15px_hsl(43_62%_52%/0.15)]'
                  : 'glass-card hover:border-gold/30'
              }`}
            >
              <span className={`text-3xl ${active === cat.key ? 'text-gold' : 'text-gold/40'} transition-colors`}>
                {cat.icon}
              </span>
              <span className={`text-xs font-subtitle tracking-wider uppercase whitespace-nowrap ${
                active === cat.key ? 'text-gold' : 'text-foreground/60'
              } transition-colors`}>
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Products Grid ────────────────── */}
      <section id="produtos" className="py-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-normal text-gold tracking-wider">Produtos</h2>
            <p className="text-muted-foreground mt-1 font-body text-sm">
              {filtered.length > 0
                ? `${filtered.length} produto${filtered.length > 1 ? 's' : ''} encontrado${filtered.length > 1 ? 's' : ''}`
                : 'Catálogo em construção — em breve novos produtos'}
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nome ou código..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categoryIcons.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 whitespace-nowrap font-body ${
                active === cat.key
                  ? 'border border-gold bg-gold/15 text-gold'
                  : 'border border-foreground/20 text-foreground/60 hover:text-gold hover:border-gold/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onClick={setSelected} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 glass-card rounded-2xl">
            <span className="text-5xl mb-4 block">🏗️</span>
            <h3 className="text-xl font-heading font-normal text-gold tracking-wider mb-2">Em Construção</h3>
            <p className="text-muted-foreground font-body max-w-md mx-auto">
              Estamos preparando nosso catálogo digital com todos os produtos e amostras em alta qualidade. Em breve você poderá explorar cada detalhe aqui.
            </p>
            <a
              href={`https://wa.me/5586994122399?text=${encodeURIComponent('Olá! Gostaria de conhecer os produtos ELEVARE disponíveis.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-8 py-3 bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))] text-background font-medium tracking-wider uppercase text-sm rounded hover:scale-105 transition-all duration-300 font-subtitle"
            >
              <MessageCircle size={16} /> Solicitar Catálogo
            </a>
          </div>
        )}
      </section>

      {/* ── Benefits Marquee ────────────────── */}
      <div className="overflow-hidden py-5 border-y border-gold/10 bg-secondary/50">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...benefits, ...benefits, ...benefits].map((b, i) => (
            <span key={i} className="text-2xl md:text-4xl font-heading font-normal text-gold/10 tracking-wider mx-8 uppercase">
              {b.title}
              <span className="text-gold/20 mx-6">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Benefits Section ────────────────── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="gold-line mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-heading font-normal text-gold tracking-wider">Por que escolher ELEVARE?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div key={i} className="glass-card rounded-xl p-6 text-center hover:shadow-[0_0_20px_hsl(43_62%_52%/0.15)] transition-all duration-300">
              <h3 className="text-gold font-heading font-normal text-lg tracking-wider mb-2">{b.title}</h3>
              <p className="text-muted-foreground text-sm font-body">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ Section ────────────────── */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="gold-line mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-heading font-normal text-gold tracking-wider">Perguntas Frequentes</h2>
        </div>
        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <div key={i} className="glass-card rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="text-foreground font-subtitle text-sm tracking-wide">{item.q}</span>
                <ChevronRight
                  size={18}
                  className={`text-gold/60 transition-transform duration-300 flex-shrink-0 ml-4 ${
                    openFaq === i ? 'rotate-90' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openFaq === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-6 pb-4 text-muted-foreground text-sm font-body leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Section ────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center glass-card rounded-2xl p-12">
          <div className="gold-line mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-heading font-normal text-gold tracking-wider mb-4">
            Pronto para transformar seu espaço?
          </h2>
          <p className="text-muted-foreground font-body mb-8 max-w-xl mx-auto">
            Entre em contato com nossa equipe e receba um orçamento personalizado para o seu projeto
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/5586994122399?text=${encodeURIComponent('Olá! Gostaria de solicitar um orçamento para revestimentos ELEVARE.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))] text-background font-medium tracking-wider uppercase text-sm rounded shadow-[0_0_20px_hsl(43_62%_52%/0.4)] hover:shadow-[0_0_30px_hsl(43_62%_52%/0.6)] hover:scale-105 transition-all duration-300 font-subtitle"
            >
              <MessageCircle size={16} /> Falar no WhatsApp
            </a>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-10 py-4 border border-gold/60 text-gold font-medium tracking-wider uppercase text-sm rounded hover:bg-gold/10 hover:border-gold transition-all font-subtitle"
            >
              Voltar ao Início
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────── */}
      <footer className="border-t border-gold/10 py-8 px-6 text-center">
        <p className="font-logo text-gold text-sm tracking-[0.3em] uppercase">ELEVARE</p>
        <p className="text-muted-foreground text-xs font-body mt-2">Cores e Formas — Revestimentos Premium</p>
      </footer>

      <ProductModal product={selected} open={!!selected} onClose={() => setSelected(null)} />
      <WhatsAppButton />
    </div>
  );
};

export default Catalogo;
