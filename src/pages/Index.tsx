import { lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import WhatsAppButton from '@/components/WhatsAppButton';

const CatalogSection = lazy(() => import('@/components/CatalogSection'));
const SimulatorSection = lazy(() => import('@/components/SimulatorSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <Suspense fallback={null}>
        <CatalogSection />
        <SimulatorSection />
        <ContactSection />
      </Suspense>
      <WhatsAppButton />
    </div>
  );
};

export default Index;
