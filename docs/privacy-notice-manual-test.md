# Roteiro manual - aviso de privacidade das ferramentas

Issue de origem: <https://github.com/dmarostega/rockcode-front-end-vuejs/issues/21>

## Objetivo

Validar que ferramentas com entrada de texto exibem o aviso padronizado de privacidade sem alterar o fluxo principal.

## Passos

1. Abrir `/ferramentas/base64`, `/ferramentas/formatador-json`, `/ferramentas/gerador-slug`, `/ferramentas/contador-caracteres-palavras` e `/ferramentas/url-encode-decode`.
2. Confirmar que cada página exibe o bloco `Privacidade` com a mensagem de processamento local no navegador.
3. Confirmar que o texto informa que os dados ficam no navegador durante o uso da página.
4. Confirmar que o texto informa ausência de histórico e envio para backend ou APIs externas.
5. Usar a função principal de cada ferramenta e confirmar que o comportamento anterior continua igual.
6. Abrir `/ferramentas/calculadora-desconto`, `/ferramentas/comparador-preco-unidade` e `/ferramentas/calculadora-consumo-combustivel`.
7. Confirmar que as três páginas exibem `Resultado estimado.` no mesmo bloco de privacidade.
8. Confirmar que o aviso de estimativa é curto, compreensível e não usa linguagem jurídica.
