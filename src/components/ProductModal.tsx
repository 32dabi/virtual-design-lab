import type { Product } from '@/data/products';
import { categoryLabels } from '@/data/products';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { MessageCircle, Eye } from 'lucide-react';

interface Props {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, open, onClose }: Props) => {
  if (!product) return null;

  const whatsappMsg = encodeURIComponent(`Olá! Tenho interesse no painel ${product.name} (${product.code}). Gostaria de mais informações.`);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-card border-gold/20 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-gold/30" style={{ backgroundColor: product.color }} />
            <span className="text-gold font-heading">{product.name}</span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {categoryLabels[product.category]}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <p className="text-foreground/80 text-sm">{product.description}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Código: {product.code}</span>
            <span>{product.dimensions}</span>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <a
              href="#simulador"
              onClick={onClose}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[rgba(27,67,50,0.3)] border border-gold/30 text-gold rounded-lg text-sm font-medium hover:bg-gold/20 transition-colors"
            >
              <Eye size={16} /> Simular no Ambiente
            </a>
            <a
              href={`https://wa.me/5586999999999?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366] text-white rounded-lg text-sm font-medium hover:bg-[#20BD5A] transition-colors"
            >
              <MessageCircle size={16} /> Solicitar Orçamento
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
