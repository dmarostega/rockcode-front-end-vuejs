# Template de paginas internas de apps/projetos

## Decisao tecnica

O padrao reutilizavel para paginas internas de apps/projetos foi implementado como o componente
`src/components/apps/AppProjectPage.vue`.

A primeira pagina usando o padrao e `/apps/qrcodeflow`, mantida em
`src/views/apps/QrCodeFlowView.vue` como uma camada de dados e conteudo do projeto.

## Quando usar

Use o template apenas quando houver conteudo real suficiente sobre o app/projeto. A pagina deve
explicar uma entrega existente ou em validacao concreta, nao apenas listar uma ideia futura.

## Blocos obrigatorios

- `title`: nome publico do app/projeto.
- `description`: resumo direto do que o app resolve.
- `primaryCta`: link para produto, demonstracao ou projeto publico.
- `problem`: problema resolvido com titulo e descricao.
- `status`: estado atual, subdominio/repositorio ou contexto operacional.
- `audience`: publico-alvo com itens especificos.
- `features`: funcionalidades atuais, nao promessas futuras.
- `stack`: tecnologias e ferramentas principais.
- `stackDescription`: contexto da stack e do estagio do projeto.
- `relatedLinks`: links internos existentes e realmente relacionados.

## Regras de conteudo

1. Nao criar pagina interna para app sem produto, prototipo publicado, repositorio apresentavel ou contexto suficiente.
2. Nao criar links para paginas futuras ainda inexistentes.
3. Nao repetir palavras-chave artificialmente.
4. Manter o CTA externo claro quando o produto roda em subdominio separado.
5. Criar metadata, sitemap e teste/roteiro manual para cada nova pagina.

## Validacao recomendada

- Confirmar `h1` unico com o nome do app/projeto.
- Confirmar se problema, publico, funcionalidades, stack/status, links relacionados e CTA estao visiveis.
- Rodar `npm.cmd run lint`.
- Rodar `npm.cmd run build` quando metadata/sitemap/rota forem alterados.
- Rodar E2E especifico quando a pagina tiver nova rota ou links criticos.
