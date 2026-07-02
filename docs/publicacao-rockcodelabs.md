# Roteiro de publicação — rockcodelabs.com.br

## Objetivo

Documentar o fluxo atual de build e publicação do frontend institucional da Rock Code Labs em produção.

Este projeto usa Vue/Vite no repositório `rockcode-front-end-vuejs`, mas a publicação atual é feita copiando o conteúdo gerado em `dist/` para o `public/` do backend Laravel hospedado em `rockcodelabs.com.br`.

---

## Estrutura atual na VPS

```text
htdocs/
  frontend-rockcode/
    # projeto frontend Vue/Vite

  rockcodelabs.com.br/
    # backend Laravel usado como aplicação publicada
    public/
      # recebe os arquivos gerados pelo build do frontend
```

---

## Regra importante sobre variáveis `VITE_*`

As variáveis `VITE_*` são lidas no momento do build do frontend.

Depois que o `dist/` é gerado, os valores já ficam embutidos nos arquivos JavaScript finais. Alterar `.env` no servidor Laravel depois da cópia não muda o comportamento do frontend.

Regra prática:

```text
Antes de rodar npm run build, conferir .env.local e .env.production no projeto frontend.
```

---

## Arquivos de ambiente do frontend

### Desenvolvimento local

Arquivo:

```text
.env.local
```

Uso esperado: rodar o projeto com `npm run dev` sem enviar GA4, AdSense ou analytics real.

Exemplo recomendado:

```env
VITE_ADSENSE_ENABLED=false
VITE_ADSENSE_CLIENT_ID=
VITE_ADSENSE_PLACEHOLDER_ENABLED=false

VITE_GA_ENABLED=false
VITE_GA_MEASUREMENT_ID=

VITE_ANALYTICS_ENABLED=false
VITE_ANALYTICS_ENDPOINT=
VITE_ANALYTICS_EXCLUDED_REFERRERS=195.35.18.65:8443
```

Resultado esperado em local:

```text
localhost não carrega GA4
localhost não envia analytics próprio
localhost não carrega AdSense real
```

---

### Build de produção gerado localmente

Arquivo:

```text
.env.production
```

Uso esperado: gerar o build que será copiado para `rockcodelabs.com.br/public`.

Exemplo recomendado:

```env
VITE_ADSENSE_ENABLED=true
VITE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
VITE_ADSENSE_PLACEHOLDER_ENABLED=false

VITE_GA_ENABLED=true
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

VITE_ANALYTICS_ENABLED=true
VITE_ANALYTICS_ENDPOINT=/api/analytics/events
VITE_ANALYTICS_EXCLUDED_REFERRERS=195.35.18.65:8443
```

Observações:

- `VITE_ANALYTICS_ENDPOINT=/api/analytics/events` é recomendado porque o frontend e a API estão no mesmo domínio.
- Se o endpoint mudar para subdomínio, ajustar antes do build.
- Nunca gerar build de produção com `.env.local` de desenvolvimento.

---

## Arquivo `.env` do backend Laravel

Arquivo na VPS:

```text
htdocs/rockcodelabs.com.br/.env
```

Variáveis relacionadas:

```env
CORS_ALLOWED_ORIGINS=https://rockcodelabs.com.br,https://www.rockcodelabs.com.br

ADMIN_USERNAME=<usuario-admin-real>
ADMIN_PASSWORD=<senha-forte-real>
```

Observações:

- Como o frontend publicado chama `/api/analytics/events` no mesmo domínio, o CORS tende a ter pouco impacto nesse fluxo.
- CORS continua importante se houver frontend em outro domínio/subdomínio.
- `ADMIN_USERNAME` e `ADMIN_PASSWORD` são do backend Laravel, não do Vue/Vite.
- Se o Laravel estiver com `config:cache`, alterações no `.env` exigem limpar/regerar cache conforme o fluxo de deploy.

---

## Checklist antes do build

1. Confirmar branch correta no frontend.
2. Confirmar que alterações necessárias foram mergeadas.
3. Conferir `.env.local` para desenvolvimento.
4. Conferir `.env.production` para produção.
5. Confirmar que `VITE_GA_ENABLED=true` somente no build de produção.
6. Confirmar que `VITE_ADSENSE_ENABLED=true` somente quando a monetização real estiver liberada.
7. Confirmar que `VITE_ANALYTICS_ENABLED=true` somente se o backend estiver preparado.
8. Confirmar endpoint:

```env
VITE_ANALYTICS_ENDPOINT=/api/analytics/events
```

9. Rodar testes/lint quando aplicável.

---

## Comandos no frontend

No projeto frontend:

```bash
cd htdocs/frontend-rockcode
npm install
npm run lint
npm run test:unit
npm run build
```

Se o projeto já estiver com dependências instaladas, `npm install` pode ser substituído por `npm ci` quando houver lockfile consistente e intenção de instalação limpa.

---

## Cópia do build para o Laravel

Após o build, copiar o conteúdo de:

```text
htdocs/frontend-rockcode/dist/
```

para:

```text
htdocs/rockcodelabs.com.br/public/
```

A cópia deve preservar:

```text
index.html
assets/
favicon/arquivos estáticos
sitemap.xml, se estiver sendo servido pelo public do frontend
robots.txt, se estiver sendo servido pelo public do frontend
ads.txt, se estiver sendo servido pelo public do frontend/backend
```

Atenção: evitar apagar arquivos necessários do Laravel caso existam no `public/` e não sejam gerados pelo frontend.

---

## Checklist pós-publicação

### Navegação pública

Abrir em navegador anônimo:

```text
https://rockcodelabs.com.br/
https://rockcodelabs.com.br/apps
https://rockcodelabs.com.br/ferramentas
https://rockcodelabs.com.br/ferramentas/url-encode-decode
```

Confirmar:

- páginas carregam sem erro;
- assets carregam com status `200`;
- não há erro de rota no reload direto;
- canonical mantém o padrão atual;
- rotas internas não usam barra final, exceto a home.

---

### GA4

Em produção, se `VITE_GA_ENABLED=true`:

- confirmar request para `googletagmanager.com/gtag/js`;
- confirmar envio para `analytics.google.com/g/collect`;
- confirmar que localhost não está sendo contabilizado;
- validar no GA4 Realtime/DebugView se necessário.

---

### Analytics próprio

Se `VITE_ANALYTICS_ENABLED=true`:

- navegar entre páginas;
- abrir DevTools > Network;
- confirmar `POST /api/analytics/events`;
- confirmar resposta esperada do backend;
- confirmar que o payload não envia input, output, texto livre, URL digitada, JSON, Base64, hash ou dados pessoais.

---

### AdSense

Se `VITE_ADSENSE_ENABLED=true`:

- confirmar que scripts/slots carregam somente em produção;
- confirmar que não há placeholder ativo em produção;
- confirmar que o layout não induz clique acidental;
- confirmar que `ads.txt` está acessível quando aplicável:

```text
https://rockcodelabs.com.br/ads.txt
```

---

### Search Console / SEO técnico

Verificar:

```text
https://rockcodelabs.com.br/sitemap.xml
https://rockcodelabs.com.br/robots.txt
```

Confirmar:

- sitemap acessível;
- URLs internas sem barra final, exceto home;
- canonical coerente com sitemap;
- páginas principais indexáveis;
- sem `noindex` acidental nas páginas públicas.

---

## Smoke manual rápido

```text
1. Abrir home.
2. Abrir /apps.
3. Abrir /ferramentas.
4. Abrir uma ferramenta.
5. Recarregar a página diretamente pela URL.
6. Testar navegação por cards/CTAs.
7. Conferir console do navegador.
8. Conferir Network para GA4/analytics próprio/ads.
9. Conferir sitemap e robots.
10. Conferir GA4 Realtime somente após excluir tráfego local.
```

---

## Problemas comuns

### GA4 não aparece em produção

Verificar se o build foi gerado com:

```env
VITE_GA_ENABLED=true
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Se a env foi alterada depois do build, gerar novo build.

---

### Analytics próprio não envia eventos

Verificar:

```env
VITE_ANALYTICS_ENABLED=true
VITE_ANALYTICS_ENDPOINT=/api/analytics/events
```

Também confirmar que o backend possui a rota ativa e que não há erro `404`, `422`, `429` ou `500`.

---

### Localhost aparece no GA4

Verificar se o GA4 está bloqueado em `.env.local`:

```env
VITE_GA_ENABLED=false
```

Também confirmar que o GA4 não está mais carregado estaticamente no `index.html`.

---

### Mudança de env não refletiu no site

Provável causa:

```text
A variável VITE_* foi alterada depois do npm run build.
```

Solução:

```bash
npm run build
```

Depois copiar novamente o conteúdo de `dist/` para o `public/` do Laravel.

---

## Observação final

Enquanto o deploy for manual, o ponto mais crítico é garantir que o build de produção seja gerado com `.env.production` correto antes de copiar o `dist/` para o backend Laravel.

```text
.env.production correto -> npm run build -> copiar dist -> validar produção
```
