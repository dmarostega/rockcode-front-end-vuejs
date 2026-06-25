# Roteiro manual - Gerador de Slug

Issue de origem: <https://github.com/dmarostega/rockcode-front-end-vuejs/issues/17>

## Casos funcionais

1. Abrir `/ferramentas/gerador-slug`.
2. Digitar `Olá, Mundo! Página Vue 2026` e confirmar o resultado `ola-mundo-pagina-vue-2026`.
3. Digitar `  API   REST: Guia rápido!!!  ` e confirmar o resultado `api-rest-guia-rapido`.
4. Clicar em `Copiar slug` com resultado disponível e confirmar o feedback de sucesso.
5. Clicar em `Limpar` e confirmar que o botão de copiar fica desabilitado.
6. Voltar para `/ferramentas` pelo link de retorno e confirmar o card `Gerador de Slug`.

## Smoke visual

1. Desktop: abrir `/ferramentas/gerador-slug` em largura aproximada de 1440 px e confirmar hero, card principal, conteúdo, privacidade e FAQ sem sobreposição.
2. Mobile: abrir a mesma rota em largura aproximada de 390 px e confirmar que botões, textos e cards quebram para uma coluna.
