# Home CLS manual test

## Objetivo

Validar que a home carrega sem deslocamento visual perceptivel na hero e na primeira secao de conteudo.

## Roteiro

1. Abrir `http://localhost:5173/` em uma janela anonima ou com cache desativado.
2. Recarregar a pagina em desktop e observar se logo, eyebrow, titulo e botoes mantem posicao estavel.
3. Repetir em viewport mobile, por exemplo `390x844`.
4. Confirmar que a primeira `content-section` nao salta para baixo apos as imagens da hero carregarem.
5. Confirmar que os botoes continuam responsivos e que nenhum texto fica cortado.

## Resultado esperado

- A home nao apresenta deslocamento visual perceptivel no carregamento.
- O visual atual da hero e das secoes publicas e preservado em desktop e mobile.
