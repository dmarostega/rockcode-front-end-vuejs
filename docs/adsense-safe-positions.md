# Posições seguras para anúncios futuros

Issues de origem:

- <https://github.com/dmarostega/rockcode-front-end-vuejs/issues/25>
- <https://github.com/dmarostega/rockcode-front-end-vuejs/issues/26>

Este documento orienta uma futura implementação manual de slots no hub `/ferramentas` e nas páginas de ferramenta. Nenhum anúncio real deve ser ativado neste ciclo.

## Estado padrão

- `VITE_ADSENSE_ENABLED=false`
- `VITE_ADSENSE_CLIENT_ID=` vazio
- `VITE_ADSENSE_PLACEHOLDER_ENABLED=false`

Com esse padrão, o componente de slot não carrega script externo e não renderiza anúncio real. A ativação futura depende de aprovação externa, decisão registrada e deploy/configuração explícita.

## Hub `/ferramentas`

Posições permitidas:

- Após a introdução do hub e antes da grade de ferramentas, com margem vertical clara.
- Depois da grade de ferramentas, antes de seções secundárias.
- No fim da página, como bloco institucional separado dos links principais.

Posições proibidas:

- Dentro de qualquer card de ferramenta.
- Entre título, descrição e link de um card.
- Colado aos links principais de acesso as ferramentas.
- Em area que possa parecer item da grade de ferramentas.

## Paginas de ferramenta

Posições permitidas:

- Abaixo do bloco principal da ferramenta, depois do resultado e das ações.
- Entre seções informativas, quando houver separação visual suficiente.
- Antes do FAQ ou depois do FAQ, sem competir com botões de copiar.

Posições proibidas:

- Dentro do card operacional da ferramenta.
- Entre input e botão de ação.
- Entre botão de ação e resultado.
- Próximo de botão de copiar.
- Próximo do link de retorno ao hub.
- Acima do conteudo principal da ferramenta em mobile.

## Desktop e mobile

- Desktop: manter o slot centralizado e com largura controlada, sem ocupar colunas internas de cards.
- Mobile: renderizar como bloco unico entre secoes, nunca entre controles sequenciais.
- Em ambos: evitar qualquer posição que incentive clique acidental ou confunda publicidade com resultado da ferramenta.

## Fluxo futuro de ativação

1. Confirmar aprovação externa e registrar a decisão.
2. Definir `VITE_ADSENSE_CLIENT_ID` no ambiente de deploy.
3. Habilitar `VITE_ADSENSE_ENABLED=true` somente no ambiente aprovado.
4. Validar visualmente desktop e mobile com slots manuais.
5. Manter Auto Ads e painel admin fora do escopo até nova decisão.
