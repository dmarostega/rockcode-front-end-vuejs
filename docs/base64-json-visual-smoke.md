# Roteiro manual - smoke visual Base64 e JSON

Issue de origem: <https://github.com/dmarostega/rockcode-front-end-vuejs/issues/23>

## Objetivo

Validar que `/ferramentas/base64` e `/ferramentas/formatador-json` continuam legíveis em desktop e mobile com entradas simples, inválidas, minificadas e longas.

## Evidências esperadas

O teste E2E `tests/e2e/base64-json-visual-smoke.spec.js` captura screenshots locais em:

- `test-results/base64-json-smoke/base64-desktop.png`
- `test-results/base64-json-smoke/base64-mobile.png`
- `test-results/base64-json-smoke/json-desktop.png`
- `test-results/base64-json-smoke/json-mobile.png`

## Base64

1. Abrir `/ferramentas/base64` em desktop.
2. Confirmar H1, card principal, campos de entrada/resultado, botões, privacidade e FAQ sem sobreposição.
3. Informar `Rock Code Labs` e confirmar resultado Base64 visível.
4. Alternar para `Base64 para texto`, informar `%%%` e confirmar erro amigável.
5. Informar texto longo com várias linhas e confirmar que entrada, resultado e botões não estouram o layout.
6. Repetir em mobile com largura aproximada de 390 px e confirmar que o menu fixo não cobre a interação principal.

## JSON

1. Abrir `/ferramentas/formatador-json` em desktop.
2. Confirmar H1, card principal, campos de entrada/resultado, botões, privacidade e FAQ sem sobreposição.
3. Informar JSON minificado válido e clicar em `Formatar JSON`.
4. Confirmar resultado formatado e botão `Copiar resultado` habilitado.
5. Informar JSON inválido e confirmar erro amigável.
6. Informar JSON longo com arrays e objetos aninhados, clicar em `Minificar JSON` e confirmar que o resultado não estoura o layout.
7. Repetir em mobile com largura aproximada de 390 px e confirmar que o menu fixo não cobre a interação principal.
