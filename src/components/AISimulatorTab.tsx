import { useState, useRef, useMemo, useCallback } from 'react';
import { Camera, Upload, Loader2, CheckCircle, MessageCircle, RefreshCw, Sparkles, Image as ImageIcon, X, ChevronLeft, ChevronRight, Plus, Download } from 'lucide-react';
import { products, type Product } from '@/data/products';
import { roomScenes } from '@/data/rooms';
import { supabase } from '@/integrations/supabase/client';

interface AnalysisResult {
  tipo_comodo: string;
  categoria: 'residencial' | 'comercial';
  superficies_visiveis: string[];
  iluminacao: string;
  estilo_atual: string;
  sugestoes_produtos: string[];
  descricao_ambiente: string;
  recomendacao: string;
}

interface ImageEntry {
  preview: string;
  base64: string;
  mediaType: string;
  analysis: AnalysisResult | null;
  analyzing: boolean;
  error: string | null;
}

const MAX_IMAGES = 3;

const SURFACE_LABELS: Record<string, string> = {
  parede_frontal: 'Parede Principal',
  parede_lateral: 'Parede Lateral',
  teto: 'Teto / Forro',
  piso: 'Piso',
  area_externa: 'Área Externa',
};

const STEPS = [
  { num: 1, label: 'Upload' },
  { num: 2, label: 'Análise IA' },
  { num: 3, label: 'Produto' },
  { num: 4, label: 'Superfície' },
  { num: 5, label: 'Simulação' },
  { num: 6, label: 'Orçamento' },
];

const AISimulatorTab = () => {
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSurfaces, setSelectedSurfaces] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const activeImage = images[activeIndex] || null;

  // Combined analysis from all images
  const allAnalyses = useMemo(() => images.map(i => i.analysis).filter(Boolean) as AnalysisResult[], [images]);

  const suggestedProducts = useMemo(() => {
    if (allAnalyses.length === 0) return [];
    const allCodes = new Set<string>();
    allAnalyses.forEach(a => a.sugestoes_produtos.forEach(c => allCodes.add(c)));
    return Array.from(allCodes)
      .map(code => {
        const normalized = code.replace(/[\s-]/g, '').toLowerCase();
        return products.find(p => p.code.replace(/[\s-]/g, '').toLowerCase() === normalized);
      })
      .filter(Boolean) as Product[];
  }, [allAnalyses]);

  const closestScene = useMemo(() => {
    if (!selectedProduct) return null;
    return roomScenes.find(s => s.productId === selectedProduct.id) || null;
  }, [selectedProduct]);

  const analyzeImage = useCallback(async (index: number, entries: ImageEntry[]) => {
    const entry = entries[index];
    if (!entry) return entries;

    const updated = [...entries];
    updated[index] = { ...updated[index], analyzing: true, error: null };
    setImages(updated);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('analyze-room', {
        body: { imageBase64: entry.base64, mediaType: entry.mediaType },
      });

      if (fnError) throw new Error(fnError.message || 'Erro ao analisar imagem');
      if (data?.error) throw new Error(data.error);

      const final = [...updated];
      final[index] = { ...final[index], analysis: data as AnalysisResult, analyzing: false };
      setImages(final);
      return final;
    } catch (err: any) {
      console.error('Analysis error:', err);
      const final = [...updated];
      final[index] = { ...final[index], analyzing: false, error: err.message || 'Erro ao analisar' };
      setImages(final);
      return final;
    }
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remaining = MAX_IMAGES - images.length;
    const toProcess = files.slice(0, remaining);

    if (files.length > remaining) {
      // silently cap
    }

    const newEntries: ImageEntry[] = [];

    for (const file of toProcess) {
      if (file.size > 10 * 1024 * 1024) continue;

      const mType = file.type || 'image/jpeg';
      const result = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      newEntries.push({
        preview: result,
        base64: result.split(',')[1],
        mediaType: mType,
        analysis: null,
        analyzing: false,
        error: null,
      });
    }

    if (newEntries.length === 0) return;

    const allEntries = [...images, ...newEntries];
    setImages(allEntries);
    setActiveIndex(images.length); // focus first new image
    setStep(2);

    // Analyze sequentially
    setLoading(true);
    let current = allEntries;
    for (let i = images.length; i < allEntries.length; i++) {
      setActiveIndex(i);
      current = await analyzeImage(i, current);
    }
    setLoading(false);

    // If all analyzed successfully, go to step 3
    const allDone = current.every(e => e.analysis !== null);
    if (allDone) {
      setStep(3);
      setActiveIndex(0);
    }

    // Reset input
    if (fileRef.current) fileRef.current.value = '';
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    if (updated.length === 0) {
      reset();
    } else {
      setActiveIndex(Math.min(activeIndex, updated.length - 1));
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setStep(4);
    // Pre-select surfaces from active analysis
    const analysis = activeImage?.analysis;
    if (analysis?.superficies_visiveis) {
      setSelectedSurfaces(analysis.superficies_visiveis.slice(0, 2));
    }
  };

  const toggleSurface = (surface: string) => {
    setSelectedSurfaces(prev =>
      prev.includes(surface) ? prev.filter(s => s !== surface) : [...prev, surface]
    );
  };

  const handleGenerate = () => setStep(5);

  const saveSimulationImage = useCallback(async () => {
    if (!activeImage) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loadImg = (src: string): Promise<HTMLImageElement> =>
      new Promise((resolve, reject) => {
        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });

    try {
      const userImg = await loadImg(activeImage.preview);
      const productImg = closestScene ? await loadImg(closestScene.image) : null;

      const w = 1200;
      const h = 600;
      canvas.width = w;
      canvas.height = h;

      ctx.fillStyle = '#0D1F15';
      ctx.fillRect(0, 0, w, h);

      const halfW = w / 2 - 10;
      ctx.drawImage(userImg, 5, 5, halfW, h - 10);
      if (productImg) {
        ctx.drawImage(productImg, w / 2 + 5, 5, halfW, h - 10);
      }

      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(5, h - 40, halfW, 35);
      ctx.fillRect(w / 2 + 5, h - 40, halfW, 35);
      ctx.fillStyle = '#D4AF37';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('Seu Ambiente', 15, h - 18);
      if (selectedProduct) {
        ctx.fillText(`Com ${selectedProduct.name}`, w / 2 + 15, h - 18);
      }

      ctx.fillStyle = 'rgba(212,175,55,0.5)';
      ctx.font = '11px sans-serif';
      ctx.fillText('ELEVARE Revestimentos', w - 170, h - 18);

      const link = document.createElement('a');
      link.download = `elevare-simulacao-${selectedProduct?.name?.replace(/\s+/g, '-').toLowerCase() || 'ambiente'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Error saving image:', err);
      const link = document.createElement('a');
      link.download = 'elevare-simulacao.png';
      link.href = activeImage.preview;
      link.click();
    }
  }, [activeImage, closestScene, selectedProduct]);

  const reset = () => {
    setStep(1);
    setImages([]);
    setActiveIndex(0);
    setSelectedProduct(null);
    setSelectedSurfaces([]);
    setLoading(false);
  };

  const currentAnalysis = activeImage?.analysis || allAnalyses[0] || null;

  const whatsappMsg = selectedProduct && allAnalyses.length > 0
    ? encodeURIComponent(
        `Olá! Fiz uma simulação no site da Elevare.\n\n${allAnalyses.map((a, i) => `Ambiente ${i + 1}: ${a.tipo_comodo}`).join('\n')}\nProduto escolhido: ${selectedProduct.name} (${selectedProduct.code})\nSuperfície: ${selectedSurfaces.map(s => SURFACE_LABELS[s] || s).join(', ')}\n\nGostaria de um orçamento!`
      )
    : '';

  // Progress info for loading
  const analyzingIndex = images.findIndex(i => i.analyzing);
  const analyzedCount = images.filter(i => i.analysis !== null).length;

  return (
    <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6">
      {/* LEFT: Preview area */}
      <div className="relative rounded-2xl overflow-hidden border border-border bg-card min-h-[400px] flex flex-col">
        {/* Thumbnails bar (when images exist) */}
        {images.length > 0 && step < 6 && (
          <div className="flex items-center gap-2 p-3 border-b border-border bg-card/50">
            {images.map((img, i) => (
              <div key={i} className="relative group">
                <button
                  onClick={() => setActiveIndex(i)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    activeIndex === i ? 'border-gold shadow-lg shadow-gold/20' : 'border-border hover:border-gold/40'
                  }`}
                >
                  <img src={img.preview} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                  {img.analyzing && (
                    <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                      <Loader2 size={14} className="text-gold animate-spin" />
                    </div>
                  )}
                  {img.analysis && (
                    <div className="absolute bottom-0.5 right-0.5">
                      <CheckCircle size={12} className="text-green-500" />
                    </div>
                  )}
                  {img.error && (
                    <div className="absolute bottom-0.5 right-0.5">
                      <X size={12} className="text-destructive" />
                    </div>
                  )}
                </button>
                {step <= 2 && (
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={10} />
                  </button>
                )}
              </div>
            ))}
            {images.length < MAX_IMAGES && step <= 2 && (
              <label className="w-14 h-14 rounded-lg border-2 border-dashed border-gold/30 flex items-center justify-center cursor-pointer hover:border-gold/60 hover:bg-gold/5 transition-all">
                <Plus size={18} className="text-gold/60" />
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/heic"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>
        )}

        {/* Main preview */}
        <div className="flex-1 flex items-center justify-center relative">
          {step === 1 && images.length === 0 && (
            <div className="text-center px-8 py-16">
              <div className="w-20 h-20 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-6">
                <Camera className="text-gold" size={36} />
              </div>
              <h3 className="text-xl font-heading font-semibold text-gold mb-2">
                Como ficaria no SEU espaço?
              </h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
                Envie até {MAX_IMAGES} fotos dos ambientes que deseja transformar
              </p>
              <label className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))] text-background font-semibold rounded-xl cursor-pointer hover:opacity-90 transition-opacity">
                <Upload size={18} />
                Escolher Fotos
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/heic"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              <p className="text-muted-foreground text-xs mt-4">
                Dica: tire a foto de frente para a parede, com boa iluminação
              </p>
              <p className="text-muted-foreground/60 text-[11px] mt-1">
                Aceita JPG, PNG, WEBP • Máx. 10MB por foto • Até {MAX_IMAGES} fotos
              </p>
            </div>
          )}

          {activeImage && step >= 2 && step < 5 && (
            <>
              <img
                src={activeImage.preview}
                alt="Seu ambiente"
                className="w-full h-full object-contain max-h-[500px]"
              />
              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveIndex(i => Math.max(0, i - 1))}
                    disabled={activeIndex === 0}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center text-foreground hover:bg-background disabled:opacity-30 transition-all"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setActiveIndex(i => Math.min(images.length - 1, i + 1))}
                    disabled={activeIndex === images.length - 1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center text-foreground hover:bg-background disabled:opacity-30 transition-all"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </>
          )}

          {step === 5 && activeImage && (
            <div className="w-full h-full flex flex-col">
              <div className="grid grid-cols-2 gap-2 p-3 flex-1 min-h-0">
                <div className="relative rounded-lg overflow-hidden">
                  <img src={activeImage.preview} alt="Seu ambiente" className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-background/80 text-foreground text-[10px] px-2 py-0.5 rounded-full">
                    Seu Ambiente {images.length > 1 ? `(${activeIndex + 1}/${images.length})` : ''}
                  </span>
                </div>
                <div className="relative rounded-lg overflow-hidden">
                  {closestScene ? (
                    <img src={closestScene.image} alt={closestScene.productName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-card flex items-center justify-center">
                      <ImageIcon className="text-muted-foreground" size={40} />
                    </div>
                  )}
                  <span className="absolute top-2 left-2 bg-gold/90 text-background text-[10px] px-2 py-0.5 rounded-full font-medium">
                    Com {selectedProduct?.name}
                  </span>
                </div>
              </div>
              {/* Navigation for multiple images in step 5 */}
              {images.length > 1 && (
                <div className="flex items-center justify-center gap-2 pb-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        activeIndex === i ? 'bg-gold scale-125' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                    />
                  ))}
                </div>
              )}
              {currentAnalysis?.recomendacao && (
                <div className="mx-3 mb-3 p-3 glass-card rounded-lg">
                  <div className="flex items-start gap-2">
                    <Sparkles size={14} className="text-gold mt-0.5 shrink-0" />
                    <p className="text-foreground/80 text-sm">{currentAnalysis.recomendacao}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {step >= 6 && (
            <div className="text-center px-8 py-16">
              <CheckCircle className="text-gold mx-auto mb-4" size={48} />
              <h3 className="text-xl font-heading font-semibold text-gold mb-2">
                Simulação Concluída!
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Gostou? Solicite um orçamento personalizado!
              </p>
              <div className="flex flex-col gap-3 max-w-xs mx-auto">
                <a
                  href={`https://wa.me/5586999999999?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-xl font-medium hover:bg-[#20BD5A] transition-colors"
                >
                  <MessageCircle size={18} /> Solicitar Orçamento
                </a>
                <button
                  onClick={reset}
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-gold/30 text-gold rounded-xl text-sm hover:bg-gold/10 transition-colors"
                >
                  <RefreshCw size={16} /> Nova Simulação
                </button>
              </div>
            </div>
          )}

          {/* Loading overlay */}
          {loading && (
            <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center z-10">
              <Loader2 className="text-gold animate-spin mb-4" size={40} />
              <p className="text-gold font-medium">
                {images.length > 1
                  ? `Analisando foto ${analyzingIndex >= 0 ? analyzingIndex + 1 : analyzedCount + 1} de ${images.length}...`
                  : 'Nossa IA está analisando seu ambiente...'}
              </p>
              <p className="text-muted-foreground text-sm mt-1">Isso leva alguns segundos por foto</p>
              {images.length > 1 && (
                <div className="w-48 h-1.5 bg-muted rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-full bg-gold rounded-full transition-all duration-500"
                    style={{ width: `${(analyzedCount / images.length) * 100}%` }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Controls */}
      <div className="glass-card rounded-2xl p-5 space-y-5">
        {/* Steps indicator */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {STEPS.map(s => (
            <div key={s.num} className="flex items-center gap-1 shrink-0">
              <div
                className={`w-7 h-7 rounded-full text-[11px] font-bold flex items-center justify-center transition-all ${
                  step >= s.num
                    ? 'bg-gold text-background'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step > s.num ? '✓' : s.num}
              </div>
              <span className={`text-[10px] ${step >= s.num ? 'text-gold' : 'text-muted-foreground'}`}>
                {s.label}
              </span>
              {s.num < 6 && <div className={`w-3 h-px ${step > s.num ? 'bg-gold' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        {/* Errors from individual images */}
        {images.some(i => i.error) && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
            {images.filter(i => i.error).map((img, idx) => (
              <p key={idx}>Foto {images.indexOf(img) + 1}: {img.error}</p>
            ))}
            <button onClick={reset} className="ml-2 underline">Tentar novamente</button>
          </div>
        )}

        {/* Step 1: Upload prompt */}
        {step === 1 && (
          <div className="text-center py-4">
            <p className="text-muted-foreground text-sm">
              Envie até {MAX_IMAGES} fotos para começar a simulação com IA
            </p>
          </div>
        )}

        {/* Step 2: Loading / waiting */}
        {step === 2 && loading && (
          <div className="text-center py-4">
            <p className="text-muted-foreground text-sm">
              Aguarde a análise das {images.length} foto{images.length > 1 ? 's' : ''}...
            </p>
          </div>
        )}

        {/* Step 2 with errors: manual fallback */}
        {step === 2 && !loading && images.some(i => i.error) && (
          <div className="space-y-3">
            <p className="text-foreground text-sm font-medium">Selecione o tipo de ambiente manualmente:</p>
            <div className="grid grid-cols-2 gap-2">
              {['sala', 'quarto', 'cozinha', 'banheiro', 'escritório', 'recepção', 'varanda', 'restaurante'].map(tipo => (
                <button
                  key={tipo}
                  onClick={() => {
                    // Apply manual analysis to images without analysis
                    const updated = images.map(img =>
                      img.analysis ? img : {
                        ...img,
                        error: null,
                        analysis: {
                          tipo_comodo: tipo,
                          categoria: ['escritório', 'recepção', 'restaurante'].includes(tipo) ? 'comercial' : 'residencial',
                          superficies_visiveis: ['parede_frontal', 'parede_lateral'],
                          iluminacao: 'mista',
                          estilo_atual: 'moderno',
                          sugestoes_produtos: ['LTM 88696', 'KT 1073', 'LTM88634'],
                          descricao_ambiente: `Ambiente ${tipo}`,
                          recomendacao: `Para um ${tipo}, recomendamos painéis que combinem com o estilo do espaço.`,
                        } as AnalysisResult,
                      }
                    );
                    setImages(updated);
                    setStep(3);
                  }}
                  className="px-3 py-2 rounded-lg text-xs font-medium bg-muted/50 text-muted-foreground hover:text-gold hover:bg-gold/10 transition-all capitalize"
                >
                  {tipo}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Analysis result + product selection */}
        {step >= 3 && currentAnalysis && (
          <div className="space-y-4">
            {/* Analysis summary for active image */}
            <div className="p-3 rounded-lg bg-gold/5 border border-gold/15">
              <div className="flex items-center justify-between mb-1">
                <p className="text-gold text-sm font-medium">
                  {images.length > 1 ? `Foto ${activeIndex + 1}: ` : ''}
                  <span className="capitalize">{currentAnalysis.tipo_comodo}</span>
                </p>
                {images.length > 1 && (
                  <span className="text-[10px] text-muted-foreground">
                    {allAnalyses.length} ambiente{allAnalyses.length > 1 ? 's' : ''} analisado{allAnalyses.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-xs">{currentAnalysis.descricao_ambiente}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-foreground/70">
                  {currentAnalysis.iluminacao}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-foreground/70 capitalize">
                  {currentAnalysis.estilo_atual}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/15 text-gold capitalize">
                  {currentAnalysis.categoria}
                </span>
              </div>
            </div>

            {step === 3 && (
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                  Produtos recomendados para {images.length > 1 ? 'seus espaços' : 'seu espaço'}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {suggestedProducts.map(p => (
                    <button
                      key={p.id}
                      onClick={() => handleSelectProduct(p)}
                      className={`flex items-center gap-2 p-2 rounded-lg text-left transition-all border ${
                        selectedProduct?.id === p.id
                          ? 'border-gold bg-gold/10'
                          : 'border-border hover:border-gold/40'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full border border-gold/20 shrink-0" style={{ backgroundColor: p.color }} />
                      <div className="min-w-0">
                        <p className="text-foreground text-xs font-medium truncate">{p.name}</p>
                        <p className="text-muted-foreground text-[10px]">{p.code}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <details className="mt-3">
                  <summary className="text-xs text-gold/70 cursor-pointer hover:text-gold">
                    Ver todos os produtos
                  </summary>
                  <div className="grid grid-cols-2 gap-2 mt-2 max-h-48 overflow-y-auto">
                    {products.filter(p => p.category !== 'perfis').map(p => (
                      <button
                        key={p.id}
                        onClick={() => handleSelectProduct(p)}
                        className="flex items-center gap-2 p-2 rounded-lg text-left border border-border hover:border-gold/40 transition-all"
                      >
                        <div className="w-6 h-6 rounded-full border border-gold/20 shrink-0" style={{ backgroundColor: p.color }} />
                        <p className="text-foreground text-[11px] truncate">{p.name}</p>
                      </button>
                    ))}
                  </div>
                </details>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Surface selection */}
        {step === 4 && currentAnalysis && (
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                Superfícies disponíveis para revestimento
              </p>
              <div className="space-y-2">
                {(currentAnalysis.superficies_visiveis.length > 0
                  ? currentAnalysis.superficies_visiveis
                  : ['parede_frontal', 'parede_lateral', 'teto']
                ).map(surface => (
                  <button
                    key={surface}
                    onClick={() => toggleSurface(surface)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all border ${
                      selectedSurfaces.includes(surface)
                        ? 'border-gold bg-gold/10'
                        : 'border-border hover:border-gold/40'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      selectedSurfaces.includes(surface)
                        ? 'border-gold bg-gold'
                        : 'border-muted-foreground'
                    }`}>
                      {selectedSurfaces.includes(surface) && (
                        <CheckCircle size={12} className="text-background" />
                      )}
                    </div>
                    <span className="text-foreground text-sm">
                      {SURFACE_LABELS[surface] || surface}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={selectedSurfaces.length === 0}
              className="w-full px-4 py-3 bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))] text-background font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Visualizar Simulação
            </button>
          </div>
        )}

        {/* Step 5: Result */}
        {step === 5 && selectedProduct && (
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-gold/5 border border-gold/15">
              <p className="text-gold text-sm font-medium mb-1">
                Veja como ficaria com {selectedProduct.name}
              </p>
              <p className="text-muted-foreground text-xs">
                {selectedProduct.description}
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <span>{selectedProduct.code}</span>
                <span>•</span>
                <span>{selectedProduct.dimensions}</span>
              </div>
            </div>

            <button
              onClick={() => setStep(6)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-xl font-medium hover:bg-[#20BD5A] transition-colors"
            >
              <MessageCircle size={18} /> Solicitar Orçamento
            </button>

            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-muted-foreground hover:text-gold text-sm transition-colors"
            >
              <RefreshCw size={14} /> Nova Simulação
            </button>
          </div>
        )}

        {/* Step 6: WhatsApp */}
        {step >= 6 && (
          <div className="space-y-3 text-center py-4">
            <p className="text-gold font-medium text-sm">Pronto para transformar seu espaço!</p>
            <a
              href={`https://wa.me/5586999999999?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#25D366] text-white rounded-xl font-medium hover:bg-[#20BD5A] transition-colors"
            >
              <MessageCircle size={18} /> Abrir WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AISimulatorTab;
