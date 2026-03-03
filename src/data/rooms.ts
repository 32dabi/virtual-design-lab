export interface RoomScene {
  id: string;
  roomName: string;
  roomType: string;
  productId: string;
  productName: string;
  image: string;
}

export const roomScenes: RoomScene[] = [
  // SALA DE ESTAR
  { id: 'sala-nogueira', roomName: 'Sala de Estar', roomType: 'sala', productId: 'nogueira', productName: 'Nogueira', image: '/images/sala-nogueira.png' },
  { id: 'sala-nero-marquina', roomName: 'Sala de Estar', roomType: 'sala', productId: 'nero-marquina', productName: 'Nero Marquina', image: '/images/sala-nero-marquina.png' },
  { id: 'sala-tiffany', roomName: 'Sala de Estar', roomType: 'sala', productId: 'tiffany', productName: 'Tiffany', image: '/images/sala-tiffany.png' },
  { id: 'sala-preto-fosco', roomName: 'Sala de Estar', roomType: 'sala', productId: 'preto-fosco', productName: 'Preto Fosco', image: '/images/sala-preto-fosco.png' },
  { id: 'sala-teca-mel', roomName: 'Sala de Estar', roomType: 'sala', productId: 'bamboo-teca-mel', productName: 'Bamboo Teca Mel', image: '/images/sala-teca-mel.png' },

  // QUARTO
  { id: 'quarto-carvalho-claro', roomName: 'Quarto', roomType: 'quarto', productId: 'carvalho-claro', productName: 'Carvalho Claro', image: '/images/quarto-carvalho-claro.png' },
  { id: 'quarto-nogueira-escuro', roomName: 'Quarto', roomType: 'quarto', productId: 'nogueira-escuro', productName: 'Nogueira Escuro', image: '/images/quarto-nogueira-escuro.png' },
  { id: 'quarto-cerejeira', roomName: 'Quarto', roomType: 'quarto', productId: 'cerejeira', productName: 'Cerejeira', image: '/images/quarto-cerejeira.png' },
  { id: 'quarto-teca-natural', roomName: 'Quarto', roomType: 'quarto', productId: 'teca-natural', productName: 'Teca Natural', image: '/images/quarto-teca-natural.png' },
  { id: 'quarto-bamboo-nogueira', roomName: 'Quarto', roomType: 'quarto', productId: 'bamboo-nogueira', productName: 'Bamboo Nogueira', image: '/images/quarto-bamboo-nogueira.png' },

  // SALA DE JANTAR
  { id: 'jantar-preto-liso', roomName: 'Sala de Jantar', roomType: 'sala-jantar', productId: 'preto-liso', productName: 'Preto Liso', image: '/images/jantar-preto-liso.png' },
  { id: 'jantar-carvalho', roomName: 'Sala de Jantar', roomType: 'sala-jantar', productId: 'carvalho-natural', productName: 'Carvalho Natural', image: '/images/jantar-carvalho.png' },
  { id: 'jantar-imbuia', roomName: 'Sala de Jantar', roomType: 'sala-jantar', productId: 'imbuia', productName: 'Imbuia', image: '/images/jantar-imbuia.png' },

  // ÁREA EXTERNA
  { id: 'externa-cherry', roomName: 'Área Externa', roomType: 'externo', productId: 'wpc-cherry-wood', productName: 'WPC Cherry Wood', image: '/images/externa-cherry.png' },
  { id: 'externa-teak', roomName: 'Área Externa', roomType: 'externo', productId: 'wpc-teak', productName: 'WPC Teak', image: '/images/externa-teak.png' },

  // FORRO
  { id: 'forro-pvc', roomName: 'Forro', roomType: 'forro', productId: 'forro-pvc-classic', productName: 'Forro PVC Classic', image: '/images/forro-pvc.png' },
];

export const roomTypes = [
  { id: 'sala', label: 'Sala de Estar' },
  { id: 'quarto', label: 'Quarto' },
  { id: 'sala-jantar', label: 'Sala de Jantar' },
  { id: 'externo', label: 'Área Externa' },
  { id: 'forro', label: 'Forro' },
];
