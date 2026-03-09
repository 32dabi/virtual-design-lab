import type { Product } from '@/data/products';
import { categoryLabels } from '@/data/products';
import { roomScenes } from '@/data/rooms';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { MessageCircle, Eye } from 'lucide-react';

interface Props {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, open, onClose }: Props) => {
  if (!product) return null;

  const sampleImage = `/images/produtos/${product.code.replace(/\s+/g, '')}.jpg`;
  const whatsappMsg = encodeURIComponent(`Olá! Tenho interesse no painel ${product.name} (${product.code}). Gostaria de mais informações.`);

  // Find a matching room scene for this product
  const matchingScene = roomScenes.find(s => s.productId === product.id);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-card border-gold/20 max-w-2xl">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Image */}
          <div className="space-y-3">
            <div className="relative rounded-xl overflow-hidden bg-card min-h-[250px]">
              <img
                src={sampleImage}
                alt={`Amostra ${product.name}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div
                className="w-full h-full items-center justify-center hidden absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${product.color}, ${product.color}dd, ${product.color}99)`,
                }}
              >
                <span className="text-xs text-white/60 font-subtitle tracking-wider uppercase">Amostra em breve</span>
              </div>
            </div>
            {matchingScene && (
              <div className="relative rounded-xl overflow-hidden bg-card h-[140px]">
                <img
                  src={matchingScene.image}
                  alt={`${matchingScene.roomName} com ${product.name}`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 text-[10px] bg-background/80 text-gold px-2 py-0.5 rounded-full">
                  {matchingScene.roomName}
                </span>
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="space-y-4">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-gold/30" style={{ backgroundColor: product.color }} />
                <span className="text-gold font-heading">{product.name}</span>
              </DialogTitle>
              <DialogDescription className="text-muted-foreground font-body">
                {categoryLabels[product.category]}
              </DialogDescription>
            </DialogHeader>

            <p className="text-foreground/80 text-sm font-body">{product.description}</p>
            
            <div className="space-y-1 text-xs text-muted-foreground font-body">
              <div className="flex items-center justify-between">
                <span>Código: {product.code}</span>
                <span>{product.dimensions}</span>
              </div>
              {product.finish && (
                <div className="flex items-center justify-between">
                  <span>Acabamento: {product.finish}</span>
                  <span>{product.application}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <a
                href="#simulador"
                onClick={onClose}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[rgba(27,67,50,0.3)] border border-gold/30 text-gold rounded-lg text-sm font-medium hover:bg-gold/20 transition-colors font-subtitle"
              >
                <Eye size={16} /> Simular no Ambiente
              </a>
              <a
                href={`https://wa.me/5586999999999?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366] text-white rounded-xl text-sm font-medium hover:bg-[#20BD5A] transition-colors font-subtitle"
              >
                <MessageCircle size={16} /> Solicitar Orçamento
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
