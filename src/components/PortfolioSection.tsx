import { useState } from 'react';
import { roomScenes, roomTypes } from '@/data/rooms';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';

const PortfolioSection = () => {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? roomScenes : roomScenes.filter(s => s.roomType === filter);

  return (
    <section id="portfolio" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="gold-line mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold text-gold tracking-wider mb-2">Projetos</h2>
        <p className="text-muted-foreground">Ambientes reais com nossos revestimentos</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all ${filter === 'all' ? 'bg-gold text-background' : 'glass-card text-muted-foreground hover:text-gold'}`}
        >
          Todos
        </button>
        {roomTypes.map(rt => (
          <button
            key={rt.id}
            onClick={() => setFilter(rt.id)}
            className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all ${filter === rt.id ? 'bg-gold text-background' : 'glass-card text-muted-foreground hover:text-gold'}`}
          >
            {rt.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(scene => (
          <div key={scene.id} className="group relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer">
            <img
              src={scene.image}
              alt={`${scene.roomName} - ${scene.productName}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
              <div>
                <p className="text-gold font-semibold">{scene.productName}</p>
                <p className="text-foreground/60 text-sm">{scene.roomName}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
