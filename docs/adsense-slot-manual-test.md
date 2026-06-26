# Roteiro manual breve - AdSenseSlot

Issue de origem: <https://github.com/dmarostega/rockcode-front-end-vuejs/issues/24>

## Padrao desativado

1. Rodar a aplicacao sem `VITE_ADSENSE_ENABLED`.
2. Abrir uma pagina que venha a usar `AdSenseSlot`.
3. Confirmar que nenhum bloco visual de anuncio aparece.
4. Confirmar no DevTools que nenhum script de `pagead2.googlesyndication.com` foi carregado.

## Placeholder controlado

1. Rodar com `VITE_ADSENSE_PLACEHOLDER_ENABLED=true` e `VITE_ADSENSE_ENABLED=false`.
2. Abrir a pagina com o slot.
3. Confirmar que o placeholder aparece fora de cards de ferramenta.
4. Confirmar que nenhum script real de anuncio foi carregado.
