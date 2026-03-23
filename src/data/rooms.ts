// Room scenes data — will be rebuilt with new material

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

// Galeria será reconstruída — cenas serão adicionadas posteriormente
export const roomScenes: RoomScene[] = [];

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
