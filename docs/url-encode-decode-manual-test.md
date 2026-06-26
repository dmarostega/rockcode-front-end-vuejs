# Teste manual - URL encode e decode

## Rota

- `/ferramentas/url-encode-decode`

## Casos rápidos

- Encode: `https://rockcodelabs.com.br/ferramentas?busca=Vue 3 & tópico=SEO básico` deve gerar texto com `%20`, `%26` e caracteres acentuados codificados.
- Decode: `Rock%20Code%20Labs%20%26%20Vue%203%20%2B%20SEO%20b%C3%A1sico` deve voltar para `Rock Code Labs & Vue 3 + SEO básico`.
- Erro: `%E0%A4%A` no modo decode deve exibir erro amigável e desabilitar cópia.
- Botões: `Usar exemplo` deve preencher a entrada conforme o modo atual, `Limpar` deve zerar o resultado e `Copiar resultado` deve exibir feedback.

## Smoke visual

- Desktop: validar H1 único, seletor encode/decode, campo de entrada, resultado, conteúdo explicativo, aviso de privacidade, FAQ e link de retorno ao hub.
- Mobile: validar que a página não tem rolagem horizontal, botões ocupam largura adequada e textos longos quebram linha sem sair do card.
