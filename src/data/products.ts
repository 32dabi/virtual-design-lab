export type ProductCategory = 'ripado-wpc' | 'ripado-fluted' | 'bamboo-carbon' | 'forro-pvc' | 'wpc-externo' | 'perfis';

export interface Product {
  id: string;
  name: string;
  code: string;
  color: string;
  category: ProductCategory;
  dimensions: string;
  description: string;
  application: string;
}

export const categoryLabels: Record<ProductCategory, string> = {
  'ripado-wpc': 'Ripados WPC',
  'ripado-fluted': 'Ripados Fluted',
  'bamboo-carbon': 'Bamboo Carbon',
  'forro-pvc': 'Forro PVC',
  'wpc-externo': 'WPC Externo',
  'perfis': 'Perfis e Acessórios',
};

export const products: Product[] = [
  // === RIPADOS WPC (Parede Interna) ===
  { id: 'carvalho-natural', name: 'Carvalho Natural', code: 'LTM 88696', color: '#C4AA82', category: 'ripado-wpc', dimensions: '160 x 2800 x 24mm', description: 'Tom carvalho claro e natural. Ideal para ambientes acolhedores e salas de estar.', application: 'Parede Interna' },
  { id: 'nogueira', name: 'Nogueira', code: 'LTM 88676', color: '#5C3D2E', category: 'ripado-wpc', dimensions: '160 x 2800 x 24mm', description: 'Tom nogueira médio, sofisticado e versátil. Perfeito para quartos e home offices.', application: 'Parede Interna' },
  { id: 'amendoa', name: 'Amêndoa', code: 'LTD 89015', color: '#D4B896', category: 'ripado-wpc', dimensions: '160 x 2800 x 24mm', description: 'Tom amêndoa claro e luminoso. Amplia visualmente os espaços com elegância.', application: 'Parede Interna' },
  { id: 'imbuia', name: 'Imbuia', code: 'LTM88626', color: '#3D2B1F', category: 'ripado-wpc', dimensions: '160 x 2800 x 24mm', description: 'Tom imbuia escuro e profundo. Nobreza brasileira para ambientes sofisticados.', application: 'Parede Interna' },
  { id: 'tiffany', name: 'Tiffany', code: '512601', color: '#5ABFAD', category: 'ripado-wpc', dimensions: '160 x 2800 x 24mm', description: 'Verde água vibrante. Ousadia e frescor para espaços comerciais e clínicas.', application: 'Parede Interna' },
  { id: 'preto-fosco', name: 'Preto Fosco', code: 'LT00987', color: '#1A1A1A', category: 'ripado-wpc', dimensions: '160 x 2800 x 24mm', description: 'Preto fosco elegante. Impacto visual dramático para ambientes de alto padrão.', application: 'Parede Interna' },

  // === RIPADOS FLUTED (Premium) ===
  { id: 'nogueira-escuro', name: 'Nogueira Escuro', code: 'KT 1073', color: '#3D2B1F', category: 'ripado-fluted', dimensions: '150 x 2800 x 15mm', description: 'Nogueira escuro com veios naturais marcantes. Ideal para painéis de TV e cabeceiras.', application: 'Parede Interna - Premium' },
  { id: 'carvalho-claro', name: 'Carvalho Claro', code: 'KT 1071', color: '#C4AA82', category: 'ripado-fluted', dimensions: '150 x 2800 x 15mm', description: 'Carvalho claro e moderno. Combina com decoração escandinava e minimalista.', application: 'Parede Interna - Premium' },
  { id: 'preto-liso', name: 'Preto Liso', code: 'LTM 8032', color: '#2D2D2D', category: 'ripado-fluted', dimensions: '130 x 2800 x 8mm', description: 'Preto liso com textura sutil. Minimalismo sofisticado para projetos premium.', application: 'Parede Interna - Premium' },
  { id: 'nero-marquina', name: 'Nero Marquina', code: 'X89-248', color: '#1A1A1A', category: 'ripado-fluted', dimensions: '130 x 2800 x 8mm', description: 'Padrão mármore preto com veios dourados e brancos. Luxo contemporâneo.', application: 'Parede Interna - Premium' },
  { id: 'cerejeira', name: 'Cerejeira', code: 'LTJCW2016', color: '#A0522D', category: 'ripado-fluted', dimensions: '150 x 2800 x 15mm', description: 'Cerejeira avermelhado com veios expressivos. Calor e personalidade.', application: 'Parede Interna - Premium' },
  { id: 'teca-natural', name: 'Teca Natural', code: 'KT 1073 var', color: '#B8860B', category: 'ripado-fluted', dimensions: '150 x 2800 x 15mm', description: 'Teca dourado clássico atemporal que combina com qualquer ambiente.', application: 'Parede Interna - Premium' },

  // === BAMBOO CARBON ===
  { id: 'bamboo-carvalho', name: 'Bamboo Carvalho Natural', code: 'LTM88614', color: '#C4AA82', category: 'bamboo-carbon', dimensions: '1220 x 2800 x 8mm', description: 'Bambu carbonizado tom carvalho. Grande formato para cobertura rápida.', application: 'Parede Interna' },
  { id: 'bamboo-nogueira', name: 'Bamboo Nogueira', code: 'LTM88631', color: '#5C3D2E', category: 'bamboo-carbon', dimensions: '1220 x 2800 x 8mm', description: 'Nogueira médio-escuro. Textura amadeirada profunda em grande formato.', application: 'Parede Interna' },
  { id: 'bamboo-imbuia', name: 'Bamboo Imbuia', code: 'LTM88653', color: '#3D2B1F', category: 'bamboo-carbon', dimensions: '1220 x 2800 x 8mm', description: 'Imbuia escuro com veios pronunciados. Sofisticação para painéis destaque.', application: 'Parede Interna' },
  { id: 'bamboo-teca-mel', name: 'Bamboo Teca Mel', code: 'LTM88634', color: '#B8860B', category: 'bamboo-carbon', dimensions: '1220 x 2800 x 8mm', description: 'Teca mel dourado. Calor e acolhimento em grandes superfícies.', application: 'Parede Interna' },

  // === FORRO PVC ===
  { id: 'forro-pvc-classic', name: 'Forro PVC Classic', code: 'LTM 88676', color: '#F5F0E8', category: 'forro-pvc', dimensions: '300 x 2800 x 8mm', description: 'Forro PVC de alta qualidade. Praticidade e design.', application: 'Teto / Forro' },

  // === WPC EXTERNO ===
  { id: 'wpc-cherry-wood', name: 'WPC Cherry Wood', code: 'WPC-CW', color: '#A0522D', category: 'wpc-externo', dimensions: '219 x 2900 x 26mm', description: 'Painel externo tom cerejeira. Resistente a UV e umidade.', application: 'Fachada / Deck' },
  { id: 'wpc-teak', name: 'WPC Teak', code: 'WPC-TK', color: '#5C4033', category: 'wpc-externo', dimensions: '219 x 2900 x 26mm', description: 'Painel externo tom teca escuro. Durabilidade máxima.', application: 'Fachada / Deck' },

  // === PERFIS DE ACABAMENTO ===
  { id: 'mental-line-silver', name: 'Mental Line Silver', code: 'ML-SV', color: '#C0C0C0', category: 'perfis', dimensions: '3000 x 8mm', description: 'Perfil de acabamento prata. Detalhamento refinado entre painéis.', application: 'Acabamento' },
  { id: 'mental-line-gold', name: 'Mental Line Gold', code: 'ML-GD', color: '#D4AF37', category: 'perfis', dimensions: '3000 x 8mm', description: 'Perfil de acabamento dourado. Toque de luxo nos detalhes.', application: 'Acabamento' },
  { id: 'mental-line-black', name: 'Mental Line Black', code: 'ML-BK', color: '#1A1A1A', category: 'perfis', dimensions: '3000 x 8mm', description: 'Perfil de acabamento preto. Discreto e elegante.', application: 'Acabamento' },
  { id: 'cantoneira-pvc', name: 'Cantoneira PVC', code: 'CT-PVC', color: '#8B7355', category: 'perfis', dimensions: '2800 x 25 x 25mm', description: 'Cantoneira PVC disponível em 6 cores. Acabamento perfeito nas quinas.', application: 'Acabamento' },
];
