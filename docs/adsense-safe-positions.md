# Posicoes seguras para anuncios futuros

Issues de origem:

- <https://github.com/dmarostega/rockcode-front-end-vuejs/issues/25>
- <https://github.com/dmarostega/rockcode-front-end-vuejs/issues/26>

Este documento orienta uma futura implementacao manual de slots no hub `/ferramentas` e nas paginas de ferramenta. Nenhum anuncio real deve ser ativado neste ciclo.

## Estado padrao

- `VITE_ADSENSE_ENABLED=false`
- `VITE_ADSENSE_CLIENT_ID=` vazio
- `VITE_ADSENSE_PLACEHOLDER_ENABLED=false`

Com esse padrao, o componente de slot nao carrega script externo e nao renderiza anuncio real. A ativacao futura depende de aprovacao externa, decisao registrada e deploy/configuracao explicita.

## Hub `/ferramentas`

Posicoes permitidas:

- Apos a introducao do hub e antes da grade de ferramentas, com margem vertical clara.
- Depois da grade de ferramentas, antes de secoes secundarias.
- No fim da pagina, como bloco institucional separado dos links principais.

Posicoes proibidas:

- Dentro de qualquer card de ferramenta.
- Entre titulo, descricao e link de um card.
- Colado aos links principais de acesso as ferramentas.
- Em area que possa parecer item da grade de ferramentas.

## Paginas de ferramenta

Posicoes permitidas:

- Abaixo do bloco principal da ferramenta, depois do resultado e das acoes.
- Entre secoes informativas, quando houver separacao visual suficiente.
- Antes do FAQ ou depois do FAQ, sem competir com botoes de copiar.

Posicoes proibidas:

- Dentro do card operacional da ferramenta.
- Entre input e botao de acao.
- Entre botao de acao e resultado.
- Proximo de botao de copiar.
- Proximo do link de retorno ao hub.
- Acima do conteudo principal da ferramenta em mobile.

## Desktop e mobile

- Desktop: manter o slot centralizado e com largura controlada, sem ocupar colunas internas de cards.
- Mobile: renderizar como bloco unico entre secoes, nunca entre controles sequenciais.
- Em ambos: evitar qualquer posicao que incentive clique acidental ou confunda publicidade com resultado da ferramenta.

## Fluxo futuro de ativacao

1. Confirmar aprovacao externa e registrar a decisao.
2. Definir `VITE_ADSENSE_CLIENT_ID` no ambiente de deploy.
3. Habilitar `VITE_ADSENSE_ENABLED=true` somente no ambiente aprovado.
4. Validar visualmente desktop e mobile com slots manuais.
5. Manter Auto Ads e painel admin fora do escopo ate nova decisao.
