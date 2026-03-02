

# ELEVARE - Plano de Implementacao Completo

## Imagens Recebidas (10 renders)

Vou usar todas as imagens enviadas no site, mapeadas assim:

| Imagem | Uso | Comodo/Produto |
|--------|-----|----------------|
| Painel preto ripado - sala jantar | Portfolio + Simulador | Sala de Jantar / Preto |
| Painel madeira escura - quarto | Portfolio + Simulador | Quarto / Imbuia |
| Painel marmore dourado - sala | Portfolio + Simulador (hero tambem) | Sala / Bamboo Carbon |
| Catalogo cores lado a lado | Secao Catalogo (banner) | Todos os produtos |
| Painel madeira clara - quarto | Portfolio + Simulador | Quarto / Carvalho |
| Painel verde menta - sala | Portfolio + Simulador | Sala / Verde Menta |
| Painel nogueira - quarto | Portfolio + Simulador | Quarto / Nogueira |
| Painel madeira+preto - sala jantar | Portfolio + Simulador | Sala Jantar / Duo Tone |
| Painel azul marinho - sala | Portfolio + Simulador | Sala / Azul Profundo |
| Deck WPC - area externa | Portfolio + Simulador | Area Externa / WPC |

## Estrutura de Arquivos

```text
src/
  assets/              (10 imagens copiadas aqui)
  data/
    products.ts        (catalogo completo: 19+ produtos com cores, dimensoes, categorias)
    rooms.ts           (comodos do simulador com imagens mapeadas)
  components/
    Navbar.tsx
    HeroSection.tsx
    CatalogSection.tsx
    ProductCard.tsx
    ProductModal.tsx
    SimulatorSection.tsx
    PortfolioSection.tsx
    AboutSection.tsx
    ContactSection.tsx
    WhatsAppButton.tsx
  pages/
    Index.tsx           (single-page com todas as secoes)
```

## Implementacao por Secao

### 1. Data Layer (`products.ts`, `rooms.ts`)
- Array com todos os 19 produtos do prompt original (Carvalho, Ambar, Canela, Preto, etc.)
- Cada produto: id, nome, codigo, cor hex, categoria, dimensoes, imagem do ambiente associado
- Array de comodos para simulador: sala, quarto, sala de jantar, area externa

### 2. Navbar
- Fixa, transparente no topo, glass blur ao scrollar (scroll event listener)
- Logo "ELEVARE" dourado, links ancora suaves

### 3. Hero
- Fullscreen com a imagem do marmore dourado (sala) como background
- Overlay escuro + titulo "ELEVARE" com glow dourado
- Botoes CTA: "Ver Catalogo" e "Solicitar Orcamento"

### 4. Catalogo
- Filtros por categoria (tabs): Todos | Ripados Madeira | Ripados Colors | Bamboo Carbon | WPC
- Grid responsivo de ProductCards com circulo de cor, nome, codigo
- Click abre ProductModal com detalhes + botao "Simular no Ambiente" (scroll para simulador) + WhatsApp

### 5. Simulador Interativo (feature principal)
- Layout: imagem do comodo grande a esquerda, painel de selecao a direita
- Selecao de comodo (Sala, Quarto, Sala Jantar, Externo) via tabs
- Selecao de produto/cor via grid de circulos coloridos
- Ao trocar a cor: a imagem do comodo muda para o render correspondente (crossfade CSS transition)
- Como temos renders prontos por cor+comodo, o "simulador" troca entre as imagens reais com transicao suave, dando efeito de troca interativa
- Botao "Solicitar Orcamento via WhatsApp" com a selecao atual

### 6. Portfolio
- Grid masonry-style com todas as 10 imagens de ambientes
- Hover overlay com nome do produto e comodo
- Filtro por tipo de ambiente

### 7. Sobre / Diferenciais
- 4 cards com icones Lucide: resistencia, instalacao, sustentabilidade, garantia

### 8. Contato + Footer
- Dados de Teresina-PI, WhatsApp placeholder, Instagram
- WhatsApp flutuante fixo no canto inferior direito

## Design
- Background: #1A1008, accent: #C5A55A (dourado)
- Font Inter, glassmorphism em cards
- Animacoes de scroll via CSS (intersection observer)
- Responsivo mobile-first

## Tecnico
- Simulador funciona com mapeamento produto+comodo -> imagem, sem canvas/WebGL
- Transicoes CSS (opacity crossfade) para troca fluida de imagens
- Scroll suave entre secoes via anchor links
- Sem dependencias extras necessarias

