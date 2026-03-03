

## Plano: Upload de até 3 fotos no Simulador IA

### Análise técnica
3 fotos não superaquecem nada. Cada chamada à edge function `analyze-room` processa uma imagem por vez (~5-15s). Com 3 fotos, o tempo total seria ~15-45s processando sequencialmente, o que é perfeitamente aceitável.

### Mudanças no `AISimulatorTab.tsx`

**1. Estado para múltiplas imagens**
- Trocar `imagePreview` / `imageBase64` de `string | null` para arrays (`string[]`)
- Adicionar estado `activeImageIndex` para controlar qual foto está sendo visualizada
- Limitar `input` a `multiple` com validação de máximo 3 arquivos

**2. Upload múltiplo**
- Input aceita `multiple`, valida que não passem de 3 arquivos
- Cada arquivo é lido como base64 e adicionado ao array
- Mostrar thumbnails das fotos enviadas com opção de remover individualmente
- Permitir adicionar mais fotos depois (até completar 3)

**3. Análise sequencial**
- Processar as fotos uma por uma (não em paralelo, para não sobrecarregar)
- Barra de progresso: "Analisando foto 1 de 3..."
- Cada análise retorna um `AnalysisResult` separado
- Após todas processadas, combinar as sugestões de produtos (união dos resultados)

**4. Navegação entre fotos**
- Na visualização (steps 2-5), mostrar indicadores de qual foto está ativa
- Setas ou dots para navegar entre as fotos enviadas
- A análise exibida muda conforme a foto selecionada

**5. Fluxo ajustado**
- Step 3 (Produto): mostra produtos sugeridos combinados de todas as análises
- Step 5 (Simulação): permite alternar entre as fotos para ver cada comparação
- WhatsApp: mensagem inclui info de todos os ambientes analisados

### Resumo visual do upload

```text
┌─────────────────────────────┐
│  [Foto 1] [Foto 2] [+ Add] │  ← thumbnails (máx 3)
│                             │
│     ┌───────────────┐       │
│     │  Foto ativa   │       │
│     │  (preview)    │       │
│     └───────────────┘       │
│                             │
│  "Analisando foto 2 de 3"  │
└─────────────────────────────┘
```

### Arquivos a editar
- `src/components/AISimulatorTab.tsx` — toda a lógica de múltiplas fotos

