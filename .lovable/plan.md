

# Gerar Renders de Ambientes Faltantes via IA

## Cobertura Atual (9 cenas)

| Comodo | Produtos com render |
|--------|-------------------|
| Sala de Estar | Bamboo Marmore, Verde Menta, Azul Profundo |
| Quarto | Imbuia, Carvalho, Nogueira |
| Sala de Jantar | Preto, Cedro |
| Area Externa | WPC Teca |

## Renders a Gerar

Vou gerar imagens usando o modelo de IA (Gemini) para preencher as combinacoes mais relevantes. Prioridade nos produtos principais que ainda nao tem cena:

**Sala de Estar** (faltam: Carvalho, Preto, Branco, Nogueira)
- Sala + Carvalho
- Sala + Preto

**Quarto** (faltam: Preto, Bamboo, Azul Profundo)
- Quarto + Azul Profundo
- Quarto + Preto

**Sala de Jantar** (faltam: Carvalho, Nogueira, Bamboo)
- Sala Jantar + Nogueira
- Sala Jantar + Carvalho

**Area Externa** (faltam: WPC Ipe)
- Externa + WPC Ipe

**Total: ~7 novos renders**

## Implementacao

1. Gerar cada imagem via API de IA com prompts descrevendo o ambiente com paineis ripados na cor/textura especifica, estilo fotorrealista
2. Salvar em `public/images/` com nomes semanticos
3. Adicionar as novas cenas no array `roomScenes` em `rooms.ts`
4. O simulador e portfolio automaticamente mostram as novas opcoes

## Limitacao

As imagens geradas por IA podem nao ter a mesma qualidade/consistencia dos renders originais que voce enviou. Se preferir, posso gerar e voce avalia antes de publicar.

