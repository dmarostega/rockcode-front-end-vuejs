# Componentes para novas ferramentas

Issue de origem: <https://github.com/dmarostega/rockcode-front-end-vuejs/issues/16>

## Estrutura escolhida

Os componentes reutilizáveis ficam em `src/components/tools`. Novas páginas de ferramenta devem ficar em `src/views/tools`, por exemplo:

```text
src/views/tools/SlugGeneratorView.vue
src/views/tools/CharacterCounterView.vue
```

As ferramentas já publicadas em `src/views` não foram movidas nem refatoradas neste PR para manter o escopo seguro.

## Componentes disponíveis

- `ToolPageLayout`: aplica o layout institucional, fundo da página de ferramenta e `NavBoard`.
- `ToolBackLink`: link padrão para voltar ao hub `/ferramentas`.
- `ToolHero`: cabeçalho de página com eyebrow, título e descrição.
- `ToolResultCard`: bloco principal para o resultado/controle da ferramenta, com slots para corpo e rodapé.
- `ToolPrivacyNotice`: card curto e padronizado para ferramentas com entrada de texto. O texto padrão informa processamento local no navegador, ausência de envio para backend/APIs externas e ausência de histórico. Use a prop `estimate` quando a ferramenta entregar resultado estimado.
- `ToolFaq`: lista responsiva de perguntas e respostas. Aceita `headingId` quando a página precisar controlar o ID do título; sem essa prop, gera um ID único automaticamente.

## Quando usar

Use estes componentes ao criar uma nova ferramenta simples do hub. A página deve manter a lógica específica da ferramenta no próprio arquivo ou em um composable quando houver reutilização real.

Evite usar estes componentes para criar um design system amplo. Eles existem apenas para reduzir repetição das futuras páginas de ferramentas.

## Fora do escopo deste PR

- Refatorar UUID, Base64 ou JSON.
- Criar backend, painel admin ou AdSense real.
- Mover rotas existentes.
- Criar componentes genéricos para todo o site institucional.

## Roteiro manual breve

1. Abrir `/ferramentas` e confirmar que as ferramentas atuais continuam acessíveis.
2. Criar uma ferramenta nova em `src/views/tools` usando os componentes acima.
3. Confirmar no mobile que hero, card principal, aviso de privacidade e FAQ quebram para uma coluna.
