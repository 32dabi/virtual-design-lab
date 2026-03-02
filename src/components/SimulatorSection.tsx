import { useState, useMemo } from 'react';
import { roomScenes, roomTypes } from '@/data/rooms';
import { products } from '@/data/products';
import { MessageCircle } from 'lucide-react';

const SimulatorSection = () => {
  const [activeRoom, setActiveRoom] = useState('sala');
  const [activeProductId, setActiveProductId] = useState<string | null>(null);

  const scenesForRoom = useMemo(
    () => roomScenes.filter(s => s.roomType === activeRoom),
    [activeRoom]
  );

  // Find matching scene or fall back to first scene of this room
  const currentScene = useMemo(() => {
    if (activeProductId) {
      const match = scenesForRoom.find(s => s.productId === activeProductId);
      if (match) return match;
    }
    return scenesForRoom[0] || null;
  }, [scenesForRoom, activeProductId]);

  // Products that have scenes for this room (highlighted)
  const productsWithScenes = useMemo(
    () => new Set(scenesForRoom.map(s => s.productId)),
    [scenesForRoom]
  );

  const whatsappMsg = currentScene
    ? encodeURIComponent(`Olá! Simulei o painel ${currentScene.productName} no ambiente ${currentScene.roomName} e gostaria de solicitar um orçamento.`)
    : '';

  return (
    <section id="simulador" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="gold-line mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold text-gold tracking-wider mb-2">Simulador de Ambientes</h2>
        <p className="text-muted-foreground">Escolha o cômodo e a cor para ver como ficaria no ambiente</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Room Preview */}
        <div className="relative rounded-2xl overflow-hidden aspect-video bg-muted">
          {scenesForRoom.map(scene => (
            <img
              key={scene.id}
              src={scene.image}
              alt={`${scene.roomName} com ${scene.productName}`}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
              style={{ opacity: currentScene?.id === scene.id ? 1 : 0 }}
            />
          ))}
          {/* Label */}
          {currentScene && (
            <div className="absolute bottom-4 left-4 glass rounded-lg px-4 py-2">
              <p className="text-gold text-sm font-medium">{currentScene.productName}</p>
              <p className="text-foreground/60 text-xs">{currentScene.roomName}</p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="glass-card rounded-2xl p-6 space-y-6">
          {/* Room selector */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Cômodo</p>
            <div className="grid grid-cols-2 gap-2">
              {roomTypes.map(rt => (
                <button
                  key={rt.id}
                  onClick={() => { setActiveRoom(rt.id); setActiveProductId(null); }}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                    activeRoom === rt.id
                      ? 'bg-gold text-background'
                      : 'bg-muted/50 text-muted-foreground hover:text-gold'
                  }`}
                >
                  {rt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color selector */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Cor / Produto</p>
            <div className="grid grid-cols-4 gap-3">
              {products.map(p => {
                const hasScene = productsWithScenes.has(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => hasScene && setActiveProductId(p.id)}
                    title={p.name}
                    className={`relative group ${!hasScene ? 'opacity-30 cursor-not-allowed' : ''}`}
                  >
                    <div
                      className={`w-10 h-10 mx-auto rounded-full border-2 transition-all duration-300 ${
                        activeProductId === p.id
                          ? 'border-gold scale-110 shadow-[0_0_12px_hsl(40_45%_56%/0.4)]'
                          : 'border-border hover:border-gold/50'
                      }`}
                      style={{ backgroundColor: p.color }}
                    />
                    <p className="text-[10px] text-muted-foreground mt-1 truncate text-center group-hover:text-gold transition-colors">
                      {p.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/5586999999999?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
          >
            <MessageCircle size={18} /> Solicitar Orçamento
          </a>
        </div>
      </div>
    </section>
  );
};

export default SimulatorSection;
