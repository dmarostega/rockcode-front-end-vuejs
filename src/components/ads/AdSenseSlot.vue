<script setup>
import { computed, onMounted } from 'vue'
import { ADSENSE_SCRIPT_ID, canLoadAdsenseScript, getAdsenseConfig } from '@/config/adsense'

const props = defineProps({
  slotId: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: 'Publicidade',
  },
  format: {
    type: String,
    default: 'auto',
  },
  fullWidthResponsive: {
    type: Boolean,
    default: true,
  },
  config: {
    type: Object,
    default: null,
  },
})

const adsenseConfig = computed(() => props.config ?? getAdsenseConfig())

const shouldRenderAd = computed(
  () => canLoadAdsenseScript(adsenseConfig.value) && props.slotId.trim().length > 0,
)

const shouldRenderPlaceholder = computed(
  () => !shouldRenderAd.value && adsenseConfig.value.showPlaceholder,
)

function loadAdsenseScript() {
  if (!shouldRenderAd.value) {
    return
  }

  if (document.getElementById(ADSENSE_SCRIPT_ID)) {
    renderAdsenseSlot()
    return
  }

  const script = document.createElement('script')
  script.id = ADSENSE_SCRIPT_ID
  script.async = true
  script.crossOrigin = 'anonymous'
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
    adsenseConfig.value.clientId,
  )}`

  document.head.appendChild(script)
  renderAdsenseSlot()
}

function renderAdsenseSlot() {
  window.adsbygoogle = window.adsbygoogle || []
  window.adsbygoogle.push({})
}

onMounted(loadAdsenseScript)
</script>

<template>
  <aside v-if="shouldRenderAd" class="adsense-slot" :aria-label="label">
    <ins
      class="adsbygoogle"
      style="display: block"
      :data-ad-client="adsenseConfig.clientId"
      :data-ad-slot="slotId"
      :data-ad-format="format"
      :data-full-width-responsive="String(fullWidthResponsive)"
    />
  </aside>

  <aside v-else-if="shouldRenderPlaceholder" class="adsense-slot adsense-slot--placeholder">
    <span>{{ label }}</span>
    <p>Espaco reservado para avaliacao futura. Nenhum script de anuncio foi carregado.</p>
  </aside>
</template>

<style scoped>
.adsense-slot {
  display: block;
  width: 100%;
  margin: 2rem auto;
}

.adsense-slot--placeholder {
  max-width: 1100px;
  padding: 1.25rem;
  border: 1px dashed rgba(148, 163, 184, 0.38);
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.58);
  color: #cbd5e1;
  text-align: center;
}

.adsense-slot--placeholder span {
  display: block;
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.adsense-slot--placeholder p {
  max-width: 680px;
  margin: 0.5rem auto 0;
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.6;
}
</style>
