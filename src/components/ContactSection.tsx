import { MapPin, Phone, Instagram } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contato" className="py-20 px-6">
      <div className="max-w-4xl mx-auto glass-card rounded-2xl p-8 md:p-12">
        <div className="text-center mb-10">
          <div className="gold-line mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-heading font-normal text-gold tracking-wider mb-2">Contato</h2>
          <p className="text-muted-foreground">Entre em contato e transforme seu espaço</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-center group">
            <div className="w-12 h-12 rounded-full bg-[rgba(45,106,79,0.3)] flex items-center justify-center mb-3 group-hover:bg-gold/20 transition-colors">
              <MapPin className="text-gold" size={20} />
            </div>
            <p className="text-sm text-foreground font-medium">Teresina, PI</p>
            <p className="text-xs text-muted-foreground">Brasil</p>
          </a>
          <a href="https://wa.me/5586994122399" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-center group">
            <div className="w-12 h-12 rounded-full bg-[rgba(45,106,79,0.3)] flex items-center justify-center mb-3 group-hover:bg-gold/20 transition-colors">
              <Phone className="text-gold" size={20} />
            </div>
            <p className="text-sm text-foreground font-medium">(86) 9 9412-2399</p>
            <p className="text-xs text-muted-foreground">WhatsApp</p>
          </a>
          <a href="https://instagram.com/elevare" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-center group">
            <div className="w-12 h-12 rounded-full bg-[rgba(45,106,79,0.3)] flex items-center justify-center mb-3 group-hover:bg-gold/20 transition-colors">
              <Instagram className="text-gold" size={20} />
            </div>
            <p className="text-sm text-foreground font-medium">@elevare</p>
            <p className="text-xs text-muted-foreground">Instagram</p>
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border text-center">
        <p className="text-xs text-muted-foreground tracking-wider">
          © 2026 <span className="font-heading tracking-widest">ELEVARE</span> — Cores e Formas. Todos os direitos reservados.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
