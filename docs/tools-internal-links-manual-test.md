# Teste manual - Links internos das ferramentas

## Rota

- `/ferramentas`

## Casos rápidos

- Hub: validar que os cards apontam para todas as ferramentas publicadas: UUID, Base64, JSON, Slug, Contador de caracteres e palavras, URL Encode/Decode.
- Ferramentas: abrir cada página e confirmar o link `Voltar para ferramentas` no topo.
- Retorno: clicar em `Voltar para ferramentas` e confirmar que a navegação retorna para `/ferramentas`.
- Compras: abrir `/ferramentas/calculadora-desconto` e confirmar a seção `Ferramentas relacionadas` apontando para `/ferramentas/comparador-preco-unidade`.
- Compras: abrir `/ferramentas/comparador-preco-unidade` e confirmar a seção `Ferramentas relacionadas` apontando para `/ferramentas/calculadora-desconto`.
- Combustível: abrir `/ferramentas/calculadora-consumo-combustivel` e confirmar que não existe link funcional para custo de viagem enquanto a página não estiver implementada.
- Projeto relacionado: confirmar que `QRCodeFlow` permanece como link externo separado.

## Smoke visual

- Desktop: validar que o backlink fica visível antes do conteúdo principal e não desloca os painéis.
- Mobile: validar que o backlink e os cards de ferramentas relacionadas são legíveis, clicáveis e não causam rolagem horizontal.
