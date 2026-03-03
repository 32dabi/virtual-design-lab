

## Plano: Correção Visual Estilo Rolex - Verde Dominante + Dourado Premium

O objetivo e transformar o site de "preto com detalhes verdes" para "verde rico dominante com dourado premium", inspirado na Rolex.

### Resumo das Mudancas

**1. `src/index.css` - Nova paleta verde dominante**

Substituir todas as variáveis CSS:
- `--background`: `150 30% 8%` → `153 55% 12%` (#0B3D2E - verde escuro profundo)
- `--card`: `152 35% 13%` → `155 55% 16%` (#0E4D38 - verde médio)
- `--secondary`: `152 30% 20%` → `158 65% 10%` (#064028 - verde profundo alternativo)
- `--muted`: `150 20% 16%` → `153 40% 18%`
- `--muted-foreground`: `140 10% 62%` → `140 20% 72%` (mais legível)
- `--border`: `152 20% 20%` → `152 30% 25%` (bordas mais visíveis)
- `--dark` / `--dark-card` / `--dark-surface`: ajustar para tons verdes
- `--green-accent`: → `152 40% 35%` (#2D6A4F)
- `--green-medium`: → `153 40% 45%` (#40916C)
- Adicionar `--green-luminous`: `152 45% 53%` (#52B788)
- `--text-tertiary`: → `140 25% 55%` (#8BAF8B)

Atualizar utilitários:
- `.glass`: rgba(11,61,46,0.95) com backdrop-blur
- `.glass-card`: rgba(14,77,56,0.6) com border gold/15
- `.glass-card:hover`: border gold/35
- `.gold-line`: manter gradiente verde → dourado → verde

**2. `index.html` - Cores hardcoded**
- Background: `#0B3D2E`
- Spinner: border `#2D6A4F`, top `#D4AF37`

**3. `src/components/HeroSection.tsx` - Gradiente verde rico**
- Background: `linear-gradient(135deg, #064028, #0B3D2E, #0E4D38, #0B3D2E, #064028)`
- Linhas decorativas: gold/8 (mais visíveis)
- Remover overlay escuro excessivo na imagem hero

**4. `src/components/Navbar.tsx` - Glass verde**
- Scrolled: rgba(11,61,46,0.95) com border-bottom gold/30
- Links: `#C8D8C8` normal → `#D4AF37` hover (já parcialmente feito)

**5. `src/components/AboutSection.tsx` + `ContactSection.tsx`**
- Icon backgrounds: rgba(45,106,79,0.3) em vez de rgba(27,67,50,0.3)
- Manter consistência com nova paleta

**6. `src/components/SimulatorSection.tsx`**
- Atualizar backgrounds dos botões de cômodo para usar a nova paleta verde

**7. `src/components/ProductCard.tsx`**
- Hover shadow: usar verde mais claro rgba(45,106,79,0.3)

Todas as seções herdam automaticamente as variáveis CSS, então a maioria das mudanças vem do `index.css`. Os componentes precisam apenas de ajustes em cores hardcoded (rgba values).

