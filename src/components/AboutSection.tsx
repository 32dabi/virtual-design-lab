import { Droplets, Wrench, Leaf, ShieldCheck } from 'lucide-react';

const features = [
  { icon: Droplets, title: 'Resistência à Umidade', desc: 'Painéis 100% resistentes à água, ideais para banheiros e áreas externas.' },
  { icon: Wrench, title: 'Fácil Instalação', desc: 'Sistema de encaixe prático, sem sujeira, instalação limpa e rápida.' },
  { icon: Leaf, title: 'Sustentável', desc: 'Materiais ecológicos, sem uso de madeira natural, preservando o meio ambiente.' },
  { icon: ShieldCheck, title: 'Garantia de Qualidade', desc: 'Produtos com garantia de fábrica e alta durabilidade comprovada.' },
];

const AboutSection = () => {
  return (
    <section id="sobre" className="py-8 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <div className="gold-line mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-heading font-semibold text-gold tracking-wider mb-2">Por que ELEVARE?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Transformamos ambientes com revestimentos de alta performance que unem design, sustentabilidade e praticidade.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(f => (
          <div key={f.title} className="glass-card rounded-xl p-6 text-center transition-all duration-300 group">
            <div className="w-14 h-14 mx-auto rounded-full bg-[rgba(45,106,79,0.3)] flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
              <f.icon className="text-gold" size={24} />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
