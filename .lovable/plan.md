

## Plano: Clarear o verde e reduzir o preto dominante

O problema é que o fundo `#0A0A0A` (preto quase puro, 4% luminosidade) domina tudo e o verde escuro (`8%` luminosidade nos cards) é praticamente invisível. Vou clarear significativamente os verdes e usar um fundo verde escuro em vez de preto puro.

### Mudanças

**1. `src/index.css` — Clarear toda a paleta**
- `--background`: de `0 0% 4%` (preto) para `150 30% 8%` (verde muito escuro, visível)
- `--card`: de `152 38% 8%` para `152 35% 13%` (verde mais claro)
- `--secondary`: de `152 30% 15%` para `152 30% 20%`
- `--muted`: de `150 18% 12%` para `150 20% 16%`
- `--border`: de `152 20% 14%` para `152 20% 20%`
- `--input`: igual ao border
- `--dark`: de `0 0% 4%` para `150 30% 8%`
- `--dark-card`: de `152 38% 8%` para `152 35% 13%`
- `--dark-surface`: de `152 30% 15%` para `152 30% 20%`
- `--green-accent`: de `152 38% 24%` para `152 38% 30%`
- `--green-medium`: de `153 38% 31%` para `153 38% 38%`
- `.glass`: rgba de `(10,10,10,0.95)` para `(13,31,21,0.95)` (verde escuro)
- `.glass-card`: rgba de `(13,31,21,0.6)` para `(20,45,32,0.7)` (verde mais visível)

**2. `index.html` — Atualizar cores hardcoded**
- Background de `#0A0A0A` para `#0F261A` (verde escuro)
- Spinner border de `#1B4332` para `#2D6B4F`

**3. `src/components/HeroSection.tsx` — Gradiente mais verde**
- `from-background via-[#1B4332]` para `from-background via-[#2D6B4F]` (verde mais claro e visível)
- Reduzir overlay escuro no hero image

