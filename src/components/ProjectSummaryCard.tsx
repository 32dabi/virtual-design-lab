import { Home, Ruler, Layers, Package, Wrench, Info, DoorOpen } from 'lucide-react';
import type { Product } from '@/data/products';
import type { MeasurementData, CalculationResult } from '@/lib/pieceCalculator';

interface Props {
  roomType: string;
  surfaceLabels: string[];
  measurements: MeasurementData | null;
  calculation: CalculationResult | null;
  product: Product;
}

const ProjectSummaryCard = ({ roomType, surfaceLabels, measurements, calculation, product }: Props) => {
  const hasMeasurements = measurements && !measurements.skipMeasurements && calculation;

  return (
    <div className="glass-card rounded-2xl p-5 border border-gold/20 space-y-5">
      <h3 className="text-gold font-heading font-semibold text-base tracking-wide text-center">
        ✨ Seu Projeto Elevare
      </h3>

      {/* Ambiente */}
      <div className="space-y-2">
        <SectionHeader icon={<Home size={14} />} title="Ambiente" />
        <InfoRow icon={<Home size={12} />} label="Tipo" value={roomType} />
        <InfoRow icon={<Layers size={12} />} label="Superfície" value={surfaceLabels.join(', ')} />
        {hasMeasurements && (
          <>
            <InfoRow icon={<Ruler size={12} />} label="Medidas" value={`${measurements.width.toFixed(2)}m x ${measurements.height.toFixed(2)}m`} />
            {measurements.wallCount > 1 && (
              <InfoRow icon={<Layers size={12} />} label="Paredes" value={`${measurements.wallCount} iguais`} />
            )}
            <InfoRow icon={<Ruler size={12} />} label="Área total" value={`${calculation.grossArea.toFixed(2)} m²`} highlight />
            {calculation.doorDeduction > 0 && (
              <InfoRow icon={<DoorOpen size={12} />} label="Portas" value={`-${calculation.doorDeduction.toFixed(2)} m²`} muted />
            )}
            {calculation.windowDeduction > 0 && (
              <InfoRow icon={<DoorOpen size={12} />} label="Janelas" value={`-${calculation.windowDeduction.toFixed(2)} m²`} muted />
            )}
            {(calculation.doorDeduction > 0 || calculation.windowDeduction > 0) && (
              <InfoRow icon={<Ruler size={12} />} label="Área líquida" value={`${calculation.netArea.toFixed(2)} m²`} highlight />
            )}
          </>
        )}
      </div>

      {/* Produto */}
      <div className="space-y-2">
        <SectionHeader icon={<Package size={14} />} title="Produto Escolhido" />
        <div className="flex items-center gap-3 p-2 rounded-lg bg-card/50">
          <div className="w-8 h-8 rounded-full border-2 border-gold/30 shrink-0" style={{ backgroundColor: product.color }} />
          <div>
            <p className="text-foreground text-sm font-medium">{product.name}</p>
            <p className="text-muted-foreground text-[10px]">{product.code} • {product.dimensions}</p>
          </div>
        </div>
      </div>

      {/* Quantidade */}
      {hasMeasurements && (
        <div className="space-y-2">
          <SectionHeader icon={<Package size={14} />} title="Quantidade Necessária" />
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-lg bg-card/50 text-center">
              <p className="text-2xl font-heading font-bold text-foreground">{calculation.piecesExact}</p>
              <p className="text-[10px] text-muted-foreground">peças (área exata)</p>
            </div>
            <div className="p-3 rounded-lg bg-gold/10 border border-gold/20 text-center">
              <p className="text-2xl font-heading font-bold text-gold">{calculation.piecesWithMargin}</p>
              <p className="text-[10px] text-gold/70">peças (com margem)</p>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground/70 flex items-center gap-1">
            <Info size={10} /> Incluímos 10% extra para cortes na instalação
          </p>
        </div>
      )}

      {/* Acessórios */}
      {hasMeasurements && (
        <div className="space-y-2">
          <SectionHeader icon={<Wrench size={14} />} title="Acessórios Sugeridos" />
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-card/50">
              <span className="text-muted-foreground">Cantoneira PVC</span>
              <span className="text-foreground font-medium">{calculation.cornerTrimPieces} peças ({calculation.cornerTrimMeters.toFixed(1)}m)</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-card/50">
              <span className="text-muted-foreground">Clips de fixação</span>
              <span className="text-foreground font-medium">{calculation.clipsCount} unidades</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-card/50">
              <span className="text-muted-foreground">Perfil acabamento</span>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full border border-gold/20" style={{ backgroundColor: calculation.suggestedProfile.color }} />
                <span className="text-foreground font-medium">{calculation.suggestedProfile.name}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="text-center text-[10px] text-muted-foreground/60 border-t border-border pt-3">
        Valores sob consulta. Fale com nosso consultor!
      </p>
    </div>
  );
};

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-gold text-xs font-medium uppercase tracking-wider">
      {icon}
      {title}
    </div>
  );
}

function InfoRow({ icon, label, value, highlight, muted }: {
  icon: React.ReactNode; label: string; value: string; highlight?: boolean; muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-xs px-1">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {icon}
        {label}
      </div>
      <span className={highlight ? 'text-gold font-medium' : muted ? 'text-muted-foreground/70' : 'text-foreground'}>
        {value}
      </span>
    </div>
  );
}

export default ProjectSummaryCard;
