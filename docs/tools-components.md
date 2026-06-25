# Componentes para novas ferramentas

Issue de origem: <https://github.com/dmarostega/rockcode-front-end-vuejs/issues/16>

## Estrutura escolhida

Os componentes reutilizaveis ficam em `src/components/tools`. Novas paginas de ferramenta devem ficar em `src/views/tools`, por exemplo:

```text
src/views/tools/SlugGeneratorView.vue
src/views/tools/CharacterCounterView.vue
```

As ferramentas ja publicadas em `src/views` nao foram movidas nem refatoradas neste PR para manter o escopo seguro.

## Componentes disponiveis

- `ToolPageLayout`: aplica o layout institucional, fundo da pagina de ferramenta e `NavBoard`.
- `ToolBackLink`: link padrao para voltar ao hub `/ferramentas`.
- `ToolHero`: cabecalho de pagina com eyebrow, titulo e descricao.
- `ToolResultCard`: bloco principal para o resultado/controle da ferramenta, com slots para corpo e rodape.
- `ToolPrivacyNotice`: card curto para explicar processamento local e ausencia de envio/salvamento.
- `ToolFaq`: lista responsiva de perguntas e respostas.

## Quando usar

Use estes componentes ao criar uma nova ferramenta simples do hub. A pagina deve manter a logica especifica da ferramenta no proprio arquivo ou em um composable quando houver reutilizacao real.

Evite usar estes componentes para criar um design system amplo. Eles existem apenas para reduzir repeticao das futuras paginas de ferramentas.

## Fora do escopo deste PR

- Refatorar UUID, Base64 ou JSON.
- Criar backend, painel admin ou AdSense real.
- Mover rotas existentes.
- Criar componentes genericos para todo o site institucional.

## Roteiro manual breve

1. Abrir `/ferramentas` e confirmar que as ferramentas atuais continuam acessiveis.
2. Criar uma ferramenta nova em `src/views/tools` usando os componentes acima.
3. Confirmar no mobile que hero, card principal, aviso de privacidade e FAQ quebram para uma coluna.
