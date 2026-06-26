## Checklist para nova ferramenta do hub

Issue de origem:

Rota da ferramenta:

## Produto

- [ ] A ferramenta possui rota pública em `/ferramentas/...`.
- [ ] O hub `/ferramentas` possui card com nome, descrição curta e link para a ferramenta.
- [ ] A ferramenta funciona sem login, backend obrigatório, API externa, upload ou histórico.
- [ ] A ferramenta não persiste os dados digitados pelo usuário.
- [ ] O fluxo principal possui feedback claro de sucesso ou erro.
- [ ] Existe botão de copiar quando o resultado gerado fizer sentido para reuso.
- [ ] Existe link de retorno para o hub de ferramentas.

## SEO e conteúdo

- [ ] A rota possui `title` específico.
- [ ] A rota possui `meta description` específica.
- [ ] A página possui um único H1 visível.
- [ ] A página possui conteúdo explicativo visível sobre uso e contexto.
- [ ] A página possui exemplo de uso.
- [ ] A página possui FAQ curta e relevante.
- [ ] A rota foi incluída no sitemap ou na fonte que gera o sitemap.

## UX e acessibilidade

- [ ] Campos, botões, estados desabilitados e mensagens são legíveis no desktop.
- [ ] Campos, botões, estados desabilitados e mensagens são legíveis no mobile.
- [ ] Textos longos não estouram o layout.
- [ ] Resultados longos não geram quebra visual inesperada.
- [ ] O menu fixo mobile não cobre a interação principal.
- [ ] Labels, botões e mensagens possuem texto claro para leitores de tela.

## Privacidade e segurança

- [ ] A página exibe aviso de privacidade quando recebe entrada do usuário.
- [ ] O aviso informa processamento local no navegador.
- [ ] O aviso informa ausência de envio para backend, API externa ou upload.
- [ ] O aviso informa ausência de histórico e persistência da entrada.
- [ ] A ferramenta não incentiva uso com dados sensíveis quando houver risco de privacidade.
- [ ] Nenhum script real de anúncios foi ativado.

## QA técnico

- [ ] Foram cobertos casos com entrada simples.
- [ ] Foram cobertos casos com entrada inválida, quando aplicável.
- [ ] Foram cobertos casos com entrada longa.
- [ ] Lint foi executado ou a PR justifica por que não se aplica.
- [ ] Build foi executado ou a PR justifica por que não se aplica.
- [ ] Testes unitários/E2E relevantes foram executados ou a PR justifica por que não se aplica.

## Smoke visual

- [ ] Desktop validado em largura aproximada de 1366 px ou maior.
- [ ] Mobile validado em largura aproximada de 390 px.
- [ ] Hero, card principal, conteúdo explicativo, privacidade e FAQ aparecem sem sobreposição.
- [ ] Entradas, botões, resultados e mensagens não ficam escondidos pelo menu fixo.
- [ ] Evidências do smoke visual foram registradas no corpo da PR, comentário ou artefato do teste.
