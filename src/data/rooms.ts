export interface RoomScene {
  id: string;
  roomName: string;
  roomType: string;
  productId: string;
  productName: string;
  image: string;
}

export const roomScenes: RoomScene[] = [
  { id: 'sala-jantar-preto', roomName: 'Sala de Jantar', roomType: 'sala-jantar', productId: 'preto', productName: 'Preto', image: '/images/sala-jantar-preto.png' },
  { id: 'quarto-imbuia', roomName: 'Quarto', roomType: 'quarto', productId: 'imbuia', productName: 'Imbuia', image: '/images/quarto-imbuia.png' },
  { id: 'sala-bamboo', roomName: 'Sala de Estar', roomType: 'sala', productId: 'bamboo-marmore', productName: 'Bamboo Mármore', image: '/images/sala-bamboo-carbon.png' },
  { id: 'quarto-carvalho', roomName: 'Quarto', roomType: 'quarto', productId: 'carvalho', productName: 'Carvalho', image: '/images/quarto-carvalho.png' },
  { id: 'sala-verde', roomName: 'Sala de Estar', roomType: 'sala', productId: 'verde-menta', productName: 'Verde Menta', image: '/images/sala-verde-menta.png' },
  { id: 'quarto-nogueira', roomName: 'Quarto', roomType: 'quarto', productId: 'nogueira', productName: 'Nogueira', image: '/images/quarto-nogueira.png' },
  { id: 'sala-jantar-duo', roomName: 'Sala de Jantar', roomType: 'sala-jantar', productId: 'cedro', productName: 'Cedro + Preto', image: '/images/sala-jantar-duo.png' },
  { id: 'sala-azul', roomName: 'Sala de Estar', roomType: 'sala', productId: 'azul-profundo', productName: 'Azul Profundo', image: '/images/sala-azul-profundo.png' },
  { id: 'externa-wpc', roomName: 'Área Externa', roomType: 'externo', productId: 'wpc-teca', productName: 'WPC Teca', image: '/images/externa-wpc.png' },
  { id: 'sala-carvalho', roomName: 'Sala de Estar', roomType: 'sala', productId: 'carvalho', productName: 'Carvalho', image: '/images/sala-carvalho.png' },
  { id: 'sala-preto', roomName: 'Sala de Estar', roomType: 'sala', productId: 'preto', productName: 'Preto', image: '/images/sala-preto.png' },
  { id: 'quarto-azul-profundo', roomName: 'Quarto', roomType: 'quarto', productId: 'azul-profundo', productName: 'Azul Profundo', image: '/images/quarto-azul-profundo.png' },
  { id: 'quarto-preto', roomName: 'Quarto', roomType: 'quarto', productId: 'preto', productName: 'Preto', image: '/images/quarto-preto.png' },
  { id: 'sala-jantar-nogueira', roomName: 'Sala de Jantar', roomType: 'sala-jantar', productId: 'nogueira', productName: 'Nogueira', image: '/images/sala-jantar-nogueira.png' },
  { id: 'sala-jantar-carvalho', roomName: 'Sala de Jantar', roomType: 'sala-jantar', productId: 'carvalho', productName: 'Carvalho', image: '/images/sala-jantar-carvalho.png' },
  { id: 'externa-wpc-ipe', roomName: 'Área Externa', roomType: 'externo', productId: 'wpc-ipe', productName: 'WPC Ipê', image: '/images/externa-wpc-ipe.png' },
];

export const roomTypes = [
  { id: 'sala', label: 'Sala de Estar' },
  { id: 'quarto', label: 'Quarto' },
  { id: 'sala-jantar', label: 'Sala de Jantar' },
  { id: 'externo', label: 'Área Externa' },
];
