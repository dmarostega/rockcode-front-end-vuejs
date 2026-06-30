# Client-side tracking minimo

## Objetivo

Registrar sinais basicos de navegacao e intencao no front-end sem depender de backend ativo e sem coletar conteudo digitado pelo usuario.

## Helper

Use `trackEvent(eventName, payload = {})` em `src/utils/tracking.js`.

O helper:

- gera um `session_id` anonimo e persistido em `localStorage`;
- inclui `page_path` automaticamente quando o payload nao informar um valor;
- inclui `timestamp` ISO;
- falha silenciosamente;
- registra no `console.debug` apenas em desenvolvimento;
- nao envia dados para backend nesta fase.

## Eventos instrumentados

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

## Privacidade

Nao registrar:

- conteudo de inputs;
- outputs gerados;
- JSON, Base64, URLs digitadas, hashes ou textos do usuario;
- e-mail, telefone, nome, documento ou qualquer dado pessoal.

Para novas ferramentas, envie apenas metadados seguros como `feature`, `source`, `destination` e nome publico do card.

## Teste manual rapido

1. Rodar o site em desenvolvimento.
2. Abrir o console do navegador.
3. Navegar entre `/`, `/ferramentas` e `/apps`.
4. Confirmar logs `[tracking]` para `page_viewed`.
5. Clicar nos CTAs principais e cards.
6. Confirmar que os eventos nao incluem textos digitados ou resultados gerados.
