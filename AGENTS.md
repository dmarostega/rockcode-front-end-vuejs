# AGENTS.md

Sempre trabalhe com mudancas pequenas, legiveis e alinhadas ao padrao existente do projeto.

## Projeto

- Frontend Vue 3 com Vite.
- Codigo principal em `src/`.
- Testes unitarios em `tests/unit/`.
- Testes E2E em `tests/e2e/`.
- Roteiros manuais curtos em `docs/`, quando a mudanca tiver fluxo visual relevante.

## Comandos

Use `npm.cmd` no PowerShell quando `npm` falhar por politica de execucao.

```sh
npm.cmd run lint
npm.cmd run test:unit
npm.cmd run build
npm.cmd run test:e2e
```

Para rodar todos os testes configurados:

```sh
npm.cmd run test
```

## Validacao

- Para ajustes pequenos de copy/estilo, rode apenas o comando mais relacionado.
- Para novas ferramentas ou mudancas de fluxo, rode unitarios, build e E2E quando possivel.
- Ao final de implementacoes visuais, adicione ou atualize um roteiro manual breve em `docs/` quando fizer sentido.
