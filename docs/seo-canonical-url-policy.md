# Politica SEO - URLs canonicas

## Decisao

As rotas publicas internas da Rock Code Labs devem usar URLs canonicas sem trailing slash.
A home e a unica excecao: `https://rockcodelabs.com.br/`.

Exemplos validos:

- `https://rockcodelabs.com.br/apps`
- `https://rockcodelabs.com.br/apps/qrcodeflow`
- `https://rockcodelabs.com.br/ferramentas`
- `https://rockcodelabs.com.br/ferramentas/calculadora-desconto`

Exemplos nao canonicos:

- `https://rockcodelabs.com.br/apps/`
- `https://rockcodelabs.com.br/apps/qrcodeflow/`
- `https://rockcodelabs.com.br/ferramentas/`
- `https://rockcodelabs.com.br/ferramentas/calculadora-desconto/`

## Motivacao

As rotas do Vue Router ja sao declaradas sem barra final. Manter sitemap, canonical,
`og:url`, prerender e navegacao interna no mesmo formato reduz duplicidade de URL,
evita sinais SEO conflitantes e simplifica validacoes futuras.

## Aplicacao no projeto

- `public/sitemap.xml` deve manter `/` apenas na home e remover trailing slash das rotas internas.
- `src/router/pageMetadata.js` deve gerar `canonical` e `og:url` sem trailing slash para rotas internas.
- `src/router/index.js` deve normalizar navegacao client-side com trailing slash para a rota sem barra final.
- A normalizacao client-side deve preservar `query string` e `hash`.
- Novas paginas publicas devem seguir o mesmo padrao ao entrar no sitemap e nos metadados.

## Validacao tecnica

Ao alterar rotas publicas, sitemap ou metadados SEO, validar pelo menos:

1. A URL canonica da rota interna nao termina com `/`.
2. `link[rel="canonical"]` usa a mesma URL listada no sitemap.
3. `meta[property="og:url"]` usa a mesma URL canonica.
4. A home continua como `https://rockcodelabs.com.br/`.
5. Uma URL interna acessada com trailing slash normaliza para a versao sem slash.
6. Query string e hash sao preservados durante a normalizacao.

## Operacao pos-deploy

Depois de deploys que mudem canonical ou sitemap:

1. Validar uma amostra de rotas com e sem trailing slash em producao.
2. Conferir se o servidor tambem responde com redirect HTTP 301 das rotas internas com trailing slash para a versao sem slash.
3. Reenviar ou solicitar reprocessamento do sitemap no Search Console quando a lista de URLs indexaveis mudar.
4. Acompanhar no Search Console se URLs antigas com trailing slash aparecem como duplicadas ou canonicas alternativas.
