import { useState, useRef, useMemo } from 'react';
import { Camera, Upload, Loader2, CheckCircle, MessageCircle, RefreshCw, Sparkles, Image as ImageIcon } from 'lucide-react';
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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<string>('image/jpeg');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSurfaces, setSelectedSurfaces] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const suggestedProducts = useMemo(() => {
    if (!analysis) return [];
    return analysis.sugestoes_produtos
      .map(code => {
        const normalized = code.replace(/[\s-]/g, '').toLowerCase();
        return products.find(p => p.code.replace(/[\s-]/g, '').toLowerCase() === normalized);
      })
      .filter(Boolean) as Product[];
  }, [analysis]);

  const closestScene = useMemo(() => {
    if (!selectedProduct || !analysis) return null;
    // Try to find a scene matching this product
    const match = roomScenes.find(s => s.productId === selectedProduct.id);
    return match || null;
  }, [selectedProduct, analysis]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError('Arquivo muito grande. Máximo 10MB.');
      return;
    }

    setError(null);
    const mType = file.type || 'image/jpeg';
    setMediaType(mType);

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      // Extract base64 data
      const base64Data = result.split(',')[1];
      setImageBase64(base64Data);
      setStep(2);
      analyzeImage(base64Data, mType);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async (base64: string, mType: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('analyze-room', {
        body: { imageBase64: base64, mediaType: mType },
      });

      if (fnError) {
        throw new Error(fnError.message || 'Erro ao analisar imagem');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setAnalysis(data as AnalysisResult);
      setStep(3);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'Erro ao analisar. Tente novamente.');
      // Stay on step 2 but allow retry or manual
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setStep(4);
    // Pre-select surfaces from analysis
    if (analysis?.superficies_visiveis) {
      setSelectedSurfaces(analysis.superficies_visiveis.slice(0, 2));
    }
  };

  const toggleSurface = (surface: string) => {
    setSelectedSurfaces(prev =>
      prev.includes(surface) ? prev.filter(s => s !== surface) : [...prev, surface]
    );
  };

  const handleGenerate = () => {
    setStep(5);
  };

  const reset = () => {
    setStep(1);
    setImagePreview(null);
    setImageBase64(null);
    setAnalysis(null);
    setSelectedProduct(null);
    setSelectedSurfaces([]);
    setError(null);
    setLoading(false);
  };

  const whatsappMsg = selectedProduct && analysis
    ? encodeURIComponent(
        `Olá! Fiz uma simulação no site da Elevare.\n\nAmbiente: ${analysis.tipo_comodo}\nProduto escolhido: ${selectedProduct.name} (${selectedProduct.code})\nSuperfície: ${selectedSurfaces.map(s => SURFACE_LABELS[s] || s).join(', ')}\n\nGostaria de um orçamento!`
      )
    : '';

  return (
    <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6">
      {/* LEFT: Preview area */}
      <div className="relative rounded-2xl overflow-hidden border border-border bg-card min-h-[400px] flex items-center justify-center">
        {step === 1 && !imagePreview && (
          <div className="text-center px-8 py-16">
            <div className="w-20 h-20 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-6">
              <Camera className="text-gold" size={36} />
            </div>
            <h3 className="text-xl font-heading font-semibold text-gold mb-2">
              Como ficaria no SEU espaço?
            </h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
              Envie uma foto do ambiente que deseja transformar
            </p>
            <label className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))] text-background font-semibold rounded-xl cursor-pointer hover:opacity-90 transition-opacity">
              <Upload size={18} />
              Escolher Foto
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/heic,application/pdf"
                capture="environment"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <p className="text-muted-foreground text-xs mt-4">
              Dica: tire a foto de frente para a parede, com boa iluminação
            </p>
            <p className="text-muted-foreground/60 text-[11px] mt-1">
              Aceita JPG, PNG, WEBP e fotos direto da câmera • Máx. 10MB
            </p>
          </div>
        )}

        {imagePreview && step < 5 && (
          <img
            src={imagePreview}
            alt="Seu ambiente"
            className="w-full h-full object-contain max-h-[500px]"
          />
        )}

        {step === 5 && (
          <div className="w-full h-full flex flex-col">
            {/* Side by side: user photo + closest scene */}
            <div className="grid grid-cols-2 gap-2 p-3 flex-1 min-h-0">
              <div className="relative rounded-lg overflow-hidden">
                <img src={imagePreview!} alt="Seu ambiente" className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-background/80 text-foreground text-[10px] px-2 py-0.5 rounded-full">
                  Seu Ambiente
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
            {/* AI recommendation */}
            {analysis?.recomendacao && (
              <div className="mx-3 mb-3 p-3 glass-card rounded-lg">
                <div className="flex items-start gap-2">
                  <Sparkles size={14} className="text-gold mt-0.5 shrink-0" />
                  <p className="text-foreground/80 text-sm">{analysis.recomendacao}</p>
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
            <p className="text-gold font-medium">Nossa IA está analisando seu ambiente...</p>
            <p className="text-muted-foreground text-sm mt-1">Isso leva alguns segundos</p>
          </div>
        )}
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

        {/* Error */}
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
            {error}
            <button onClick={reset} className="ml-2 underline">Tentar novamente</button>
          </div>
        )}

        {/* Step 1: Upload prompt */}
        {step === 1 && (
          <div className="text-center py-4">
            <p className="text-muted-foreground text-sm">
              Envie uma foto para começar a simulação com IA
            </p>
          </div>
        )}

        {/* Step 2: Loading / waiting */}
        {step === 2 && loading && (
          <div className="text-center py-4">
            <p className="text-muted-foreground text-sm">Aguarde a análise...</p>
          </div>
        )}

        {/* Step 2 with error: manual fallback */}
        {step === 2 && !loading && error && (
          <div className="space-y-3">
            <p className="text-foreground text-sm font-medium">Selecione o tipo de ambiente manualmente:</p>
            <div className="grid grid-cols-2 gap-2">
              {['sala', 'quarto', 'cozinha', 'banheiro', 'escritório', 'recepção', 'varanda', 'restaurante'].map(tipo => (
                <button
                  key={tipo}
                  onClick={() => {
                    setAnalysis({
                      tipo_comodo: tipo,
                      categoria: ['escritório', 'recepção', 'restaurante'].includes(tipo) ? 'comercial' : 'residencial',
                      superficies_visiveis: ['parede_frontal', 'parede_lateral'],
                      iluminacao: 'mista',
                      estilo_atual: 'moderno',
                      sugestoes_produtos: ['LTM 88696', 'KT 1073', 'LTM88634'],
                      descricao_ambiente: `Ambiente ${tipo}`,
                      recomendacao: `Para um ${tipo}, recomendamos painéis que combinem com o estilo do espaço.`,
                    });
                    setError(null);
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
        {step >= 3 && analysis && (
          <div className="space-y-4">
            {/* Analysis summary */}
            <div className="p-3 rounded-lg bg-gold/5 border border-gold/15">
              <p className="text-gold text-sm font-medium mb-1">
                Ambiente identificado: <span className="capitalize">{analysis.tipo_comodo}</span>
              </p>
              <p className="text-muted-foreground text-xs">{analysis.descricao_ambiente}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-foreground/70">
                  {analysis.iluminacao}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-foreground/70 capitalize">
                  {analysis.estilo_atual}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/15 text-gold capitalize">
                  {analysis.categoria}
                </span>
              </div>
            </div>

            {step === 3 && (
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                  Produtos recomendados para seu espaço
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
                {/* All products toggle */}
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
        {step === 4 && analysis && (
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                Superfícies disponíveis para revestimento
              </p>
              <div className="space-y-2">
                {(analysis.superficies_visiveis.length > 0
                  ? analysis.superficies_visiveis
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
