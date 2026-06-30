# Roteiro manual - funil publico

## Escopo

Validar os ajustes incrementais do funil publico entre home, ferramentas gratuitas e apps/projetos.

## Fluxo desktop

1. Abrir `/`.
2. Confirmar que os CTAs principais levam para `/apps` e `/ferramentas`.
3. Confirmar que QRCodeFlow aparece em projetos em destaque e abre `/apps/qrcodeflow`.
4. Abrir `/ferramentas`.
5. Confirmar que a secao "Comece por aqui" mostra atalhos para Slug, Desconto e JSON.
6. Clicar em um atalho e confirmar navegacao para a ferramenta correta.
7. Abrir `/apps`.
8. Confirmar que QRCodeFlow e Minha Loteria aparecem como primeiros cards.
9. Confirmar que QRCodeFlow abre a pagina interna e Minha Loteria abre o projeto externo.

## Fluxo mobile

1. Repetir o fluxo com largura aproximada de 390px.
2. Confirmar que CTAs da home nao sobrepoem textos.
3. Confirmar que atalhos de ferramentas ficam em uma coluna.
4. Confirmar que cards de apps ficam em uma coluna e os badges continuam legiveis.

## Tracking

1. Em desenvolvimento, abrir o console.
2. Navegar entre `/`, `/ferramentas`, `/apps` e `/apps/qrcodeflow`.
3. Confirmar eventos `page_viewed`.
4. Clicar em CTAs, cards de ferramentas e cards de projetos.
5. Confirmar eventos `cta_clicked`, `tool_card_clicked` e `project_card_clicked`.
6. Confirmar que nenhum evento contem input, output ou texto digitado pelo usuario.
