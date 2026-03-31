import { useState } from 'react';
import { LayoutGrid, Camera } from 'lucide-react';
import GalleryTab from './GalleryTab';
import AISimulatorTab from './AISimulatorTab';

const tabs = [
  { id: 'gallery', label: 'Galeria de Ambientes', icon: LayoutGrid },
  { id: 'ai', label: 'Simule Seu Ambiente', icon: Camera },
] as const;

type TabId = typeof tabs[number]['id'];

const SimulatorSection = () => {
  const [activeTab, setActiveTab] = useState<TabId>('gallery');

  return (
    <section id="simulador" className="w-full py-20 bg-foreground">
      <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-10">
        <div className="gold-line mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-heading font-semibold text-gold tracking-wider mb-2">
          Simulador de Ambientes
        </h2>
        <p className="text-muted-foreground">
          Visualize nossos painéis no seu espaço ou explore nossa galeria
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-1 mb-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-300 border-b-2 ${
              activeTab === tab.id
                ? 'border-gold text-gold'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'gallery' ? <GalleryTab /> : <AISimulatorTab />}
      </div>
    </section>
  );
};

export default SimulatorSection;
