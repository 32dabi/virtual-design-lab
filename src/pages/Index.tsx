import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CatalogSection from '@/components/CatalogSection';
import SimulatorSection from '@/components/SimulatorSection';

import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CatalogSection />
      <SimulatorSection />
      
      <AboutSection />
      <ContactSection />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
