## Checklist para nova ferramenta do hub

Issue de origem:

Rota da ferramenta:

## Produto

- [ ] A ferramenta possui rota publica em `/ferramentas/...`.
- [ ] O hub `/ferramentas` possui card com nome, descricao curta e link para a ferramenta.
- [ ] A ferramenta funciona sem login, backend obrigatorio, API externa, upload ou historico.
- [ ] A ferramenta nao persiste os dados digitados pelo usuario.
- [ ] O fluxo principal possui feedback claro de sucesso ou erro.
- [ ] Existe botao de copiar quando o resultado gerado fizer sentido para reuso.
- [ ] Existe link de retorno para o hub de ferramentas.

## SEO e conteudo

- [ ] A rota possui `title` especifico.
- [ ] A rota possui `meta description` especifica.
- [ ] A pagina possui um unico H1 visivel.
- [ ] A pagina possui conteudo explicativo visivel sobre uso e contexto.
- [ ] A pagina possui exemplo de uso.
- [ ] A pagina possui FAQ curta e relevante.
- [ ] A rota foi incluida no sitemap ou na fonte que gera o sitemap.

## UX e acessibilidade

- [ ] Campos, botoes, estados desabilitados e mensagens sao legiveis no desktop.
- [ ] Campos, botoes, estados desabilitados e mensagens sao legiveis no mobile.
- [ ] Textos longos nao estouram o layout.
- [ ] Resultados longos nao geram quebra visual inesperada.
- [ ] O menu fixo mobile nao cobre a interacao principal.
- [ ] Labels, botoes e mensagens possuem texto claro para leitores de tela.

## Privacidade e seguranca

- [ ] A pagina exibe aviso de privacidade quando recebe entrada do usuario.
- [ ] O aviso informa processamento local no navegador.
- [ ] O aviso informa ausencia de envio para backend, API externa ou upload.
- [ ] O aviso informa ausencia de historico e persistencia da entrada.
- [ ] A ferramenta nao incentiva uso com dados sensiveis quando houver risco de privacidade.
- [ ] Nenhum script real de anuncios foi ativado.

## QA tecnico

- [ ] Foram cobertos casos com entrada simples.
- [ ] Foram cobertos casos com entrada invalida, quando aplicavel.
- [ ] Foram cobertos casos com entrada longa.
- [ ] Lint foi executado ou a PR justifica por que nao se aplica.
- [ ] Build foi executado ou a PR justifica por que nao se aplica.
- [ ] Testes unitarios/E2E relevantes foram executados ou a PR justifica por que nao se aplica.

## Smoke visual

- [ ] Desktop validado em largura aproximada de 1366 px ou maior.
- [ ] Mobile validado em largura aproximada de 390 px.
- [ ] Hero, card principal, conteudo explicativo, privacidade e FAQ aparecem sem sobreposicao.
- [ ] Entradas, botoes, resultados e mensagens nao ficam escondidos pelo menu fixo.
- [ ] Evidencias do smoke visual foram registradas no corpo da PR, comentario ou artefato do teste.
