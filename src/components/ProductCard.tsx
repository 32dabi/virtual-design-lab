import type { Product } from '@/data/products';

interface Props {
  product: Product;
  onClick: (p: Product) => void;
}

const ProductCard = ({ product, onClick }: Props) => {
  const sampleImage = `/images/produtos/${(product.imageCode || product.code).replace(/\s+/g, '')}.jpg`;

  return (
    <button
      onClick={() => onClick(product)}
      className="glass-card rounded-xl overflow-hidden text-left transition-all duration-300 group cursor-pointer hover:shadow-[0_0_20px_rgba(45,106,79,0.3)]"
    >
      {/* Sample image area */}
      <div className="relative h-[250px] overflow-hidden bg-card">
        <img
          src={sampleImage}
          alt={`Amostra ${product.name}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        <div
          className="w-full h-full items-center justify-center hidden"
          style={{
            background: `linear-gradient(135deg, ${product.color}, ${product.color}dd, ${product.color}99)`,
          }}
        >
          <span className="text-xs text-white/60 font-subtitle tracking-wider uppercase">Amostra em breve</span>
        </div>
        {/* Color circle overlay */}
        <div
          className="absolute top-3 right-3 w-8 h-8 rounded-full border-2 border-foreground/20 shadow-lg"
          style={{ backgroundColor: product.color }}
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-subtitle font-medium text-foreground group-hover:text-gold transition-colors text-sm">{product.name}</h3>
        <p className="text-[11px] text-muted-foreground font-body mt-0.5">{product.code}</p>
        <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-2 font-body">
          <span>{product.dimensions}</span>
          <span className="text-gold/60">{product.application}</span>
        </div>
      </div>
    </button>
  );
};

export default ProductCard;
