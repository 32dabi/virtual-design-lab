import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CatalogSection from '@/components/CatalogSection';
import SimulatorSection from '@/components/SimulatorSection';
import ContactSection from '@/components/ContactSection';
import WhatsAppButton from '@/components/WhatsAppButton';

const SectionDivider = () => (
  <div className="w-full flex items-center justify-center py-2 px-6 bg-foreground">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    <div className="mx-4 w-2 h-2 rotate-45 border border-gold/40 bg-gold/10" />
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background border-foreground">
      <Navbar />
      <HeroSection />
      <SectionDivider />
      <CatalogSection />
      <SectionDivider />
      <SimulatorSection />
      <SectionDivider />
      <ContactSection />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
