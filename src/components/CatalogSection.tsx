import { useState } from 'react';
import { products, categoryLabels, type Product, type ProductCategory } from '@/data/products';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

const categories: (ProductCategory | 'all')[] = ['all', 'ripado-madeira', 'ripado-colors', 'bamboo-carbon', 'wpc-externo'];

const CatalogSection = () => {
  const [active, setActive] = useState<ProductCategory | 'all'>('all');
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = active === 'all' ? products : products.filter(p => p.category === active);

  return (
    <section id="catalogo" className="py-20 px-6 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-12 h-48 md:h-64">
        <img src="/images/catalogo-cores.png" alt="Catálogo ELEVARE" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent flex items-center px-8">
          <div>
            <div className="gold-line mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gold tracking-wider">Catálogo</h2>
            <p className="text-muted-foreground mt-2">Explore nossa linha completa de revestimentos</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
              active === cat
                ? 'bg-gold text-background'
                : 'glass-card text-muted-foreground hover:text-gold'
            }`}
          >
            {cat === 'all' ? 'Todos' : categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} onClick={setSelected} />
        ))}
      </div>

      <ProductModal product={selected} open={!!selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default CatalogSection;
