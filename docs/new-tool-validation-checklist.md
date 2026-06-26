# Checklist de validação para nova ferramenta

Issue de origem: <https://github.com/dmarostega/rockcode-front-end-vuejs/issues/22>

Use este checklist ao revisar PRs que adicionam ferramentas ao hub `/ferramentas`.
Ele também está disponível como template copiável em `.github/PULL_REQUEST_TEMPLATE/new-tool.md`.

## Produto

1. A ferramenta possui rota pública em `/ferramentas/...`.
2. O hub `/ferramentas` possui card com nome, descrição curta e link para a ferramenta.
3. A ferramenta funciona sem login, backend obrigatório, API externa, upload ou histórico.
4. A ferramenta não persiste os dados digitados pelo usuário.
5. O fluxo principal possui feedback claro de sucesso ou erro.
6. Existe botao de copiar quando o resultado gerado fizer sentido para reuso.
7. Existe link de retorno para o hub de ferramentas.

## SEO e conteúdo

1. A rota possui `title` específico.
2. A rota possui `meta description` específica.
3. A página possui um único H1 visível.
4. A página possui conteúdo explicativo visível sobre uso e contexto.
5. A página possui exemplo de uso.
6. A pagina possui FAQ curta e relevante.
7. A rota foi incluída no sitemap ou na fonte que gera o sitemap.

## UX e acessibilidade

1. Campos, botões, estados desabilitados e mensagens são legíveis no desktop.
2. Campos, botões, estados desabilitados e mensagens são legíveis no mobile.
3. Textos longos não estouram o layout.
4. Resultados longos não geram quebra visual inesperada.
5. O menu fixo mobile não cobre a interação principal.
6. Labels, botões e mensagens possuem texto claro para leitores de tela.

## Privacidade e segurança

1. A página exibe aviso de privacidade quando recebe entrada do usuário.
2. O aviso informa processamento local no navegador.
3. O aviso informa ausência de envio para backend, API externa ou upload.
4. O aviso informa ausência de histórico e persistência da entrada.
5. A ferramenta não incentiva uso com dados sensíveis quando houver risco de privacidade.
6. Nenhum script real de anúncios foi ativado.

## QA técnico

1. Foram cobertos casos com entrada simples.
2. Foram cobertos casos com entrada inválida, quando aplicável.
3. Foram cobertos casos com entrada longa.
4. Lint foi executado ou a PR justifica por que não se aplica.
5. Build foi executado ou a PR justifica por que não se aplica.
6. Testes unitários/E2E relevantes foram executados ou a PR justifica por que não se aplica.

## Smoke visual

1. Desktop validado em largura aproximada de 1366 px ou maior.
2. Mobile validado em largura aproximada de 390 px.
3. Hero, card principal, conteúdo explicativo, privacidade e FAQ aparecem sem sobreposição.
4. Entradas, botões, resultados e mensagens não ficam escondidos pelo menu fixo.
5. Evidências do smoke visual foram registradas no corpo da PR, comentário ou artefato do teste.
