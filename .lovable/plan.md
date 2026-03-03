

## Plano: Gerar Imagens Unicas para Ambientes Comerciais

### Problema
Os 13 ambientes comerciais reutilizam as mesmas fotos dos residenciais. Precisamos gerar renders unicos para cada um.

### Abordagem

**1. Criar bucket de storage `room-renders`**
- Para armazenar as imagens geradas pela IA

**2. Criar edge function `generate-room-image`**
- Recebe: nome do ambiente, produto, cor/material
- Usa o modelo `google/gemini-2.5-flash-image` (image generation) para gerar um render fotorrealista do ambiente comercial com paineis ripados
- Prompt detalhado por tipo: escritorio executivo com mesa e cadeiras, recepcao corporativa com balcao, lobby de hotel com sofas, etc.
- Salva a imagem gerada no bucket `room-renders`
- Retorna a URL publica da imagem

**3. Criar pagina admin `/generate-images`**
- Lista todos os ambientes comerciais que precisam de imagem
- Botao "Gerar" por ambiente ou "Gerar Todos"
- Mostra preview da imagem gerada
- Status de progresso

**4. Atualizar `rooms.ts`**
- Ambientes comerciais apontam para URLs do storage em vez de `/images/...`
- Fallback: se a URL do storage falhar, usa a imagem residencial como placeholder

### Ambientes a gerar (13 imagens)

| Ambiente | Prompt base |
|---|---|
| Escritorio Executivo | Modern executive office with dark walnut slatted wall panels |
| Recepcao Corporativa | Corporate reception lobby with dark marble-pattern wall panels |
| Clinica/Consultorio | Clean medical clinic waiting room with light blue-green wall panels |
| Copa/Area de Cafe | Office break room / coffee area with natural oak slatted panels |
| Sala de Reunioes | Corporate meeting room with matte black slatted wall panels |
| Lounge/Descanso | Office lounge relaxation area with honey teak bamboo panels |
| Loja/Vitrine | Retail store interior with matte black slatted wall display |
| Restaurante | Upscale restaurant interior with cherry wood slatted panels |
| Hotel Lobby | Luxury hotel lobby with dark imbuia wood slatted panels |
| Hotel Quarto | Hotel bedroom with light oak slatted headboard wall |
| Barbearia/Salao | Modern barbershop with matte black slatted accent wall |
| Fachada Comercial (Cherry) | Commercial building facade with cherry wood WPC cladding |
| Fachada Comercial (Teak) | Commercial building facade with teak WPC exterior cladding |

### Detalhes tecnicos

- Modelo: `google/gemini-2.5-flash-image` via `ai.gateway.lovable.dev`
- Cada prompt inclui: tipo de ambiente + material/cor do painel + estilo "professional interior photography, 4K"
- Imagens salvas como PNG no bucket com nome do id do ambiente
- A pagina admin e temporaria, so para gerar as imagens

