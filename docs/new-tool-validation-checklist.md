# Checklist de validacao para nova ferramenta

Issue de origem: <https://github.com/dmarostega/rockcode-front-end-vuejs/issues/22>

Use este checklist ao revisar PRs que adicionam ferramentas ao hub `/ferramentas`.
Ele tambem esta disponivel como template copiavel em `.github/PULL_REQUEST_TEMPLATE/new-tool.md`.

## Produto

1. A ferramenta possui rota publica em `/ferramentas/...`.
2. O hub `/ferramentas` possui card com nome, descricao curta e link para a ferramenta.
3. A ferramenta funciona sem login, backend obrigatorio, API externa, upload ou historico.
4. A ferramenta nao persiste os dados digitados pelo usuario.
5. O fluxo principal possui feedback claro de sucesso ou erro.
6. Existe botao de copiar quando o resultado gerado fizer sentido para reuso.
7. Existe link de retorno para o hub de ferramentas.

## SEO e conteudo

1. A rota possui `title` especifico.
2. A rota possui `meta description` especifica.
3. A pagina possui um unico H1 visivel.
4. A pagina possui conteudo explicativo visivel sobre uso e contexto.
5. A pagina possui exemplo de uso.
6. A pagina possui FAQ curta e relevante.
7. A rota foi incluida no sitemap ou na fonte que gera o sitemap.

## UX e acessibilidade

1. Campos, botoes, estados desabilitados e mensagens sao legiveis no desktop.
2. Campos, botoes, estados desabilitados e mensagens sao legiveis no mobile.
3. Textos longos nao estouram o layout.
4. Resultados longos nao geram quebra visual inesperada.
5. O menu fixo mobile nao cobre a interacao principal.
6. Labels, botoes e mensagens possuem texto claro para leitores de tela.

## Privacidade e seguranca

1. A pagina exibe aviso de privacidade quando recebe entrada do usuario.
2. O aviso informa processamento local no navegador.
3. O aviso informa ausencia de envio para backend, API externa ou upload.
4. O aviso informa ausencia de historico e persistencia da entrada.
5. A ferramenta nao incentiva uso com dados sensiveis quando houver risco de privacidade.
6. Nenhum script real de anuncios foi ativado.

## QA tecnico

1. Foram cobertos casos com entrada simples.
2. Foram cobertos casos com entrada invalida, quando aplicavel.
3. Foram cobertos casos com entrada longa.
4. Lint foi executado ou a PR justifica por que nao se aplica.
5. Build foi executado ou a PR justifica por que nao se aplica.
6. Testes unitarios/E2E relevantes foram executados ou a PR justifica por que nao se aplica.

## Smoke visual

1. Desktop validado em largura aproximada de 1366 px ou maior.
2. Mobile validado em largura aproximada de 390 px.
3. Hero, card principal, conteudo explicativo, privacidade e FAQ aparecem sem sobreposicao.
4. Entradas, botoes, resultados e mensagens nao ficam escondidos pelo menu fixo.
5. Evidencias do smoke visual foram registradas no corpo da PR, comentario ou artefato do teste.
