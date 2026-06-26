# AdSenseSlot

Issue de origem: <https://github.com/dmarostega/rockcode-front-end-vuejs/issues/24>

O componente `AdSenseSlot` prepara slots reutilizaveis para uma ativacao futura de anuncios no hub `/ferramentas` e nas paginas de ferramenta.

Por padrao, ele nao renderiza nada e nao carrega script externo.

## Variaveis de ambiente

```env
VITE_ADSENSE_ENABLED=false
VITE_ADSENSE_CLIENT_ID=
VITE_ADSENSE_PLACEHOLDER_ENABLED=false
```

## Uso futuro

```vue
<script setup>
import AdSenseSlot from '@/components/ads/AdSenseSlot.vue'
</script>

<template>
  <AdSenseSlot slot-id="0000000000" label="Publicidade" />
</template>
```

## Regras do ciclo atual

1. Nao ativar AdSense real neste ciclo.
2. Manter `VITE_ADSENSE_ENABLED=false` como comportamento padrao.
3. Nao posicionar anuncios dentro dos cards das ferramentas.
4. Usar `VITE_ADSENSE_PLACEHOLDER_ENABLED=true` apenas para validacao visual controlada.
5. Registrar validacao visual antes de ativar qualquer slot real em producao.
