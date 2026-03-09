import { useState, useRef, useMemo, useCallback } from 'react';
import { Camera, Upload, Loader2, CheckCircle, MessageCircle, RefreshCw, Sparkles, Image as ImageIcon, X, ChevronLeft, ChevronRight, Plus, Download } from 'lucide-react';
import { downloadWithWatermark } from '@/lib/watermark';
import { products, simulatorProducts, type Product } from '@/data/products';
import { roomScenes } from '@/data/rooms';
import { supabase } from '@/integrations/supabase/client';
import MeasurementStep from './MeasurementStep';
import ProjectSummaryCard from './ProjectSummaryCard';
import { calculatePieces, getSurfaceTypeFromAnalysis, buildWhatsAppMessage, type MeasurementData, type CalculationResult } from '@/lib/pieceCalculator';

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
  editedImage: string | null;
  editing: boolean;
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
  { num: 5, label: 'Medidas' },
  { num: 6, label: 'Visualização' },
  { num: 7, label: 'Orçamento' },
];

const AISimulatorTab = () => {
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSurfaces, setSelectedSurfaces] = useState<string[]>([]);
  const [measurements, setMeasurements] = useState<MeasurementData | null>(null);
  const [calculation, setCalculation] = useState<CalculationResult | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const activeImage = images[activeIndex] || null;

  const allAnalyses = useMemo(() => images.map(i => i.analysis).filter(Boolean) as AnalysisResult[], [images]);

  const suggestedProducts = useMemo(() => {
    if (allAnalyses.length === 0) return [];
    const allCodes = new Set<string>();
    allAnalyses.forEach(a => a.sugestoes_produtos.forEach(c => allCodes.add(c)));
    return Array.from(allCodes)
      .map(code => {
        const normalized = code.replace(/[\s-]/g, '').toLowerCase();
        return simulatorProducts.find(p => p.code.replace(/[\s-]/g, '').toLowerCase() === normalized);
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
        preview: result, base64: result.split(',')[1], mediaType: mType,
        analysis: null, analyzing: false, error: null,
        editedImage: null, editing: false,
      });
    }

    if (newEntries.length === 0) return;

    const allEntries = [...images, ...newEntries];
    setImages(allEntries);
    setActiveIndex(images.length);
    setStep(2);

    setLoading(true);
    let current = allEntries;
    for (let i = images.length; i < allEntries.length; i++) {
      setActiveIndex(i);
      current = await analyzeImage(i, current);
    }
    setLoading(false);

    const allDone = current.every(e => e.analysis !== null);
    if (allDone) { setStep(3); setActiveIndex(0); }
    if (fileRef.current) fileRef.current.value = '';
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    if (updated.length === 0) { reset(); } else {
      setActiveIndex(Math.min(activeIndex, updated.length - 1));
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setStep(4);
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

  const handleGoToMeasurements = () => setStep(5);

  const applyMaterialToImage = useCallback(async (imageEntry: ImageEntry, product: Product, surfaces: string[]) => {
    try {
      const { data, error: fnError } = await supabase.functions.invoke('apply-material', {
        body: {
          imageBase64: imageEntry.base64,
          mediaType: imageEntry.mediaType,
          productName: product.name,
          productCode: product.code,
          productColor: product.color,
          productFinish: product.finish || '',
          surfaces,
        },
      });

      if (fnError) throw new Error(fnError.message || 'Erro ao aplicar material');
      if (data?.error) throw new Error(data.error);

      return data.editedImage as string;
    } catch (err: any) {
      console.error('Apply material error:', err);
      throw err;
    }
  }, []);

  const handleMeasurementSubmit = async (data: MeasurementData) => {
    setMeasurements(data);
    if (selectedProduct) {
      const result = calculatePieces(data, selectedProduct);
      setCalculation(result);
    }
    setStep(6);
    
    // Start applying material to images
    if (selectedProduct && images.length > 0) {
      setLoading(true);
      const updated = [...images];
      for (let i = 0; i < updated.length; i++) {
        updated[i] = { ...updated[i], editing: true };
        setImages([...updated]);
        setActiveIndex(i);
        try {
          const editedImage = await applyMaterialToImage(updated[i], selectedProduct, selectedSurfaces);
          updated[i] = { ...updated[i], editedImage, editing: false };
        } catch {
          updated[i] = { ...updated[i], editing: false };
        }
        setImages([...updated]);
      }
      setLoading(false);
      setActiveIndex(0);
    }
  };

  const handleSkipMeasurements = async () => {
    setMeasurements({ surfaceType: 'parede', width: 0, height: 0, wallCount: 1, deductDoors: false, doorCount: 0, doorSize: { width: 0.8, height: 2.1 }, deductWindows: false, windowCount: 0, windowSize: { width: 1.2, height: 1 }, skipMeasurements: true });
    setCalculation(null);
    setStep(6);

    if (selectedProduct && images.length > 0) {
      setLoading(true);
      const updated = [...images];
      for (let i = 0; i < updated.length; i++) {
        updated[i] = { ...updated[i], editing: true };
        setImages([...updated]);
        setActiveIndex(i);
        try {
          const editedImage = await applyMaterialToImage(updated[i], selectedProduct, selectedSurfaces);
          updated[i] = { ...updated[i], editedImage, editing: false };
        } catch {
          updated[i] = { ...updated[i], editing: false };
        }
        setImages([...updated]);
      }
      setLoading(false);
      setActiveIndex(0);
    }
  };

  const saveSimulationImage = useCallback(async () => {
    if (!activeImage) return;
    
    // If we have an edited image, download it directly
    if (activeImage.editedImage) {
      const link = document.createElement('a');
      link.download = `elevare-simulacao-${selectedProduct?.name?.replace(/\s+/g, '-').toLowerCase() || 'ambiente'}.png`;
      link.href = activeImage.editedImage;
      link.click();
      return;
    }

    // Fallback: download original with watermark
    if (activeImage.preview) {
      downloadWithWatermark(activeImage.preview, selectedProduct?.name || 'ambiente');
    }
  }, [activeImage, selectedProduct]);

  const reset = () => {
    setStep(1);
    setImages([]);
    setActiveIndex(0);
    setSelectedProduct(null);
    setSelectedSurfaces([]);
    setMeasurements(null);
    setCalculation(null);
    setLoading(false);
  };

  const currentAnalysis = activeImage?.analysis || allAnalyses[0] || null;

  const whatsappMsg = selectedProduct && allAnalyses.length > 0
    ? encodeURIComponent(
        buildWhatsAppMessage(
          allAnalyses[0],
          selectedProduct,
          selectedSurfaces,
          measurements,
          calculation,
          SURFACE_LABELS,
        )
      )
    : '';

  const analyzingIndex = images.findIndex(i => i.analyzing);
  const analyzedCount = images.filter(i => i.analysis !== null).length;

  const surfaceType = useMemo(() => {
    if (!currentAnalysis) return 'parede' as const;
    return getSurfaceTypeFromAnalysis(selectedSurfaces);
  }, [currentAnalysis, selectedSurfaces]);

  return (
    <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6">
      {/* LEFT: Preview area */}
      <div className="relative rounded-2xl overflow-hidden border border-border bg-card min-h-[400px] flex flex-col">
        {/* Thumbnails bar */}
        {images.length > 0 && step < 7 && (
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
                <input type="file" accept="image/jpeg,image/png,image/webp,image/heic" multiple className="hidden" onChange={handleFileChange} />
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
                <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/heic" multiple className="hidden" onChange={handleFileChange} />
              </label>
              <p className="text-muted-foreground text-xs mt-4">Dica: tire a foto de frente para a parede, com boa iluminação</p>
              <p className="text-muted-foreground/60 text-[11px] mt-1">Aceita JPG, PNG, WEBP • Máx. 10MB por foto • Até {MAX_IMAGES} fotos</p>
            </div>
          )}

          {activeImage && step >= 2 && step <= 5 && (
            <>
              <img src={activeImage.preview} alt="Seu ambiente" className="w-full h-full object-contain max-h-[500px]" />
              {images.length > 1 && (
                <>
                  <button onClick={() => setActiveIndex(i => Math.max(0, i - 1))} disabled={activeIndex === 0}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center text-foreground hover:bg-background disabled:opacity-30 transition-all">
                    <ChevronLeft size={16} />
                  </button>
                  <button onClick={() => setActiveIndex(i => Math.min(images.length - 1, i + 1))} disabled={activeIndex === images.length - 1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center text-foreground hover:bg-background disabled:opacity-30 transition-all">
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </>
          )}

          {step === 6 && activeImage && (
            <div className="w-full h-full flex flex-col">
              <div className="flex-1 relative min-h-0 p-3">
                {activeImage.editedImage ? (
                  <img src={activeImage.editedImage} alt={`Ambiente com ${selectedProduct?.name}`} className="w-full h-full object-contain max-h-[500px] rounded-lg" />
                ) : activeImage.editing ? (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <Loader2 className="text-gold animate-spin mb-4" size={40} />
                    <p className="text-gold font-medium">Aplicando {selectedProduct?.name} no seu ambiente...</p>
                    <p className="text-muted-foreground text-sm mt-1">A IA está editando sua foto</p>
                  </div>
                ) : (
                  <img src={activeImage.preview} alt="Seu ambiente" className="w-full h-full object-contain max-h-[500px] rounded-lg opacity-60" />
                )}
                {activeImage.editedImage && (
                  <span className="absolute top-5 left-5 bg-gold/90 text-background text-xs px-3 py-1 rounded-full font-medium">
                    Com {selectedProduct?.name}
                  </span>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex items-center justify-center gap-2 pb-2">
                  {images.map((_, i) => (
                    <button key={i} onClick={() => setActiveIndex(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${activeIndex === i ? 'bg-gold scale-125' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'}`} />
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between px-3 pb-3">
                <button onClick={saveSimulationImage}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/15 text-gold rounded-lg text-xs font-medium hover:bg-gold/25 transition-colors">
                  <Download size={14} /> Salvar Imagem
                </button>
              </div>
            </div>
          )}

          {step >= 7 && (
            <div className="text-center px-8 py-16">
              <CheckCircle className="text-gold mx-auto mb-4" size={48} />
              <h3 className="text-xl font-heading font-semibold text-gold mb-2">
                Simulação Concluída!
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Gostou? Salve a imagem ou solicite um orçamento!
              </p>
              <div className="flex flex-col gap-3 max-w-xs mx-auto">
                <button onClick={saveSimulationImage}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gold/15 text-gold rounded-xl font-medium hover:bg-gold/25 transition-colors border border-gold/30">
                  <Download size={18} /> Baixar Simulação
                </button>
                <a href={`https://wa.me/5586994122399?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-xl font-medium hover:bg-[#20BD5A] transition-colors">
                  <MessageCircle size={18} /> Solicitar Orçamento via WhatsApp
                </a>
                <button onClick={() => { setStep(3); setMeasurements(null); setCalculation(null); }}
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-gold/30 text-gold rounded-xl text-sm hover:bg-gold/10 transition-colors">
                  <RefreshCw size={16} /> Refazer com outro produto
                </button>
                <button onClick={reset}
                  className="flex items-center justify-center gap-2 px-6 py-2 text-muted-foreground hover:text-gold text-sm transition-colors">
                  <RefreshCw size={14} /> Nova Simulação
                </button>
              </div>
            </div>
          )}

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
                  <div className="h-full bg-gold rounded-full transition-all duration-500" style={{ width: `${(analyzedCount / images.length) * 100}%` }} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Controls */}
      <div className="glass-card rounded-2xl p-5 space-y-5 max-h-[700px] overflow-y-auto">
        {/* Steps indicator */}
        <div className="flex items-center gap-0.5 overflow-x-auto pb-2">
          {STEPS.map(s => (
            <div key={s.num} className="flex items-center gap-0.5 shrink-0">
              <div className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center transition-all ${
                step >= s.num ? 'bg-gold text-background' : 'bg-muted text-muted-foreground'
              }`}>
                {step > s.num ? '✓' : s.num}
              </div>
              <span className={`text-[9px] ${step >= s.num ? 'text-gold' : 'text-muted-foreground'}`}>{s.label}</span>
              {s.num < 7 && <div className={`w-2 h-px ${step > s.num ? 'bg-gold' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        {/* Errors */}
        {images.some(i => i.error) && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
            {images.filter(i => i.error).map((img, idx) => (
              <p key={idx}>Foto {images.indexOf(img) + 1}: {img.error}</p>
            ))}
            <button onClick={reset} className="ml-2 underline">Tentar novamente</button>
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <div className="text-center py-4">
            <p className="text-muted-foreground text-sm">Envie até {MAX_IMAGES} fotos para começar a simulação com IA</p>
          </div>
        )}

        {/* Step 2 loading */}
        {step === 2 && loading && (
          <div className="text-center py-4">
            <p className="text-muted-foreground text-sm">Aguarde a análise das {images.length} foto{images.length > 1 ? 's' : ''}...</p>
          </div>
        )}

        {/* Step 2 with errors */}
        {step === 2 && !loading && images.some(i => i.error) && (
          <div className="space-y-3">
            <p className="text-foreground text-sm font-medium">Selecione o tipo de ambiente manualmente:</p>
            <div className="grid grid-cols-2 gap-2">
              {['sala', 'quarto', 'cozinha', 'banheiro', 'escritório', 'recepção', 'varanda', 'restaurante'].map(tipo => (
                <button key={tipo} onClick={() => {
                  const updated = images.map(img => img.analysis ? img : {
                    ...img, error: null,
                    analysis: {
                      tipo_comodo: tipo, categoria: ['escritório', 'recepção', 'restaurante'].includes(tipo) ? 'comercial' : 'residencial',
                      superficies_visiveis: ['parede_frontal', 'parede_lateral'], iluminacao: 'mista', estilo_atual: 'moderno',
                      sugestoes_produtos: ['LTM 88696', 'KT 1073', 'LTM88634'], descricao_ambiente: `Ambiente ${tipo}`,
                      recomendacao: `Para um ${tipo}, recomendamos painéis que combinem com o estilo do espaço.`,
                    } as AnalysisResult,
                  });
                  setImages(updated); setStep(3);
                }}
                  className="px-3 py-2 rounded-lg text-xs font-medium bg-muted/50 text-muted-foreground hover:text-gold hover:bg-gold/10 transition-all capitalize">
                  {tipo}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3+: Analysis summary */}
        {step >= 3 && currentAnalysis && (
          <div className="space-y-4">
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
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-foreground/70">{currentAnalysis.iluminacao}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-foreground/70 capitalize">{currentAnalysis.estilo_atual}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/15 text-gold capitalize">{currentAnalysis.categoria}</span>
              </div>
            </div>

            {/* Step 3: Product selection */}
            {step === 3 && (
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                  Produtos recomendados para {images.length > 1 ? 'seus espaços' : 'seu espaço'}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {suggestedProducts.map(p => (
                    <button key={p.id} onClick={() => handleSelectProduct(p)}
                      className={`flex items-center gap-2 p-2 rounded-lg text-left transition-all border ${
                        selectedProduct?.id === p.id ? 'border-gold bg-gold/10' : 'border-border hover:border-gold/40'
                      }`}>
                      <div className="w-8 h-8 rounded-full border border-gold/20 shrink-0" style={{ backgroundColor: p.color }} />
                      <div className="min-w-0">
                        <p className="text-foreground text-xs font-medium truncate">{p.name}</p>
                        <p className="text-muted-foreground text-[10px]">{p.code}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <details className="mt-3">
                  <summary className="text-xs text-gold/70 cursor-pointer hover:text-gold">Ver todos os produtos</summary>
                  <div className="grid grid-cols-2 gap-2 mt-2 max-h-48 overflow-y-auto">
                    {simulatorProducts.map(p => (
                      <button key={p.id} onClick={() => handleSelectProduct(p)}
                        className="flex items-center gap-2 p-2 rounded-lg text-left border border-border hover:border-gold/40 transition-all">
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
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Superfícies disponíveis para revestimento</p>
              <div className="space-y-2">
                {(currentAnalysis.superficies_visiveis.length > 0
                  ? currentAnalysis.superficies_visiveis
                  : ['parede_frontal', 'parede_lateral', 'teto']
                ).map(surface => (
                  <button key={surface} onClick={() => toggleSurface(surface)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all border ${
                      selectedSurfaces.includes(surface) ? 'border-gold bg-gold/10' : 'border-border hover:border-gold/40'
                    }`}>
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      selectedSurfaces.includes(surface) ? 'border-gold bg-gold' : 'border-muted-foreground'
                    }`}>
                      {selectedSurfaces.includes(surface) && <CheckCircle size={12} className="text-background" />}
                    </div>
                    <span className="text-foreground text-sm">{SURFACE_LABELS[surface] || surface}</span>
                  </button>
                ))}
              </div>
            </div>
            <button onClick={handleGoToMeasurements} disabled={selectedSurfaces.length === 0}
              className="w-full px-4 py-3 bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))] text-background font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
              Próximo: Medidas do Espaço
            </button>
          </div>
        )}

        {/* Step 5: Measurements (NEW) */}
        {step === 5 && selectedProduct && (
          <MeasurementStep
            surfaceType={surfaceType}
            onSubmit={handleMeasurementSubmit}
            onSkip={handleSkipMeasurements}
          />
        )}

        {/* Step 6: Simulation result */}
        {step === 6 && selectedProduct && (
          <div className="space-y-4">
            <ProjectSummaryCard
              roomType={currentAnalysis?.tipo_comodo || 'Ambiente'}
              surfaceLabels={selectedSurfaces.map(s => SURFACE_LABELS[s] || s)}
              measurements={measurements}
              calculation={calculation}
              product={selectedProduct}
            />
            <button onClick={() => setStep(7)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-xl font-medium hover:bg-[#20BD5A] transition-colors">
              <MessageCircle size={18} /> Solicitar Orçamento
            </button>
            <button onClick={reset}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-muted-foreground hover:text-gold text-sm transition-colors">
              <RefreshCw size={14} /> Nova Simulação
            </button>
          </div>
        )}

        {/* Step 7: WhatsApp */}
        {step >= 7 && (
          <div className="space-y-4">
            {selectedProduct && (
              <ProjectSummaryCard
                roomType={currentAnalysis?.tipo_comodo || 'Ambiente'}
                surfaceLabels={selectedSurfaces.map(s => SURFACE_LABELS[s] || s)}
                measurements={measurements}
                calculation={calculation}
                product={selectedProduct}
              />
            )}
            <div className="space-y-3 text-center py-2">
              <p className="text-gold font-medium text-sm">Pronto para transformar seu espaço!</p>
              <a href={`https://wa.me/5586994122399?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#25D366] text-white rounded-xl font-medium hover:bg-[#20BD5A] transition-colors">
                <MessageCircle size={18} /> Abrir WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AISimulatorTab;
