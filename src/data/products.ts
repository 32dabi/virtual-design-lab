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

export const products: Product[] = [
  // === CATEGORIA 1: WPC FLUTED WALL PANEL (6 cores) ===
  { id: 'wpc-carvalho-natural', name: 'Ripado Carvalho Natural', code: 'LTM 88696', color: '#C4AA82', category: 'wpc-fluted', dimensions: '160 x 2800 x 24mm', description: 'Tom carvalho claro com veios amadeirados naturais. Ideal para ambientes acolhedores e salas de estar.', application: 'Parede Interna', finish: 'Ripado Vertical' },
  { id: 'wpc-nogueira', name: 'Ripado Nogueira', code: 'LTM 88676', color: '#5C3D2E', category: 'wpc-fluted', dimensions: '160 x 2800 x 24mm', description: 'Tom nogueira médio marrom, sofisticado e versátil. Perfeito para quartos e home offices.', application: 'Parede Interna', finish: 'Ripado Vertical' },
  { id: 'wpc-amendoa', name: 'Ripado Amêndoa', code: 'LTD 89015', color: '#D4B896', category: 'wpc-fluted', dimensions: '160 x 2800 x 24mm', description: 'Tom amêndoa claro bege luminoso. Amplia visualmente os espaços com elegância.', application: 'Parede Interna', finish: 'Ripado Vertical' },
  { id: 'wpc-imbuia', name: 'Ripado Imbuia', code: 'LTM88626', color: '#3D2B1F', category: 'wpc-fluted', dimensions: '160 x 2800 x 24mm', description: 'Tom imbuia escuro profundo. Nobreza brasileira para ambientes sofisticados.', application: 'Parede Interna', finish: 'Ripado Vertical' },
  { id: 'wpc-tiffany', name: 'Ripado Tiffany', code: '512601', color: '#5ABFAD', category: 'wpc-fluted', dimensions: '160 x 2800 x 24mm', description: 'Verde água vibrante. Ousadia e frescor para espaços comerciais e clínicas.', application: 'Parede Interna', finish: 'Ripado Vertical' },
  { id: 'wpc-preto-fosco', name: 'Ripado Preto Fosco', code: 'LT00987', color: '#1A1A1A', category: 'wpc-fluted', dimensions: '160 x 2800 x 24mm', description: 'Preto fosco elegante. Impacto visual dramático para ambientes de alto padrão.', application: 'Parede Interna', finish: 'Ripado Vertical' },

  // === CATEGORIA 2: PVC CORNER / CANTONEIRA (6 cores) ===
  { id: 'cant-carvalho', name: 'Cantoneira Carvalho Natural', code: 'CT-CV', color: '#C4AA82', category: 'pvc-corner', dimensions: '2800 x 25 x 25mm', description: 'Cantoneira PVC tom carvalho natural. Acabamento perfeito nas quinas.', application: 'Acabamento' },
  { id: 'cant-nogueira', name: 'Cantoneira Nogueira', code: 'CT-NG', color: '#5C3D2E', category: 'pvc-corner', dimensions: '2800 x 25 x 25mm', description: 'Cantoneira PVC tom nogueira. Acabamento perfeito nas quinas.', application: 'Acabamento' },
  { id: 'cant-amendoa', name: 'Cantoneira Amêndoa', code: 'CT-AM', color: '#D4B896', category: 'pvc-corner', dimensions: '2800 x 25 x 25mm', description: 'Cantoneira PVC tom amêndoa. Acabamento perfeito nas quinas.', application: 'Acabamento' },
  { id: 'cant-imbuia', name: 'Cantoneira Imbuia', code: 'CT-IM', color: '#3D2B1F', category: 'pvc-corner', dimensions: '2800 x 25 x 25mm', description: 'Cantoneira PVC tom imbuia. Acabamento perfeito nas quinas.', application: 'Acabamento' },
  
  { id: 'cant-preto', name: 'Cantoneira Preto Fosco', code: 'CT-PF', color: '#1A1A1A', category: 'pvc-corner', dimensions: '2800 x 25 x 25mm', description: 'Cantoneira PVC preto fosco. Acabamento perfeito nas quinas.', application: 'Acabamento' },

  // === CATEGORIA 3: BAMBOO CARBON (4 cores) ===
  { id: 'bamboo-carvalho', name: 'Bamboo Carvalho Natural', code: 'LTM88614', color: '#C4AA82', category: 'bamboo-carbon', dimensions: '1220 x 2800 x 8mm', description: 'Placa lisa grande formato, textura bambu carbonizado tom carvalho. Cobertura rápida.', application: 'Parede Interna', finish: 'Liso' },
  { id: 'bamboo-nogueira', name: 'Bamboo Nogueira', code: 'LTM88631', color: '#5C3D2E', category: 'bamboo-carbon', dimensions: '1220 x 2800 x 8mm', description: 'Placa lisa grande formato, textura bambu carbonizado tom nogueira. Sofisticação em grandes superfícies.', application: 'Parede Interna', finish: 'Liso' },
  { id: 'bamboo-imbuia', name: 'Bamboo Imbuia', code: 'LTM88653', color: '#3D2B1F', category: 'bamboo-carbon', dimensions: '1220 x 2800 x 8mm', description: 'Placa lisa grande formato, textura bambu carbonizado tom imbuia escuro. Painéis destaque.', application: 'Parede Interna', finish: 'Liso' },
  { id: 'bamboo-teca-mel', name: 'Bamboo Teca Mel', code: 'LTM88634', color: '#B8860B', category: 'bamboo-carbon', dimensions: '1220 x 2800 x 8mm', description: 'Placa lisa grande formato, textura bambu carbonizado tom teca mel dourado. Calor e acolhimento.', application: 'Parede Interna', finish: 'Liso' },

  // === CATEGORIA 4: PVC CEILING / FORRO (1 cor) ===
  { id: 'forro-pvc-nogueira', name: 'Forro PVC Nogueira', code: 'LTM 88676', color: '#5C3D2E', category: 'pvc-ceiling', dimensions: '300 x 2800 x 8mm', description: 'Régua larga lisa com acabamento amadeirado nogueira. Praticidade e design para forros.', application: 'Teto / Forro', finish: 'Liso Amadeirado', imageCode: 'LTM88676-forro' },

  // === CATEGORIA 5: FLUTED WALL PANEL PREMIUM (3 tipos, 6 cores) ===
  // Tipo 1 - Ripado fino 150mm (15mm espessura)
  { id: 'fluted-nogueira-escuro', name: 'Fluted Nogueira Escuro', code: 'KT 1073', color: '#3D2B1F', category: 'fluted-panel', dimensions: '150 x 2800 x 15mm', description: 'Ripado fino vertical com ranhuras estreitas, tom nogueira escuro. Ideal para painéis de TV e cabeceiras.', application: 'Parede Interna - Premium', finish: 'Ripado Fino', subType: 'fino-150' },
  { id: 'fluted-carvalho-claro', name: 'Fluted Carvalho Claro', code: 'KT 1071', color: '#C4AA82', category: 'fluted-panel', dimensions: '150 x 2800 x 15mm', description: 'Ripado fino vertical com ranhuras estreitas, tom carvalho claro. Estilo escandinavo e minimalista.', application: 'Parede Interna - Premium', finish: 'Ripado Fino', subType: 'fino-150' },

  // Tipo 2 - Ripado estreito 130mm (8mm espessura)
  { id: 'fluted-preto-liso', name: 'Fluted Preto Liso', code: 'LTM 8032', color: '#2D2D2D', category: 'fluted-panel', dimensions: '130 x 2800 x 8mm', description: 'Ripado estreito vertical com textura lisa, preto. Minimalismo sofisticado para projetos premium.', application: 'Parede Interna - Premium', finish: 'Ripado Estreito', subType: 'estreito-130' },
  { id: 'fluted-nero-marquina', name: 'Fluted Nero Marquina', code: 'X89-248', color: '#1A1A1A', category: 'fluted-panel', dimensions: '130 x 2800 x 8mm', description: 'Ripado estreito vertical com padrão mármore preto com veios dourados e brancos. Luxo contemporâneo.', application: 'Parede Interna - Premium', finish: 'Ripado Estreito', subType: 'estreito-130' },

  // Tipo 3 - Ripado médio texturizado 150mm (15mm espessura)
  { id: 'fluted-cerejeira', name: 'Fluted Cerejeira', code: 'LTJCW2016', color: '#A0522D', category: 'fluted-panel', dimensions: '150 x 2800 x 15mm', description: 'Ripado texturizado vertical com veios de madeira visíveis, tom cerejeira avermelhado. Calor e personalidade.', application: 'Parede Interna - Premium', finish: 'Ripado Texturizado', subType: 'texturizado-150' },
  { id: 'fluted-teca-natural', name: 'Fluted Teca Natural', code: 'KT 1073 var', color: '#B8860B', category: 'fluted-panel', dimensions: '150 x 2800 x 15mm', description: 'Ripado texturizado vertical com veios de madeira visíveis, tom teca dourado clássico atemporal.', application: 'Parede Interna - Premium', finish: 'Ripado Texturizado', subType: 'texturizado-150' },

  // === CATEGORIA 6: MENTAL LINE / PERFIL (2 moldes x 3 cores = 6) ===
  { id: 'ml-peq-silver', name: 'Mental Line Pequeno Silver', code: 'ML-PS', color: '#C0C0C0', category: 'mental-line', dimensions: '3000 x 8mm', description: 'Perfil de acabamento prata, molde pequeno. Detalhamento refinado entre painéis.', application: 'Acabamento', subType: 'pequeno' },
  { id: 'ml-peq-gold', name: 'Mental Line Pequeno Gold', code: 'ML-PG', color: '#D4AF37', category: 'mental-line', dimensions: '3000 x 8mm', description: 'Perfil de acabamento dourado, molde pequeno. Toque de luxo nos detalhes.', application: 'Acabamento', subType: 'pequeno' },
  { id: 'ml-peq-black', name: 'Mental Line Pequeno Black', code: 'ML-PB', color: '#1A1A1A', category: 'mental-line', dimensions: '3000 x 8mm', description: 'Perfil de acabamento preto, molde pequeno. Discreto e elegante.', application: 'Acabamento', subType: 'pequeno' },
  { id: 'ml-grd-silver', name: 'Mental Line Grande Silver', code: 'ML-GS', color: '#C0C0C0', category: 'mental-line', dimensions: '3000 x 8mm', description: 'Perfil de acabamento prata, molde grande. Para junções mais expressivas.', application: 'Acabamento', subType: 'grande' },
  { id: 'ml-grd-gold', name: 'Mental Line Grande Gold', code: 'ML-GG', color: '#D4AF37', category: 'mental-line', dimensions: '3000 x 8mm', description: 'Perfil de acabamento dourado, molde grande. Presença marcante nos detalhes.', application: 'Acabamento', subType: 'grande' },
  { id: 'ml-grd-black', name: 'Mental Line Grande Black', code: 'ML-GB', color: '#1A1A1A', category: 'mental-line', dimensions: '3000 x 8mm', description: 'Perfil de acabamento preto, molde grande. Sofisticação discreta.', application: 'Acabamento', subType: 'grande' },

  // === CATEGORIA 7: WPC OUTDOORS (2 painéis + 2 cantoneiras) ===
  { id: 'wpc-out-cherry', name: 'WPC Outdoor Painel Cherry Wood', code: 'WPC-CW', color: '#A0522D', category: 'wpc-outdoor', dimensions: '219 x 2900 x 26mm', description: 'Painel externo tom cerejeira. Resistente a UV e umidade para fachadas e decks.', application: 'Fachada / Deck', finish: 'Deck Texturizado', subType: 'painel' },
  { id: 'wpc-out-teak', name: 'WPC Outdoor Painel Teak', code: 'WPC-TK', color: '#5C4033', category: 'wpc-outdoor', dimensions: '219 x 2900 x 26mm', description: 'Painel externo tom teca escuro. Durabilidade máxima para áreas externas.', application: 'Fachada / Deck', finish: 'Deck Texturizado', subType: 'painel' },
  { id: 'wpc-out-cant-cherry', name: 'WPC Outdoor Cantoneira Cherry Wood', code: 'WPC-CC', color: '#A0522D', category: 'wpc-outdoor', dimensions: '51 x 2900 x 51mm', description: 'Cantoneira/perfil externo robusto tom cerejeira. Acabamento para WPC Outdoor.', application: 'Fachada / Deck', subType: 'cantoneira' },
  { id: 'wpc-out-cant-teak', name: 'WPC Outdoor Cantoneira Teak', code: 'WPC-CT', color: '#5C4033', category: 'wpc-outdoor', dimensions: '51 x 2900 x 51mm', description: 'Cantoneira/perfil externo robusto tom teca escuro. Acabamento para WPC Outdoor.', application: 'Fachada / Deck', subType: 'cantoneira' },

  // === CATEGORIA 8: CLIPS DE FIXAÇÃO (2 tipos) ===
  { id: 'clip-pequeno', name: 'Clip Fixação Pequeno', code: 'CL-PQ', color: '#A0A0A0', category: 'clips', dimensions: '45 x 36mm', description: 'Clip metálico para fixação de painéis Fluted e Bamboo Carbon.', application: 'Fixação' },
  { id: 'clip-wpc', name: 'Clip Fixação WPC', code: 'CL-WPC', color: '#A0A0A0', category: 'clips', dimensions: 'Padrão WPC', description: 'Clip para fixação de painéis WPC Fluted.', application: 'Fixação' },
];

/** Products that can be used in the simulator (excludes accessories) */
export const simulatorProducts = products.filter(
  p => !['pvc-corner', 'mental-line', 'clips'].includes(p.category)
);
