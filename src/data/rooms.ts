// Room scenes data — 56 scenes across 19 room types

export interface RoomScene {
  id: string;
  roomName: string;
  roomType: string;
  roomCategory: 'residencial' | 'comercial';
  productId: string;
  productName: string;
  productCode: string;
  image: string;
}

export const roomScenes: RoomScene[] = [
  // ============ RESIDENCIAL ============

  // SALA DE ESTAR (6)
  { id: 'sala-carvalho', roomName: 'Sala de Estar', roomType: 'sala', roomCategory: 'residencial', productId: 'wpc-carvalho-natural', productName: 'Ripado Carvalho Natural', productCode: 'LTM 88696', image: '/images/ambientes/sala-carvalho.jpg' },
  { id: 'sala-nogueira', roomName: 'Sala de Estar', roomType: 'sala', roomCategory: 'residencial', productId: 'wpc-nogueira', productName: 'Ripado Nogueira', productCode: 'LTM 88676', image: '/images/ambientes/sala-nogueira.jpg' },
  { id: 'sala-tiffany', roomName: 'Sala de Estar', roomType: 'sala', roomCategory: 'residencial', productId: 'wpc-tiffany', productName: 'Ripado Tiffany', productCode: '512601', image: '/images/ambientes/sala-tiffany.jpg' },
  { id: 'sala-preto', roomName: 'Sala de Estar', roomType: 'sala', roomCategory: 'residencial', productId: 'wpc-preto-fosco', productName: 'Ripado Preto Fosco', productCode: 'LT00987', image: '/images/ambientes/sala-preto.jpg' },
  { id: 'sala-nero', roomName: 'Sala de Estar', roomType: 'sala', roomCategory: 'residencial', productId: 'fluted-nero-marquina', productName: 'Fluted Nero Marquina', productCode: 'X89-248', image: '/images/ambientes/sala-nero.jpg' },
  { id: 'sala-teca', roomName: 'Sala de Estar', roomType: 'sala', roomCategory: 'residencial', productId: 'bamboo-teca-mel', productName: 'Bamboo Teca Mel', productCode: 'LTM88634', image: '/images/ambientes/sala-teca.jpg' },

  // QUARTO (6)
  { id: 'quarto-nogueira-escuro', roomName: 'Quarto', roomType: 'quarto', roomCategory: 'residencial', productId: 'fluted-nogueira-escuro', productName: 'Fluted Nogueira Escuro', productCode: 'KT 1073', image: '/images/ambientes/quarto-nogueira-escuro.jpg' },
  { id: 'quarto-carvalho', roomName: 'Quarto', roomType: 'quarto', roomCategory: 'residencial', productId: 'fluted-carvalho-claro', productName: 'Fluted Carvalho Claro', productCode: 'KT 1071', image: '/images/ambientes/quarto-carvalho.jpg' },
  { id: 'quarto-cerejeira', roomName: 'Quarto', roomType: 'quarto', roomCategory: 'residencial', productId: 'fluted-cerejeira', productName: 'Fluted Cerejeira', productCode: 'LTJCW2016', image: '/images/ambientes/quarto-cerejeira.jpg' },
  { id: 'quarto-teca', roomName: 'Quarto', roomType: 'quarto', roomCategory: 'residencial', productId: 'fluted-teca-natural', productName: 'Fluted Teca Natural', productCode: 'KT 1073 var', image: '/images/ambientes/quarto-teca.jpg' },
  { id: 'quarto-bamboo-nogueira', roomName: 'Quarto', roomType: 'quarto', roomCategory: 'residencial', productId: 'bamboo-nogueira', productName: 'Bamboo Nogueira', productCode: 'LTM88631', image: '/images/ambientes/quarto-bamboo-nogueira.jpg' },
  { id: 'quarto-imbuia', roomName: 'Quarto', roomType: 'quarto', roomCategory: 'residencial', productId: 'wpc-imbuia', productName: 'Ripado Imbuia', productCode: 'LTM88626', image: '/images/ambientes/quarto-imbuia.jpg' },

  // SALA DE JANTAR (4)
  { id: 'jantar-preto-liso', roomName: 'Sala de Jantar', roomType: 'sala-jantar', roomCategory: 'residencial', productId: 'fluted-preto-liso', productName: 'Fluted Preto Liso', productCode: 'LTM 8032', image: '/images/ambientes/jantar-preto-liso.jpg' },
  { id: 'jantar-carvalho', roomName: 'Sala de Jantar', roomType: 'sala-jantar', roomCategory: 'residencial', productId: 'wpc-carvalho-natural', productName: 'Ripado Carvalho Natural', productCode: 'LTM 88696', image: '/images/ambientes/jantar-carvalho.jpg' },
  { id: 'jantar-imbuia', roomName: 'Sala de Jantar', roomType: 'sala-jantar', roomCategory: 'residencial', productId: 'wpc-imbuia', productName: 'Ripado Imbuia', productCode: 'LTM88626', image: '/images/ambientes/jantar-imbuia.jpg' },
  { id: 'jantar-nero', roomName: 'Sala de Jantar', roomType: 'sala-jantar', roomCategory: 'residencial', productId: 'fluted-nero-marquina', productName: 'Fluted Nero Marquina', productCode: 'X89-248', image: '/images/ambientes/jantar-nero.jpg' },

  // COZINHA (3)
  { id: 'cozinha-amendoa', roomName: 'Cozinha', roomType: 'cozinha', roomCategory: 'residencial', productId: 'wpc-amendoa', productName: 'Ripado Amêndoa', productCode: 'LTD 89015', image: '/images/ambientes/cozinha-amendoa.jpg' },
  { id: 'cozinha-bamboo-carvalho', roomName: 'Cozinha', roomType: 'cozinha', roomCategory: 'residencial', productId: 'bamboo-carvalho', productName: 'Bamboo Carvalho Natural', productCode: 'LTM88614', image: '/images/ambientes/cozinha-bamboo-carvalho.jpg' },
  { id: 'cozinha-forro', roomName: 'Cozinha', roomType: 'cozinha', roomCategory: 'residencial', productId: 'forro-pvc-nogueira', productName: 'Forro PVC Nogueira', productCode: 'LTM 88676', image: '/images/ambientes/cozinha-forro.jpg' },

  // BANHEIRO (3)
  { id: 'banheiro-nogueira', roomName: 'Banheiro', roomType: 'banheiro', roomCategory: 'residencial', productId: 'wpc-nogueira', productName: 'Ripado Nogueira', productCode: 'LTM 88676', image: '/images/ambientes/banheiro-nogueira.jpg' },
  { id: 'banheiro-bamboo-imbuia', roomName: 'Banheiro', roomType: 'banheiro', roomCategory: 'residencial', productId: 'bamboo-imbuia', productName: 'Bamboo Imbuia', productCode: 'LTM88653', image: '/images/ambientes/banheiro-bamboo-imbuia.jpg' },
  { id: 'banheiro-forro', roomName: 'Banheiro', roomType: 'banheiro', roomCategory: 'residencial', productId: 'forro-pvc-nogueira', productName: 'Forro PVC Nogueira', productCode: 'LTM 88676', image: '/images/ambientes/banheiro-forro.jpg' },

  // SALA DE TV / HOME THEATER (3)
  { id: 'tv-preto', roomName: 'Sala de TV', roomType: 'sala-tv', roomCategory: 'residencial', productId: 'wpc-preto-fosco', productName: 'Ripado Preto Fosco', productCode: 'LT00987', image: '/images/ambientes/tv-preto.jpg' },
  { id: 'tv-nogueira', roomName: 'Sala de TV', roomType: 'sala-tv', roomCategory: 'residencial', productId: 'fluted-nogueira-escuro', productName: 'Fluted Nogueira Escuro', productCode: 'KT 1073', image: '/images/ambientes/tv-nogueira.jpg' },
  { id: 'tv-nero', roomName: 'Sala de TV', roomType: 'sala-tv', roomCategory: 'residencial', productId: 'fluted-nero-marquina', productName: 'Fluted Nero Marquina', productCode: 'X89-248', image: '/images/ambientes/tv-nero.jpg' },

  // VARANDA / ÁREA EXTERNA (3)
  { id: 'varanda-cherry', roomName: 'Varanda / Área Externa', roomType: 'varanda', roomCategory: 'residencial', productId: 'wpc-out-cherry', productName: 'WPC Outdoor Cherry Wood', productCode: 'WPC-CW', image: '/images/ambientes/varanda-cherry.jpg' },
  { id: 'varanda-teak', roomName: 'Varanda / Área Externa', roomType: 'varanda', roomCategory: 'residencial', productId: 'wpc-out-teak', productName: 'WPC Outdoor Teak', productCode: 'WPC-TK', image: '/images/ambientes/varanda-teak.jpg' },
  { id: 'varanda-tiffany', roomName: 'Varanda / Área Externa', roomType: 'varanda', roomCategory: 'residencial', productId: 'wpc-tiffany', productName: 'Ripado Tiffany', productCode: '512601', image: '/images/ambientes/varanda-tiffany.jpg' },

  // ÁREA GOURMET (2)
  { id: 'gourmet-carvalho', roomName: 'Área Gourmet', roomType: 'gourmet', roomCategory: 'residencial', productId: 'wpc-carvalho-natural', productName: 'Ripado Carvalho Natural', productCode: 'LTM 88696', image: '/images/ambientes/gourmet-carvalho.jpg' },
  { id: 'gourmet-teca', roomName: 'Área Gourmet', roomType: 'gourmet', roomCategory: 'residencial', productId: 'bamboo-teca-mel', productName: 'Bamboo Teca Mel', productCode: 'LTM88634', image: '/images/ambientes/gourmet-teca.jpg' },

  // ============ COMERCIAL ============

  // ESCRITÓRIO EXECUTIVO (2)
  { id: 'escritorio-nogueira', roomName: 'Escritório Executivo', roomType: 'escritorio', roomCategory: 'comercial', productId: 'fluted-nogueira-escuro', productName: 'Fluted Nogueira Escuro', productCode: 'KT 1073', image: '/images/ambientes/escritorio-nogueira.jpg' },
  { id: 'escritorio-imbuia', roomName: 'Escritório Executivo', roomType: 'escritorio', roomCategory: 'comercial', productId: 'wpc-imbuia', productName: 'Ripado Imbuia', productCode: 'LTM88626', image: '/images/ambientes/escritorio-imbuia.jpg' },

  // RECEPÇÃO CORPORATIVA (2)
  { id: 'recepcao-nero', roomName: 'Recepção Corporativa', roomType: 'recepcao', roomCategory: 'comercial', productId: 'fluted-nero-marquina', productName: 'Fluted Nero Marquina', productCode: 'X89-248', image: '/images/ambientes/recepcao-nero.jpg' },
  { id: 'recepcao-preto', roomName: 'Recepção Corporativa', roomType: 'recepcao', roomCategory: 'comercial', productId: 'wpc-preto-fosco', productName: 'Ripado Preto Fosco', productCode: 'LT00987', image: '/images/ambientes/recepcao-preto.jpg' },

  // RECEPÇÃO CLÍNICA / CONSULTÓRIO (2)
  { id: 'clinica-tiffany', roomName: 'Clínica / Consultório', roomType: 'clinica', roomCategory: 'comercial', productId: 'wpc-tiffany', productName: 'Ripado Tiffany', productCode: '512601', image: '/images/ambientes/clinica-tiffany.jpg' },
  { id: 'clinica-amendoa', roomName: 'Clínica / Consultório', roomType: 'clinica', roomCategory: 'comercial', productId: 'wpc-amendoa', productName: 'Ripado Amêndoa', productCode: 'LTD 89015', image: '/images/ambientes/clinica-amendoa.jpg' },

  // SALA DE REUNIÕES (2)
  { id: 'reunioes-preto-liso', roomName: 'Sala de Reuniões', roomType: 'reunioes', roomCategory: 'comercial', productId: 'fluted-preto-liso', productName: 'Fluted Preto Liso', productCode: 'LTM 8032', image: '/images/ambientes/reunioes-preto-liso.jpg' },
  { id: 'reunioes-nogueira', roomName: 'Sala de Reuniões', roomType: 'reunioes', roomCategory: 'comercial', productId: 'wpc-nogueira', productName: 'Ripado Nogueira', productCode: 'LTM 88676', image: '/images/ambientes/reunioes-nogueira.jpg' },

  // COPA / ÁREA DE CAFÉ (2)
  { id: 'copa-carvalho', roomName: 'Copa / Área de Café', roomType: 'copa', roomCategory: 'comercial', productId: 'wpc-carvalho-natural', productName: 'Ripado Carvalho Natural', productCode: 'LTM 88696', image: '/images/ambientes/copa-carvalho.jpg' },
  { id: 'copa-bamboo', roomName: 'Copa / Área de Café', roomType: 'copa', roomCategory: 'comercial', productId: 'bamboo-carvalho', productName: 'Bamboo Carvalho Natural', productCode: 'LTM88614', image: '/images/ambientes/copa-bamboo.jpg' },

  // LOUNGE / DESCANSO (2)
  { id: 'lounge-teca', roomName: 'Lounge / Descanso', roomType: 'lounge', roomCategory: 'comercial', productId: 'bamboo-teca-mel', productName: 'Bamboo Teca Mel', productCode: 'LTM88634', image: '/images/ambientes/lounge-teca.jpg' },
  { id: 'lounge-fluted-teca', roomName: 'Lounge / Descanso', roomType: 'lounge', roomCategory: 'comercial', productId: 'fluted-teca-natural', productName: 'Fluted Teca Natural', productCode: 'KT 1073 var', image: '/images/ambientes/lounge-fluted-teca.jpg' },

  // LOJA / VITRINE (2)
  { id: 'loja-preto', roomName: 'Loja / Vitrine', roomType: 'loja', roomCategory: 'comercial', productId: 'wpc-preto-fosco', productName: 'Ripado Preto Fosco', productCode: 'LT00987', image: '/images/ambientes/loja-preto.jpg' },
  { id: 'loja-nero', roomName: 'Loja / Vitrine', roomType: 'loja', roomCategory: 'comercial', productId: 'fluted-nero-marquina', productName: 'Fluted Nero Marquina', productCode: 'X89-248', image: '/images/ambientes/loja-nero.jpg' },

  // RESTAURANTE (2)
  { id: 'restaurante-cerejeira', roomName: 'Restaurante', roomType: 'restaurante', roomCategory: 'comercial', productId: 'fluted-cerejeira', productName: 'Fluted Cerejeira', productCode: 'LTJCW2016', image: '/images/ambientes/restaurante-cerejeira.jpg' },
  { id: 'restaurante-imbuia', roomName: 'Restaurante', roomType: 'restaurante', roomCategory: 'comercial', productId: 'wpc-imbuia', productName: 'Ripado Imbuia', productCode: 'LTM88626', image: '/images/ambientes/restaurante-imbuia.jpg' },

  // HOTEL LOBBY (2)
  { id: 'hotel-lobby-nero', roomName: 'Hotel Lobby', roomType: 'hotel', roomCategory: 'comercial', productId: 'fluted-nero-marquina', productName: 'Fluted Nero Marquina', productCode: 'X89-248', image: '/images/ambientes/hotel-lobby-nero.jpg' },
  { id: 'hotel-lobby-bamboo', roomName: 'Hotel Lobby', roomType: 'hotel', roomCategory: 'comercial', productId: 'bamboo-nogueira', productName: 'Bamboo Nogueira', productCode: 'LTM88631', image: '/images/ambientes/hotel-lobby-bamboo.jpg' },

  // HOTEL QUARTO (2)
  { id: 'hotel-quarto-carvalho', roomName: 'Hotel Quarto', roomType: 'hotel', roomCategory: 'comercial', productId: 'fluted-carvalho-claro', productName: 'Fluted Carvalho Claro', productCode: 'KT 1071', image: '/images/ambientes/hotel-quarto-carvalho.jpg' },
  { id: 'hotel-quarto-nogueira', roomName: 'Hotel Quarto', roomType: 'hotel', roomCategory: 'comercial', productId: 'wpc-nogueira', productName: 'Ripado Nogueira', productCode: 'LTM 88676', image: '/images/ambientes/hotel-quarto-nogueira.jpg' },

  // BARBEARIA / SALÃO (2)
  { id: 'barbearia-preto', roomName: 'Barbearia / Salão', roomType: 'barbearia', roomCategory: 'comercial', productId: 'wpc-preto-fosco', productName: 'Ripado Preto Fosco', productCode: 'LT00987', image: '/images/ambientes/barbearia-preto.jpg' },
  { id: 'barbearia-fluted-preto', roomName: 'Barbearia / Salão', roomType: 'barbearia', roomCategory: 'comercial', productId: 'fluted-preto-liso', productName: 'Fluted Preto Liso', productCode: 'LTM 8032', image: '/images/ambientes/barbearia-fluted-preto.jpg' },

  // FACHADA COMERCIAL (2)
  { id: 'fachada-cherry', roomName: 'Fachada Comercial', roomType: 'fachada', roomCategory: 'comercial', productId: 'wpc-out-cherry', productName: 'WPC Outdoor Cherry Wood', productCode: 'WPC-CW', image: '/images/ambientes/fachada-cherry.jpg' },
  { id: 'fachada-teak', roomName: 'Fachada Comercial', roomType: 'fachada', roomCategory: 'comercial', productId: 'wpc-out-teak', productName: 'WPC Outdoor Teak', productCode: 'WPC-TK', image: '/images/ambientes/fachada-teak.jpg' },

  // ACADEMIA / STUDIO (2)
  { id: 'academia-preto', roomName: 'Academia / Studio', roomType: 'academia', roomCategory: 'comercial', productId: 'wpc-preto-fosco', productName: 'Ripado Preto Fosco', productCode: 'LT00987', image: '/images/ambientes/academia-preto.jpg' },
  { id: 'academia-nogueira', roomName: 'Academia / Studio', roomType: 'academia', roomCategory: 'comercial', productId: 'fluted-nogueira-escuro', productName: 'Fluted Nogueira Escuro', productCode: 'KT 1073', image: '/images/ambientes/academia-nogueira.jpg' },
];

export const roomTypes = [
  // Residencial
  { id: 'sala', label: 'Sala de Estar' },
  { id: 'quarto', label: 'Quarto' },
  { id: 'sala-jantar', label: 'Sala de Jantar' },
  { id: 'cozinha', label: 'Cozinha' },
  { id: 'banheiro', label: 'Banheiro' },
  { id: 'sala-tv', label: 'Sala de TV' },
  { id: 'varanda', label: 'Varanda / Área Externa' },
  { id: 'gourmet', label: 'Área Gourmet' },
  // Comercial
  { id: 'escritorio', label: 'Escritório' },
  { id: 'recepcao', label: 'Recepção' },
  { id: 'clinica', label: 'Clínica' },
  { id: 'reunioes', label: 'Reuniões' },
  { id: 'copa', label: 'Copa' },
  { id: 'lounge', label: 'Lounge' },
  { id: 'loja', label: 'Loja' },
  { id: 'restaurante', label: 'Restaurante' },
  { id: 'hotel', label: 'Hotel' },
  { id: 'barbearia', label: 'Barbearia' },
  { id: 'fachada', label: 'Fachada' },
  { id: 'academia', label: 'Academia' },
];
