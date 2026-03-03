

## Plano: Gerar as 22 imagens comerciais faltantes

### Problema
Os dados em `rooms.ts` já têm as 22 novas combinações registradas, mas as imagens apontam para `/images/xxx.png` — arquivos que não existem em `public/images/`. O GalleryTab esconde automaticamente imagens que falham ao carregar, por isso você não vê nada.

### Imagens faltantes (22)
escritorio-carvalho, escritorio-preto, recepcao-carvalho, recepcao-teca, clinica-carvalho, clinica-amendoa, copa-teca, copa-cerejeira, reunioes-nogueira, reunioes-nero, lounge-nogueira, lounge-carvalho, loja-nero, loja-cerejeira, restaurante-nogueira, restaurante-imbuia, hotel-lobby-nero, hotel-lobby-teca, hotel-quarto-nogueira, hotel-quarto-teca, barbearia-nogueira, barbearia-nero

### Solução

**1. Atualizar `rooms.ts`** — Trocar o `image` das 22 cenas novas para apontar ao storage bucket público (`room-renders`), onde o edge function faz upload. Formato:
```
https://nkjeiaisqvetmbbompmm.supabase.co/storage/v1/object/public/room-renders/{id}.png
```

**2. Gerar as 22 imagens** — Usar a edge function `generate-room-image` (que já tem os prompts para todas as 22) para gerar cada uma. Isso será feito sequencialmente via a página `/generate-images` que já existe, ou podemos disparar automaticamente.

**3. Atualizar `GalleryTab.tsx`** — Manter a lógica de `failedImages` para esconder qualquer imagem que ainda não foi gerada, mas agora com os URLs corretos do bucket, as imagens aparecerão assim que forem geradas.

### Arquivos a editar
- `src/data/rooms.ts` — URLs das 22 imagens novas apontando pro storage bucket
- Gerar as 22 imagens via edge function (sequencialmente, com delay de 3s entre cada)

