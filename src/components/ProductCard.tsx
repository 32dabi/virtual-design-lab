import type { Product } from '@/data/products';

interface Props {
  product: Product;
  onClick: (p: Product) => void;
}

const ProductCard = ({ product, onClick }: Props) => {
  return (
    <button
      onClick={() => onClick(product)}
      className="glass-card rounded-xl p-5 text-left hover:border-gold/30 transition-all duration-300 group cursor-pointer"
    >
      <div className="flex items-center gap-4 mb-3">
        <div
          className="w-12 h-12 rounded-full border-2 border-gold/20 shadow-lg group-hover:scale-110 transition-transform duration-300"
          style={{ backgroundColor: product.color }}
        />
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-gold transition-colors">{product.name}</h3>
          <p className="text-xs text-muted-foreground">{product.code}</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{product.dimensions}</p>
    </button>
  );
};

export default ProductCard;
