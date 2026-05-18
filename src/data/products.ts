export type ProductCategory =
  | 'wpc-fluted'
  | 'pvc-corner'
  | 'bamboo-carbon'
  | 'pvc-ceiling'
  | 'fluted-panel'
  | 'mental-line'
  | 'wpc-outdoor'
  | 'clips'
  | 'deck';

export interface Product {
  id: string;
  name: string;
  code: string;
  color: string;
  category: ProductCategory;
  dimensions: string;
  description: string;
  application: string;
  finish?: string;
  subType?: string;
  imageCode?: string;
}

export const categoryLabels: Record<ProductCategory, string> = {
  'wpc-fluted': 'Ripados WPC',
  'pvc-corner': 'Cantoneiras PVC',
  'bamboo-carbon': 'Bamboo Carbon',
  'pvc-ceiling': 'Forro PVC',
  'fluted-panel': 'Fluted Premium',
  'mental-line': 'Perfis Metal Line',
  'wpc-outdoor': 'WPC Externo',
  clips: 'Clips de Fixação',
  deck: 'Deck WPC',
};

// Catálogo zerado temporariamente — será reconstruído com os novos materiais da Elevare.
export const products: Product[] = [];

// Produtos do simulador serão repovoados junto com o novo catálogo.
export const simulatorProducts: Product[] = [];
