# Client-side tracking minimo

## Objetivo

Registrar sinais basicos de navegacao e intencao no front-end sem depender de backend ativo e sem coletar conteudo digitado pelo usuario.

## Helper

Use `trackEvent(eventName, payload = {})` em `src/utils/tracking.js`.

O helper:

- gera um `session_id` anonimo e persistido em `localStorage`;
- inclui `page_path` automaticamente quando o payload nao informar um valor;
- sanitiza `page_path` para manter apenas o pathname, sem query string, hash ou origem;
- inclui `timestamp` ISO;
- falha silenciosamente;
- registra no `console.debug` apenas em desenvolvimento;
- envia eventos ao backend somente quando a integracao estiver explicitamente habilitada.

## Envio para endpoint

O envio real fica desligado por padrao. Para habilitar, configure as duas variaveis:

```env
VITE_ANALYTICS_ENABLED=true
VITE_ANALYTICS_ENDPOINT=https://api.exemplo.com/events
```

Comportamento esperado:

- sem `VITE_ANALYTICS_ENABLED=true`, nenhum evento e enviado;
- sem `VITE_ANALYTICS_ENDPOINT`, nenhum evento e enviado;
- em `localhost`, `127.0.0.1`, `0.0.0.0` ou build de desenvolvimento, nenhum evento real e enviado mesmo que a env seja ligada por engano;
- com as duas envs configuradas, apenas eventos permitidos sao enviados via `POST`;
- falhas de rede ou erro no endpoint nao quebram a navegacao;
- o request usa `credentials: 'omit'` e nao envia cookies automaticamente;
- `page_path` e `destination` sao sanitizados para remover query string e hash.

## GA4 e ambiente local

O GA4 tambem fica desligado por padrao. A tag so e carregada quando todas as condicoes forem verdadeiras:

- `VITE_GA_ENABLED=true`;
- build de producao (`import.meta.env.PROD`);
- hostname diferente de `localhost`, `127.0.0.1` e `0.0.0.0`.

Use `.env.local` para desenvolvimento com analytics real desligado:

```env
VITE_GA_ENABLED=false
VITE_ANALYTICS_ENABLED=false
VITE_ANALYTICS_ENDPOINT=
VITE_ANALYTICS_EXCLUDED_REFERRERS=195.35.18.65:8443
```

Para producao, habilite explicitamente as integracoes necessarias:

```env
VITE_GA_ENABLED=true
VITE_ANALYTICS_ENABLED=true
VITE_ANALYTICS_ENDPOINT=https://api.exemplo.com/events
VITE_ANALYTICS_EXCLUDED_REFERRERS=195.35.18.65:8443
```

`VITE_ANALYTICS_EXCLUDED_REFERRERS` aceita hosts separados por virgula. O host do CloudPanel (`195.35.18.65:8443`) tambem fica bloqueado por padrao para evitar que acessos operacionais aparecam como referral real.

O payload enviado ao backend e reduzido ao contrato de analytics:

- `project`
- `event_name`
- `page_path`
- `session_id`
- `occurred_at`
- `feature`, quando houver identificador seguro
- `source`, quando houver identificador seguro
- `destination`, quando houver identificador seguro

O evento local pode manter campos de apoio no `payload`, mas o backend nao recebe esse objeto cru. Em `project_card_clicked`, `project_name` e usado apenas para derivar um `feature` normalizado.

## Eventos instrumentados

## Mapa inicial do funil

- Home para ferramentas: `cta_clicked` com `destination: '/ferramentas'`, seguido de `page_viewed` em `/ferramentas`.
- Home para apps: `cta_clicked` com `destination: '/apps'`, seguido de `page_viewed` em `/apps`.
- Ferramentas para ferramenta especifica: `tool_card_clicked` com `feature` e `destination`, seguido de `page_viewed`.
- Apps para projeto: `project_card_clicked` com `project_name` e `destination`.
- Pagina de projeto para app externo: `cta_clicked` com `source: 'app_project_page'`.

### `page_viewed`

Disparado no `router.afterEach`.

Payload:

- `page_path`
- `route_name`

### `cta_clicked`

Disparado em CTAs principais da home, catalogo de apps e paginas de app.

Payload permitido:

- `cta_label`
- `destination`
- `source`
- `project_name`, quando o CTA pertence a uma pagina de projeto

### `tool_card_clicked`

Disparado nos cards do hub `/ferramentas`.

Payload permitido:

- `feature`
- `tool_name`
- `destination`
- `source`

### `project_card_clicked`

Disparado nos cards de projetos da home, `/apps` e projeto relacionado em `/ferramentas`.

Payload permitido:

- `project_name`
- `destination`
- `source`

## Eventos de uso das ferramentas

O Gerador de Slug e a ferramenta piloto para instrumentacao de uso real. As demais ferramentas devem repetir o mesmo padrao sem enviar input ou resultado.

Payload comum:

- `feature`: identificador estavel da ferramenta, por exemplo `slug_generator`

### `tool_opened`

Disparado ao montar a pagina da ferramenta.

### `tool_result_copied`

Disparado apenas quando o usuario copia o resultado com sucesso.

### `tool_example_used`

Disparado quando o usuario usa um exemplo predefinido.

### `tool_cleared`

Disparado quando o usuario limpa os campos da ferramenta.

## Eventos permitidos para envio

O helper aceita e envia somente estes eventos:

- `page_viewed`
- `cta_clicked`
- `tool_card_clicked`
- `project_card_clicked`
- `tool_opened`
- `tool_result_copied`
- `tool_example_used`
- `tool_cleared`

Eventos fora dessa lista sao ignorados.

## Privacidade

Nao registrar:

- conteudo de inputs;
- outputs gerados;
- JSON, Base64, URLs digitadas, hashes ou textos do usuario;
- e-mail, telefone, nome, documento ou qualquer dado pessoal.

Para novas ferramentas, envie apenas metadados seguros como `feature`, `source`, `destination` e nome publico do card.

Se algum evento precisar de parametros de URL no futuro, usar allowlist explicita e documentada em vez de enviar `search`, `hash` ou URLs completas.

Campos fora da allowlist do evento sao descartados antes de retornar ou enviar o payload. Isso evita envio acidental de `input`, `output`, JSON colado, Base64 informado, hashes, URL digitada pelo usuario ou texto livre.

## Teste manual rapido

1. Rodar o site em desenvolvimento.
2. Abrir o console do navegador.
3. Navegar entre `/`, `/ferramentas` e `/apps`.
4. Confirmar logs `[tracking]` para `page_viewed`.
5. Clicar nos CTAs principais e cards.
6. Confirmar que os eventos nao incluem textos digitados ou resultados gerados.
7. Em `http://localhost:5173`, confirmar no painel Network que nao ha request para `analytics.google.com/g/collect`.
8. Com `VITE_ANALYTICS_ENABLED=false` ou ausente, confirmar que nao ha `POST` para o endpoint proprio de analytics.
9. Em build de producao com `VITE_ANALYTICS_ENABLED=true` e `VITE_ANALYTICS_ENDPOINT` configurado, confirmar no painel Network que o `POST` contem apenas eventos e campos permitidos.
