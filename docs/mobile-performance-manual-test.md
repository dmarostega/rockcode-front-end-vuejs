# Mobile performance manual test

## Objetivo

Validar que a home e as paginas publicas principais continuam responsivas apos as otimizacoes de fonte, bootstrap e imagens da hero.

## Roteiro

1. Rodar `npm.cmd run build` e `npm.cmd run preview`.
2. Abrir `http://127.0.0.1:4173/` em viewport mobile, por exemplo `390x844`.
3. Confirmar que logo, nome, titulo, descricao e botoes da home aparecem sem atraso visual perceptivel.
4. Abrir `/ferramentas` e confirmar que o hub carrega com cards legiveis e sem quebra de layout.
5. Abrir `/apps` e confirmar que os cards de projetos seguem alinhados em desktop e mobile.
6. Conferir no DevTools Network que a home carrega `stone-home` e `solo-name-home`, nao os PNGs maiores originais.

## Resultado esperado

- A home preserva o visual atual com imagens menores acima da dobra.
- Nao ha chamada bloqueante para Google Fonts.
- `/ferramentas` e `/apps` mantem o comportamento visual anterior.
