export type ProductCategory = 'ripado-madeira' | 'ripado-colors' | 'bamboo-carbon' | 'wpc-externo';

export interface Product {
  id: string;
  name: string;
  code: string;
  color: string; // hex
  category: ProductCategory;
  dimensions: string;
  description: string;
}

export const categoryLabels: Record<ProductCategory, string> = {
  'ripado-madeira': 'Ripados Madeira',
  'ripado-colors': 'Ripados Colors',
  'bamboo-carbon': 'Bamboo Carbon',
  'wpc-externo': 'WPC Externo',
};

export const products: Product[] = [
  // Ripados Madeira
  { id: 'carvalho', name: 'Carvalho', code: 'RM-001', color: '#C4A882', category: 'ripado-madeira', dimensions: '2700 x 160 x 22mm', description: 'Tom claro e sofisticado, ideal para ambientes acolhedores.' },
  { id: 'ambar', name: 'Âmbar', code: 'RM-002', color: '#B8860B', category: 'ripado-madeira', dimensions: '2700 x 160 x 22mm', description: 'Dourado quente, traz elegância natural ao ambiente.' },
  { id: 'canela', name: 'Canela', code: 'RM-003', color: '#8B6914', category: 'ripado-madeira', dimensions: '2700 x 160 x 22mm', description: 'Marrom médio acolhedor e versátil.' },
  { id: 'nogueira', name: 'Nogueira', code: 'RM-004', color: '#5C4033', category: 'ripado-madeira', dimensions: '2700 x 160 x 22mm', description: 'Escuro e rico, perfeito para ambientes sofisticados.' },
  { id: 'imbuia', name: 'Imbuia', code: 'RM-005', color: '#4A3728', category: 'ripado-madeira', dimensions: '2700 x 160 x 22mm', description: 'Madeira nobre brasileira, tom profundo e luxuoso.' },
  { id: 'cumaru', name: 'Cumaru', code: 'RM-006', color: '#6B4226', category: 'ripado-madeira', dimensions: '2700 x 160 x 22mm', description: 'Tom avermelhado que remete à natureza brasileira.' },
  { id: 'cedro', name: 'Cedro', code: 'RM-007', color: '#A0522D', category: 'ripado-madeira', dimensions: '2700 x 160 x 22mm', description: 'Clássico e atemporal, combina com qualquer decoração.' },
  { id: 'ipe', name: 'Ipê', code: 'RM-008', color: '#3B2F2F', category: 'ripado-madeira', dimensions: '2700 x 160 x 22mm', description: 'O mais escuro da linha madeira, sofisticação máxima.' },

  // Ripados Colors
  { id: 'preto', name: 'Preto', code: 'RC-001', color: '#1A1A1A', category: 'ripado-colors', dimensions: '2700 x 160 x 22mm', description: 'Elegância absoluta, impacto visual dramático.' },
  { id: 'branco', name: 'Branco', code: 'RC-002', color: '#F5F5F0', category: 'ripado-colors', dimensions: '2700 x 160 x 22mm', description: 'Clean e luminoso, amplia visualmente os espaços.' },
  { id: 'verde-menta', name: 'Verde Menta', code: 'RC-003', color: '#98D4AA', category: 'ripado-colors', dimensions: '2700 x 160 x 22mm', description: 'Frescor e personalidade para ambientes modernos.' },
  { id: 'azul-profundo', name: 'Azul Profundo', code: 'RC-004', color: '#1B3A5C', category: 'ripado-colors', dimensions: '2700 x 160 x 22mm', description: 'Sofisticado e envolvente, traz profundidade.' },
  { id: 'terracota', name: 'Terracota', code: 'RC-005', color: '#C75B39', category: 'ripado-colors', dimensions: '2700 x 160 x 22mm', description: 'Calor e rusticidade contemporânea.' },
  { id: 'cinza-grafite', name: 'Cinza Grafite', code: 'RC-006', color: '#4A4A4A', category: 'ripado-colors', dimensions: '2700 x 160 x 22mm', description: 'Neutro e industrial, combina com tudo.' },

  // Bamboo Carbon
  { id: 'bamboo-natural', name: 'Bamboo Natural', code: 'BC-001', color: '#D4C5A9', category: 'bamboo-carbon', dimensions: '2400 x 150 x 20mm', description: 'Textura única de bamboo carbonizado, sustentável e elegante.' },
  { id: 'bamboo-escuro', name: 'Bamboo Escuro', code: 'BC-002', color: '#8B7355', category: 'bamboo-carbon', dimensions: '2400 x 150 x 20mm', description: 'Versão escura do bamboo, sofisticação natural.' },
  { id: 'bamboo-marmore', name: 'Bamboo Mármore', code: 'BC-003', color: '#B8A88A', category: 'bamboo-carbon', dimensions: '2400 x 150 x 20mm', description: 'Efeito marmorizado dourado, peça de destaque.' },

  // WPC Externo
  { id: 'wpc-teca', name: 'WPC Teca', code: 'WE-001', color: '#A0855B', category: 'wpc-externo', dimensions: '2200 x 145 x 25mm', description: 'Resistente às intempéries, visual de madeira natural.' },
  { id: 'wpc-ipe', name: 'WPC Ipê', code: 'WE-002', color: '#5C4033', category: 'wpc-externo', dimensions: '2200 x 145 x 25mm', description: 'Durabilidade máxima para áreas externas.' },
];
