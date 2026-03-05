import { useState, useEffect, useMemo } from 'react';
import { Ruler, DoorOpen, SquareIcon, ArrowRight, HelpCircle } from 'lucide-react';
import type { MeasurementData } from '@/lib/pieceCalculator';
import { Slider } from '@/components/ui/slider';

interface Props {
  surfaceType: MeasurementData['surfaceType'];
  onSubmit: (data: MeasurementData) => void;
  onSkip: () => void;
}

const SURFACE_CONFIG: Record<MeasurementData['surfaceType'], { widthLabel: string; heightLabel: string; icon: string }> = {
  parede: { widthLabel: 'Largura da parede', heightLabel: 'Altura da parede', icon: '🧱' },
  teto: { widthLabel: 'Comprimento do cômodo', heightLabel: 'Largura do cômodo', icon: '🏠' },
  piso: { widthLabel: 'Comprimento da área', heightLabel: 'Largura da área', icon: '🪵' },
  fachada: { widthLabel: 'Largura da fachada', heightLabel: 'Altura da fachada', icon: '🏢' },
};

const MeasurementStep = ({ surfaceType, onSubmit, onSkip }: Props) => {
  const config = SURFACE_CONFIG[surfaceType];
  const showWallCount = surfaceType === 'parede';
  const showDeductions = surfaceType === 'parede' || surfaceType === 'fachada';

  const [width, setWidth] = useState(3.00);
  const [height, setHeight] = useState(2.80);
  const [wallCount, setWallCount] = useState(1);
  const [deductDoors, setDeductDoors] = useState(false);
  const [doorCount, setDoorCount] = useState(1);
  const [doorWidth, setDoorWidth] = useState(0.80);
  const [doorHeight, setDoorHeight] = useState(2.10);
  const [deductWindows, setDeductWindows] = useState(false);
  const [windowCount, setWindowCount] = useState(1);
  const [windowWidth, setWindowWidth] = useState(1.20);
  const [windowHeight, setWindowHeight] = useState(1.00);

  const totalArea = useMemo(() => {
    let gross = width * height * (showWallCount ? wallCount : 1);
    if (deductDoors) gross -= doorCount * doorWidth * doorHeight;
    if (deductWindows) gross -= windowCount * windowWidth * windowHeight;
    return Math.max(0, Math.round(gross * 100) / 100);
  }, [width, height, wallCount, showWallCount, deductDoors, doorCount, doorWidth, doorHeight, deductWindows, windowCount, windowWidth, windowHeight]);

  const handleSubmit = () => {
    onSubmit({
      surfaceType,
      width,
      height,
      wallCount: showWallCount ? wallCount : 1,
      deductDoors,
      doorCount,
      doorSize: { width: doorWidth, height: doorHeight },
      deductWindows,
      windowCount,
      windowSize: { width: windowWidth, height: windowHeight },
      skipMeasurements: false,
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="text-gold text-sm font-medium mb-1">
          {config.icon} Informe as medidas do espaço
        </p>
        <p className="text-muted-foreground text-xs">
          Com as medidas, calculamos exatamente quantas peças você precisa
        </p>
      </div>

      {/* Width */}
      <MeasureInput label={config.widthLabel} value={width} onChange={setWidth} min={0.5} max={20} />

      {/* Height */}
      <MeasureInput label={config.heightLabel} value={height} onChange={setHeight} min={0.5} max={10} />

      {/* Wall count */}
      {showWallCount && (
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">Quantidade de paredes iguais</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(n => (
              <button
                key={n}
                onClick={() => setWallCount(n)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                  wallCount === n
                    ? 'border-gold bg-gold/15 text-gold'
                    : 'border-border text-muted-foreground hover:border-gold/40'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Door deductions */}
      {showDeductions && (
        <div className="space-y-3">
          <ToggleRow label="Descontar portas?" checked={deductDoors} onChange={setDeductDoors} />
          {deductDoors && (
            <div className="pl-4 space-y-3 border-l-2 border-gold/20">
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Quantas portas</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map(n => (
                    <button
                      key={n}
                      onClick={() => setDoorCount(n)}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all border ${
                        doorCount === n
                          ? 'border-gold bg-gold/15 text-gold'
                          : 'border-border text-muted-foreground hover:border-gold/40'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <MeasureInput label="Largura porta" value={doorWidth} onChange={setDoorWidth} min={0.5} max={2} small />
                <MeasureInput label="Altura porta" value={doorHeight} onChange={setDoorHeight} min={1} max={3} small />
              </div>
            </div>
          )}

          <ToggleRow label="Descontar janelas?" checked={deductWindows} onChange={setDeductWindows} />
          {deductWindows && (
            <div className="pl-4 space-y-3 border-l-2 border-gold/20">
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Quantas janelas</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <button
                      key={n}
                      onClick={() => setWindowCount(n)}
                      className={`flex-1 py-2 rounded-lg text-[10px] font-medium transition-all border ${
                        windowCount === n
                          ? 'border-gold bg-gold/15 text-gold'
                          : 'border-border text-muted-foreground hover:border-gold/40'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <MeasureInput label="Largura janela" value={windowWidth} onChange={setWindowWidth} min={0.3} max={3} small />
                <MeasureInput label="Altura janela" value={windowHeight} onChange={setWindowHeight} min={0.3} max={2.5} small />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Area preview */}
      <div className="p-4 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SquareIcon size={18} className="text-gold" />
          <span className="text-sm text-foreground font-medium">Área total</span>
        </div>
        <span className="text-xl font-heading font-bold text-gold">{totalArea.toFixed(2)} m²</span>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={totalArea <= 0}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))] text-background font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        Calcular Peças <ArrowRight size={16} />
      </button>

      {/* Skip option */}
      <button
        onClick={onSkip}
        className="w-full flex items-center justify-center gap-2 py-2 text-muted-foreground hover:text-gold text-xs transition-colors"
      >
        <HelpCircle size={12} />
        Não sei as medidas exatas — pular cálculo
      </button>
      <p className="text-center text-muted-foreground/50 text-[10px] -mt-3">
        Sem problema! Você pode pedir as medidas ao nosso consultor
      </p>
    </div>
  );
};

// === Sub-components ===

function MeasureInput({ label, value, onChange, min, max, small }: {
  label: string; value: number; onChange: (v: number) => void; min: number; max: number; small?: boolean;
}) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    if (!isNaN(v) && v >= min && v <= max) onChange(Math.round(v * 100) / 100);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className={`text-muted-foreground ${small ? 'text-[10px]' : 'text-xs'}`}>{label}</label>
        <div className="flex items-center gap-1">
          <input
            type="number"
            step="0.01"
            min={min}
            max={max}
            value={value.toFixed(2)}
            onChange={handleInputChange}
            className={`bg-card border border-border rounded-lg text-center text-foreground font-medium focus:border-gold focus:outline-none transition-colors ${
              small ? 'w-16 py-1 text-xs' : 'w-20 py-1.5 text-sm'
            }`}
          />
          <span className={`text-muted-foreground ${small ? 'text-[10px]' : 'text-xs'}`}>m</span>
        </div>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(Math.round(v * 100) / 100)}
        min={min}
        max={max}
        step={0.01}
        className="[&_[role=slider]]:bg-gold [&_[role=slider]]:border-gold [&_.relative>div]:bg-gold"
      />
    </div>
  );
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:border-gold/30 transition-all"
    >
      <span className="text-sm text-foreground">{label}</span>
      <div className={`w-10 h-5 rounded-full transition-all relative ${checked ? 'bg-gold' : 'bg-muted'}`}>
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-background shadow transition-all ${checked ? 'left-5.5 right-0.5' : 'left-0.5'}`}
          style={{ left: checked ? '22px' : '2px' }}
        />
      </div>
    </button>
  );
}

export default MeasurementStep;
