import type { Product } from '@/data/products';

// Area per piece in m² based on product code/category
const PIECE_AREAS: Record<string, number> = {
  // WPC Fluted - 0.160 x 2.800
  'LTM 88696': 0.448, 'LTM 88676': 0.448, 'LTD 89015': 0.448,
  'LTM88626': 0.448, '512601': 0.448, 'LT00987': 0.448,
  // Fluted 150mm - 0.150 x 2.800
  'KT 1073': 0.420, 'KT 1071': 0.420, 'LTJCW2016': 0.420, 'KT 1073 var': 0.420,
  // Fluted 130mm - 0.130 x 2.800
  'LTM 8032': 0.364, 'X89-248': 0.364,
  // Bamboo Carbon - 1.220 x 2.800
  'LTM88614': 3.416, 'LTM88631': 3.416, 'LTM88653': 3.416, 'LTM88634': 3.416,
  // Forro PVC - 0.300 x 2.800 (same code as WPC Nogueira but different product — forro uses category check)
  'LTM88676-forro': 0.840,
  // WPC Outdoor Painel - 0.219 x 2.900
  'WPC-CW': 0.635, 'WPC-TK': 0.635,
  // WPC Outdoor Cantoneira - 0.051 x 2.900 (linear)
  'WPC-CC': 0.148, 'WPC-CT': 0.148,
};

export interface DoorConfig { width: number; height: number; }
export interface WindowConfig { width: number; height: number; }

export interface MeasurementData {
  surfaceType: 'parede' | 'teto' | 'piso' | 'fachada';
  width: number;
  height: number;
  wallCount: number;
  deductDoors: boolean;
  doorCount: number;
  doorSize: DoorConfig;
  deductWindows: boolean;
  windowCount: number;
  windowSize: WindowConfig;
  skipMeasurements: boolean;
}

export interface CalculationResult {
  grossArea: number;
  doorDeduction: number;
  windowDeduction: number;
  netArea: number;
  piecesExact: number;
  piecesWithMargin: number;
  areaPerPiece: number;
  cornerTrimMeters: number;
  cornerTrimPieces: number;
  clipsCount: number;
  suggestedProfile: { name: string; code: string; color: string };
}

export function getSurfaceTypeFromAnalysis(surfaces: string[]): MeasurementData['surfaceType'] {
  if (surfaces.some(s => s.includes('teto') || s.includes('forro'))) return 'teto';
  if (surfaces.some(s => s.includes('piso') || s.includes('deck'))) return 'piso';
  if (surfaces.some(s => s.includes('externa') || s.includes('fachada'))) return 'fachada';
  return 'parede';
}

export function getAreaPerPiece(product: Product): number {
  return PIECE_AREAS[product.code] || 0.448;
}

export function calculatePieces(measurements: MeasurementData, product: Product): CalculationResult {
  const areaPerPiece = getAreaPerPiece(product);

  let grossArea: number;
  let wallCount = 1;

  if (measurements.surfaceType === 'parede' || measurements.surfaceType === 'fachada') {
    wallCount = measurements.wallCount || 1;
    grossArea = measurements.width * measurements.height * wallCount;
  } else {
    grossArea = measurements.width * measurements.height;
  }

  let doorDeduction = 0;
  if (measurements.deductDoors && measurements.doorCount > 0) {
    doorDeduction = measurements.doorCount * measurements.doorSize.width * measurements.doorSize.height;
  }

  let windowDeduction = 0;
  if (measurements.deductWindows && measurements.windowCount > 0) {
    windowDeduction = measurements.windowCount * measurements.windowSize.width * measurements.windowSize.height;
  }

  const netArea = Math.max(0, grossArea - doorDeduction - windowDeduction);
  const piecesExact = Math.ceil(netArea / areaPerPiece);
  const piecesWithMargin = Math.ceil(piecesExact * 1.10);

  // Accessories
  const perimeter = 2 * (measurements.width + measurements.height) * wallCount;
  const cornerTrimMeters = Math.ceil(perimeter * 10) / 10;
  const cornerTrimPieces = Math.ceil(cornerTrimMeters / 2.8);
  const clipsCount = Math.ceil(netArea * 10);

  // Profile suggestion based on product color lightness
  const hex = product.color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const lightness = (r * 0.299 + g * 0.587 + b * 0.114);

  let suggestedProfile: CalculationResult['suggestedProfile'];
  if (lightness > 160) {
    suggestedProfile = { name: 'Mental Line Gold', code: 'ML-PG', color: '#D4AF37' };
  } else if (lightness < 80) {
    suggestedProfile = { name: 'Mental Line Black', code: 'ML-PB', color: '#1A1A1A' };
  } else {
    suggestedProfile = { name: 'Mental Line Silver', code: 'ML-PS', color: '#C0C0C0' };
  }

  return {
    grossArea: Math.round(grossArea * 100) / 100,
    doorDeduction: Math.round(doorDeduction * 100) / 100,
    windowDeduction: Math.round(windowDeduction * 100) / 100,
    netArea: Math.round(netArea * 100) / 100,
    piecesExact,
    piecesWithMargin,
    areaPerPiece,
    cornerTrimMeters,
    cornerTrimPieces,
    clipsCount,
    suggestedProfile,
  };
}

export function buildWhatsAppMessage(
  analysis: { tipo_comodo: string },
  product: Product,
  surfaces: string[],
  measurements: MeasurementData | null,
  calculation: CalculationResult | null,
  surfaceLabels: Record<string, string>,
): string {
  const lines = [
    'Olá! Fiz uma simulação no site da Elevare.',
    '',
    'PROJETO:',
    `Ambiente: ${analysis.tipo_comodo}`,
    `Superfície: ${surfaces.map(s => surfaceLabels[s] || s).join(', ')}`,
  ];

  if (measurements && !measurements.skipMeasurements && calculation) {
    lines.push(`Medidas: ${measurements.width}m x ${measurements.height}m`);
    if (measurements.wallCount > 1) lines.push(`Paredes: ${measurements.wallCount}`);
    lines.push(`Área total: ${calculation.netArea} m²`);
    lines.push('');
    lines.push(`PRODUTO: ${product.name} (${product.code})`);
    lines.push(`Quantidade estimada: ${calculation.piecesWithMargin} peças`);
  } else {
    lines.push('');
    lines.push(`PRODUTO: ${product.name} (${product.code})`);
  }

  lines.push('');
  lines.push('Gostaria de saber valores e disponibilidade!');

  return lines.join('\n');
}
