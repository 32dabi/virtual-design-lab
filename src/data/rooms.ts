const STORAGE_BASE = `https://nkjeiaisqvetmbbompmm.supabase.co/storage/v1/object/public/room-renders`;

export interface RoomScene {
  id: string;
  roomName: string;
  roomType: string;
  roomCategory: 'residencial' | 'comercial';
  productId: string;
  productName: string;
  productCode: string;
  image: string;
  fallbackImage?: string;
}

export const roomScenes: RoomScene[] = [
  // === RESIDENCIAL ===
  // SALA DE ESTAR
  { id: 'sala-nogueira', roomName: 'Sala de Estar', roomType: 'sala', roomCategory: 'residencial', productId: 'nogueira', productName: 'Nogueira', productCode: 'LTM 88676', image: '/images/sala-nogueira.png' },
  { id: 'sala-nero-marquina', roomName: 'Sala de Estar', roomType: 'sala', roomCategory: 'residencial', productId: 'nero-marquina', productName: 'Nero Marquina', productCode: 'X89-248', image: '/images/sala-nero-marquina.png' },
  { id: 'sala-tiffany', roomName: 'Sala de Estar', roomType: 'sala', roomCategory: 'residencial', productId: 'tiffany', productName: 'Tiffany', productCode: '512601', image: '/images/sala-tiffany.png' },
  { id: 'sala-preto-fosco', roomName: 'Sala de Estar', roomType: 'sala', roomCategory: 'residencial', productId: 'preto-fosco', productName: 'Preto Fosco', productCode: 'LT00987', image: '/images/sala-preto-fosco.png' },
  { id: 'sala-teca-mel', roomName: 'Sala de Estar', roomType: 'sala', roomCategory: 'residencial', productId: 'bamboo-teca-mel', productName: 'Bamboo Teca Mel', productCode: 'LTM88634', image: '/images/sala-teca-mel.png' },

  // QUARTO
  { id: 'quarto-carvalho-claro', roomName: 'Quarto', roomType: 'quarto', roomCategory: 'residencial', productId: 'carvalho-claro', productName: 'Carvalho Claro', productCode: 'KT 1071', image: '/images/quarto-carvalho-claro.png' },
  { id: 'quarto-nogueira-escuro', roomName: 'Quarto', roomType: 'quarto', roomCategory: 'residencial', productId: 'nogueira-escuro', productName: 'Nogueira Escuro', productCode: 'KT 1073', image: '/images/quarto-nogueira-escuro.png' },
  { id: 'quarto-cerejeira', roomName: 'Quarto', roomType: 'quarto', roomCategory: 'residencial', productId: 'cerejeira', productName: 'Cerejeira', productCode: 'LTJCW2016', image: '/images/quarto-cerejeira.png' },
  { id: 'quarto-teca-natural', roomName: 'Quarto', roomType: 'quarto', roomCategory: 'residencial', productId: 'teca-natural', productName: 'Teca Natural', productCode: 'KT 1073 var', image: '/images/quarto-teca-natural.png' },
  { id: 'quarto-bamboo-nogueira', roomName: 'Quarto', roomType: 'quarto', roomCategory: 'residencial', productId: 'bamboo-nogueira', productName: 'Bamboo Nogueira', productCode: 'LTM88631', image: '/images/quarto-bamboo-nogueira.png' },

  // SALA DE JANTAR
  { id: 'jantar-preto-liso', roomName: 'Sala de Jantar', roomType: 'sala-jantar', roomCategory: 'residencial', productId: 'preto-liso', productName: 'Preto Liso', productCode: 'LTM 8032', image: '/images/jantar-preto-liso.png' },
  { id: 'jantar-carvalho', roomName: 'Sala de Jantar', roomType: 'sala-jantar', roomCategory: 'residencial', productId: 'carvalho-natural', productName: 'Carvalho Natural', productCode: 'LTM 88696', image: '/images/jantar-carvalho.png' },
  { id: 'jantar-imbuia', roomName: 'Sala de Jantar', roomType: 'sala-jantar', roomCategory: 'residencial', productId: 'imbuia', productName: 'Imbuia', productCode: 'LTM88626', image: '/images/jantar-imbuia.png' },

  // ÁREA EXTERNA
  { id: 'externa-cherry', roomName: 'Área Externa', roomType: 'externo', roomCategory: 'residencial', productId: 'wpc-cherry-wood', productName: 'WPC Cherry Wood', productCode: 'WPC-CW', image: '/images/externa-cherry.png' },
  { id: 'externa-teak', roomName: 'Área Externa', roomType: 'externo', roomCategory: 'residencial', productId: 'wpc-teak', productName: 'WPC Teak', productCode: 'WPC-TK', image: '/images/externa-teak.png' },

  // FORRO
  { id: 'forro-pvc', roomName: 'Forro', roomType: 'forro', roomCategory: 'residencial', productId: 'forro-pvc-classic', productName: 'Forro PVC Classic', productCode: 'LTM 88676', image: '/images/forro-pvc.png' },

  // === COMERCIAL ===
  { id: 'escritorio-nogueira', roomName: 'Escritório Executivo', roomType: 'escritorio', roomCategory: 'comercial', productId: 'nogueira-escuro', productName: 'Nogueira Escuro', productCode: 'KT 1073', image: '/images/escritorio-nogueira.png' },
  { id: 'recepcao-nero', roomName: 'Recepção Corporativa', roomType: 'recepcao', roomCategory: 'comercial', productId: 'nero-marquina', productName: 'Nero Marquina', productCode: 'X89-248', image: '/images/recepcao-nero.png' },
  { id: 'clinica-tiffany', roomName: 'Clínica / Consultório', roomType: 'recepcao', roomCategory: 'comercial', productId: 'tiffany', productName: 'Tiffany', productCode: '512601', image: '/images/clinica-tiffany.png' },
  { id: 'copa-carvalho', roomName: 'Copa / Área de Café', roomType: 'copa', roomCategory: 'comercial', productId: 'carvalho-natural', productName: 'Carvalho Natural', productCode: 'LTM 88696', image: '/images/copa-carvalho.png' },
  { id: 'reunioes-preto', roomName: 'Sala de Reuniões', roomType: 'reunioes', roomCategory: 'comercial', productId: 'preto-liso', productName: 'Preto Liso', productCode: 'LTM 8032', image: '/images/reunioes-preto.png' },
  { id: 'lounge-teca', roomName: 'Lounge / Descanso', roomType: 'lounge', roomCategory: 'comercial', productId: 'bamboo-teca-mel', productName: 'Bamboo Teca Mel', productCode: 'LTM88634', image: '/images/lounge-teca.png' },
  { id: 'loja-preto-fosco', roomName: 'Loja / Vitrine', roomType: 'loja', roomCategory: 'comercial', productId: 'preto-fosco', productName: 'Preto Fosco', productCode: 'LT00987', image: '/images/loja-preto-fosco.png' },
  { id: 'restaurante-cerejeira', roomName: 'Restaurante', roomType: 'restaurante', roomCategory: 'comercial', productId: 'cerejeira', productName: 'Cerejeira', productCode: 'LTJCW2016', image: '/images/restaurante-cerejeira.png' },
  { id: 'hotel-lobby', roomName: 'Hotel Lobby', roomType: 'hotel', roomCategory: 'comercial', productId: 'imbuia', productName: 'Imbuia', productCode: 'LTM88626', image: '/images/hotel-lobby.png' },
  { id: 'hotel-quarto', roomName: 'Hotel Quarto', roomType: 'hotel', roomCategory: 'comercial', productId: 'carvalho-claro', productName: 'Carvalho Claro', productCode: 'KT 1071', image: '/images/hotel-quarto.png' },
  { id: 'barbearia-preto', roomName: 'Barbearia / Salão', roomType: 'barbearia', roomCategory: 'comercial', productId: 'preto-fosco', productName: 'Preto Fosco', productCode: 'LT00987', image: '/images/barbearia-preto.png' },
  { id: 'fachada-cherry', roomName: 'Fachada Comercial', roomType: 'fachada', roomCategory: 'comercial', productId: 'wpc-cherry-wood', productName: 'WPC Cherry Wood', productCode: 'WPC-CW', image: '/images/fachada-cherry.png' },
  { id: 'fachada-teak', roomName: 'Fachada Comercial', roomType: 'fachada', roomCategory: 'comercial', productId: 'wpc-teak', productName: 'WPC Teak', productCode: 'WPC-TK', image: '/images/fachada-teak.png' },
];

export const roomTypes = [
  { id: 'sala', label: 'Sala de Estar' },
  { id: 'quarto', label: 'Quarto' },
  { id: 'sala-jantar', label: 'Sala de Jantar' },
  { id: 'externo', label: 'Área Externa' },
  { id: 'forro', label: 'Forro' },
  { id: 'escritorio', label: 'Escritório' },
  { id: 'recepcao', label: 'Recepção' },
  { id: 'copa', label: 'Copa' },
  { id: 'reunioes', label: 'Reuniões' },
  { id: 'lounge', label: 'Lounge' },
  { id: 'loja', label: 'Loja' },
  { id: 'restaurante', label: 'Restaurante' },
  { id: 'hotel', label: 'Hotel' },
  { id: 'barbearia', label: 'Barbearia' },
  { id: 'fachada', label: 'Fachada' },
];
