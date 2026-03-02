import salaJantarPreto from '@/assets/sala-jantar-preto.png';
import quartoImbuia from '@/assets/quarto-imbuia.png';
import salaBamboo from '@/assets/sala-bamboo-carbon.png';
import quartoCarvalho from '@/assets/quarto-carvalho.png';
import salaVerde from '@/assets/sala-verde-menta.png';
import quartoNogueira from '@/assets/quarto-nogueira.png';
import salaJantarDuo from '@/assets/sala-jantar-duo.png';
import salaAzul from '@/assets/sala-azul-profundo.png';
import externaWpc from '@/assets/externa-wpc.png';

export interface RoomScene {
  id: string;
  roomName: string;
  roomType: string;
  productId: string;
  productName: string;
  image: string;
}

export const roomScenes: RoomScene[] = [
  { id: 'sala-jantar-preto', roomName: 'Sala de Jantar', roomType: 'sala-jantar', productId: 'preto', productName: 'Preto', image: salaJantarPreto },
  { id: 'quarto-imbuia', roomName: 'Quarto', roomType: 'quarto', productId: 'imbuia', productName: 'Imbuia', image: quartoImbuia },
  { id: 'sala-bamboo', roomName: 'Sala de Estar', roomType: 'sala', productId: 'bamboo-marmore', productName: 'Bamboo Mármore', image: salaBamboo },
  { id: 'quarto-carvalho', roomName: 'Quarto', roomType: 'quarto', productId: 'carvalho', productName: 'Carvalho', image: quartoCarvalho },
  { id: 'sala-verde', roomName: 'Sala de Estar', roomType: 'sala', productId: 'verde-menta', productName: 'Verde Menta', image: salaVerde },
  { id: 'quarto-nogueira', roomName: 'Quarto', roomType: 'quarto', productId: 'nogueira', productName: 'Nogueira', image: quartoNogueira },
  { id: 'sala-jantar-duo', roomName: 'Sala de Jantar', roomType: 'sala-jantar', productId: 'cedro', productName: 'Cedro + Preto', image: salaJantarDuo },
  { id: 'sala-azul', roomName: 'Sala de Estar', roomType: 'sala', productId: 'azul-profundo', productName: 'Azul Profundo', image: salaAzul },
  { id: 'externa-wpc', roomName: 'Área Externa', roomType: 'externo', productId: 'wpc-teca', productName: 'WPC Teca', image: externaWpc },
];

export const roomTypes = [
  { id: 'sala', label: 'Sala de Estar' },
  { id: 'quarto', label: 'Quarto' },
  { id: 'sala-jantar', label: 'Sala de Jantar' },
  { id: 'externo', label: 'Área Externa' },
];
