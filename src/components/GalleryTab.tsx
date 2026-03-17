import { useState, useCallback } from 'react';
import { roomScenes, roomTypes, type RoomScene } from '@/data/rooms';
import { products } from '@/data/products';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { MessageCircle } from 'lucide-react';

const GalleryTab = () => {
  const [roomFilter, setRoomFilter] = useState<string>('all');
  const [selectedScene, setSelectedScene] = useState<RoomScene | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [transform, setTransform] = useState<Record<string, { x: number; y: number }>>({});
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const filtered = roomScenes.filter(s => {
    if (failedImages.has(s.id)) return false;
    if (roomFilter !== 'all' && s.roomType !== roomFilter) return false;
    return true;
  });

  const handleImageError = useCallback((sceneId: string) => {
    setFailedImages(prev => new Set(prev).add(sceneId));
  }, []);

  const visibleRoomTypes = roomTypes.filter(rt => {
    return roomScenes.some(s => s.roomType === rt.id);
  });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(prev => ({ ...prev, [id]: { x: -x * 15, y: -y * 15 } }));
  }, []);

  const handleMouseLeave = useCallback((id: string) => {
    setTransform(prev => ({ ...prev, [id]: { x: 0, y: 0 } }));
    setHovered(null);
  }, []);

  const product = selectedScene
    ? products.find(p => p.id === selectedScene.productId)
    : null;

  const whatsappMsg = selectedScene
    ? encodeURIComponent(
        `Olá! Vi o painel ${selectedScene.productName} (${selectedScene.productCode}) no ambiente "${selectedScene.roomName}" no site da Elevare e gostaria de solicitar um orçamento.`
      )
    : '';

  return (
    <div>
      {/* Room type filters */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gold/20">
        <button
          onClick={() => setRoomFilter('all')}
          className={`px-3 py-1.5 rounded-full text-[11px] tracking-wider uppercase transition-all ${
            roomFilter === 'all'
              ? 'bg-gold/15 text-gold border border-gold/40'
              : 'text-muted-foreground hover:text-gold border border-transparent'
          }`}
        >
          Todos
        </button>
        {visibleRoomTypes.map(rt => (
          <button
            key={rt.id}
            onClick={() => setRoomFilter(rt.id)}
            className={`px-3 py-1.5 rounded-full text-[11px] tracking-wider uppercase transition-all ${
              roomFilter === rt.id
                ? 'bg-gold/15 text-gold border border-gold/40'
                : 'text-muted-foreground hover:text-gold border border-transparent'
            }`}
          >
            {rt.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(scene => {
          const t = transform[scene.id] || { x: 0, y: 0 };
          const isHovered = hovered === scene.id;
          return (
            <div
              key={scene.id}
              className="group relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer border border-transparent hover:border-gold/30 transition-all"
              onClick={() => setSelectedScene(scene)}
              onMouseMove={e => handleMouseMove(e, scene.id)}
              onMouseEnter={() => setHovered(scene.id)}
              onMouseLeave={() => handleMouseLeave(scene.id)}
            >
              <img
                src={scene.image}
                alt={`${scene.roomName} - ${scene.productName}`}
                className="w-full h-full object-cover transition-transform duration-300"
                onError={() => handleImageError(scene.id)}
                style={{
                  transform: isHovered
                    ? `scale(1.15) translate(${t.x}px, ${t.y}px)`
                    : 'scale(1)',
                }}
              />
              {/* Badge */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent p-4 pt-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gold font-medium text-sm">{scene.productName}</p>
                    <p className="text-foreground/60 text-xs">{scene.roomName}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    scene.roomCategory === 'comercial'
                      ? 'bg-gold/15 text-gold'
                      : 'bg-secondary text-foreground/60'
                  }`}>
                    {scene.roomCategory}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">Nenhum ambiente encontrado para este filtro.</p>
      )}

      {/* Lightbox Modal */}
      <Dialog open={!!selectedScene} onOpenChange={() => setSelectedScene(null)}>
        <DialogContent className="max-w-5xl w-[95vw] p-2 bg-background/95 border-gold/20">
          {selectedScene && (
            <div className="space-y-3">
              <img
                src={selectedScene.image}
                alt={`${selectedScene.roomName} - ${selectedScene.productName}`}
                className="w-full rounded-lg object-contain max-h-[70vh]"
              />
              <div className="px-4 pb-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gold font-semibold text-lg">{selectedScene.productName}</p>
                    <p className="text-muted-foreground text-sm">{selectedScene.roomName}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{selectedScene.productCode}</span>
                </div>
                {product && (
                  <p className="text-foreground/70 text-sm">{product.description}</p>
                )}
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/5586994122399?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-[#25D366] text-white rounded-xl text-sm font-medium hover:bg-[#20BD5A] transition-colors"
                  >
                    <MessageCircle size={18} /> Solicitar Orçamento
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryTab;
