export type ProductCategory =
  | 'wpc-fluted'
  | 'pvc-corner'
  | 'bamboo-carbon'
  | 'pvc-ceiling'
  | 'fluted-panel'
  | 'mental-line'
  | 'wpc-outdoor'
  | 'clips';

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
  'mental-line': 'Perfis Mental Line',
  'wpc-outdoor': 'WPC Externo',
  'clips': 'Clips de Fixação',
};

export const products: Product[] = [];

/** Products that can be used in the simulator (excludes accessories) */
export const simulatorProducts = products.filter(
  p => !['pvc-corner', 'mental-line', 'clips'].includes(p.category)
);
