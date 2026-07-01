# Analise de conectividade front-end e back-end

Data da validacao: 2026-07-01

## Contexto

Repositorios locais avaliados:

- `frontend-rockcode`: `dmarostega/rockcode-front-end-vuejs`
- `rockcode-api`: `dmarostega/rockcode-site-api`

Objetivo da validacao:

- confirmar se o front Vue consegue enviar eventos para o backend Laravel;
- confirmar se os eventos chegam ao MySQL;
- confirmar se o painel interno do backend exibe os agregados;
- esclarecer por que a rota `/admin` nao existe no front-end.

## Resultado

A conectividade front-end para back-end esta funcionando quando o backend e servido com:

```sh
php artisan serve
```

O WAMP deve ficar somente como MySQL nesse fluxo local. Quando o host Apache/WAMP foi usado para servir o Laravel, ele executou PHP `7.4.33`, mas as dependencias do projeto exigem PHP `>= 8.2`, causando erro fatal antes da aplicacao responder.

## Configuracao local validada

Front-end `.env`:

```env
VITE_ANALYTICS_ENABLED=true
VITE_ANALYTICS_ENDPOINT=http://127.0.0.1:8000/api/analytics/events
```

Backend `.env`:

```env
APP_URL=http://localhost
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
ADMIN_USERNAME=algum_usuario
ADMIN_PASSWORD=alguma_senha
```

Com essa configuracao:

- o front em `http://localhost:5173` envia eventos para `http://127.0.0.1:8000/api/analytics/events`;
- o CORS permite a origem local do Vite;
- o Laravel persiste os eventos na tabela `product_analytics_events`;
- o dashboard interno em `http://127.0.0.1:8000/admin` exibe os agregados.

## Evidencias observadas

- O DevTools mostrou chamadas para `/api/analytics/events`.
- A tabela `product_analytics_events` recebeu registros com:
  - `project = rockcode-site`;
  - `event_name = page_viewed`;
  - `page_path` como `/`, `/ferramentas`, `/apps` e `/admin`.
- O dashboard interno exibiu:
  - total de 6 eventos;
  - eventos por dia;
  - top paginas agregadas.

## Sobre o admin

O admin atualmente esta implementado no backend Laravel como uma pagina Blade:

```text
GET http://127.0.0.1:8000/admin
```

Esse acesso usa HTTP Basic Auth com as credenciais do `.env`:

```env
ADMIN_USERNAME=algum_usuario
ADMIN_PASSWORD=alguma_senha
```

Nao depende da tabela `users` e nao exige usuario cadastrado no banco.

Importante: `/admin` nao e uma rota do SPA Vue neste momento. Portanto, abrir `/admin` no front-end Vite tende a cair na rota de Not Found do Vue, mas ainda pode registrar um evento `page_viewed` com `page_path = /admin`.

## Pontos que estavam faltando ou confundindo o teste

1. O Apache/WAMP estava servindo Laravel com PHP `7.4.33`, incompatovel com as dependencias.
2. O backend precisava ser executado via `php artisan serve` usando PHP `8.2+`.
3. O CORS precisava incluir `http://localhost:5173` e `http://127.0.0.1:5173`.
4. O front precisava definir `VITE_ANALYTICS_ENABLED=true`.
5. O front precisava apontar `VITE_ANALYTICS_ENDPOINT` para o backend local em `127.0.0.1:8000`.
6. O admin usa Basic Auth por variaveis de ambiente, nao usuarios do banco.
7. O admin atual pertence ao backend, nao ao front-end Vue.

## Roteiro manual de teste

1. Subir o MySQL pelo WAMP.
2. No backend `rockcode-api`, subir o Laravel:

```sh
php artisan serve
```

3. No front `frontend-rockcode`, subir o Vite:

```sh
npm.cmd run dev
```

4. Abrir o front:

```text
http://localhost:5173
```

5. Navegar por:

- `/`
- `/ferramentas`
- `/apps`

6. Abrir o DevTools e confirmar chamadas:

```text
POST http://127.0.0.1:8000/api/analytics/events
```

7. Confirmar que as respostas sao `201` com:

```json
{"status":"accepted"}
```

8. Conferir no banco `cv_rockcode_manager`, tabela `product_analytics_events`, se os registros foram persistidos.
9. Acessar o admin do backend:

```text
http://127.0.0.1:8000/admin
```

10. Informar as credenciais do `.env`:

```text
Nome de usuario: algum_usuario
Senha: alguma_senha
```

11. Confirmar que o dashboard mostra os eventos agregados.

## Proximas decisoes de produto/arquitetura

- Se o painel interno Blade for suficiente, manter o admin no backend e documentar que ele nao pertence ao SPA Vue.
- Se o produto precisar de admin dentro do front-end, sera necessario criar outro escopo:
  - rotas Vue para admin;
  - endpoints JSON no backend para dashboard;
  - estrategia de autenticacao propria para o SPA;
  - regras de seguranca e autorizacao para expor dados administrativos via API.

