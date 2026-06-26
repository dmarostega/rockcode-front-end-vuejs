# Roteiro manual - aviso de privacidade das ferramentas

Issue de origem: <https://github.com/dmarostega/rockcode-front-end-vuejs/issues/21>

## Objetivo

Validar que ferramentas com entrada de texto exibem o aviso padronizado de privacidade sem alterar o fluxo principal.

## Passos

1. Abrir `/ferramentas/base64`, `/ferramentas/formatador-json`, `/ferramentas/gerador-slug`, `/ferramentas/contador-caracteres-palavras` e `/ferramentas/url-encode-decode`.
2. Confirmar que cada página exibe o bloco `Privacidade` com a mensagem de processamento local no navegador.
3. Confirmar que o texto informa ausência de envio para backend, API externa ou upload.
4. Confirmar que o texto informa ausência de histórico e persistência da entrada.
5. Usar a função principal de cada ferramenta e confirmar que o comportamento anterior continua igual.
