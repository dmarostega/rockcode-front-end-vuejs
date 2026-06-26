# Roteiro manual - smoke visual Base64 e JSON

Issue de origem: <https://github.com/dmarostega/rockcode-front-end-vuejs/issues/23>

## Objetivo

Validar que `/ferramentas/base64` e `/ferramentas/formatador-json` continuam legiveis em desktop e mobile com entradas simples, invalidas, minificadas e longas.

## Evidencias esperadas

O teste E2E `tests/e2e/base64-json-visual-smoke.spec.js` captura screenshots locais em:

- `test-results/base64-json-smoke/base64-desktop.png`
- `test-results/base64-json-smoke/base64-mobile.png`
- `test-results/base64-json-smoke/json-desktop.png`
- `test-results/base64-json-smoke/json-mobile.png`

## Base64

1. Abrir `/ferramentas/base64` em desktop.
2. Confirmar H1, card principal, campos de entrada/resultado, botoes, privacidade e FAQ sem sobreposicao.
3. Informar `Rock Code Labs` e confirmar resultado Base64 visivel.
4. Alternar para `Base64 para texto`, informar `%%%` e confirmar erro amigavel.
5. Informar texto longo com varias linhas e confirmar que entrada, resultado e botoes nao estouram o layout.
6. Repetir em mobile com largura aproximada de 390 px e confirmar que o menu fixo nao cobre a interacao principal.

## JSON

1. Abrir `/ferramentas/formatador-json` em desktop.
2. Confirmar H1, card principal, campos de entrada/resultado, botoes, privacidade e FAQ sem sobreposicao.
3. Informar JSON minificado valido e clicar em `Formatar JSON`.
4. Confirmar resultado formatado e botao `Copiar resultado` habilitado.
5. Informar JSON invalido e confirmar erro amigavel.
6. Informar JSON longo com arrays e objetos aninhados, clicar em `Minificar JSON` e confirmar que o resultado nao estoura o layout.
7. Repetir em mobile com largura aproximada de 390 px e confirmar que o menu fixo nao cobre a interacao principal.
