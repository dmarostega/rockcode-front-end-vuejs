import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import AdSenseSlot from '@/components/ads/AdSenseSlot.vue'
import { ADSENSE_SCRIPT_ID, canLoadAdsenseScript, getAdsenseConfig } from '@/config/adsense'

const disabledConfig = {
  enabled: false,
  clientId: '',
  showPlaceholder: false,
}

describe('AdSenseSlot', () => {
  afterEach(() => {
    document.getElementById(ADSENSE_SCRIPT_ID)?.remove()
    delete window.adsbygoogle
  })

  it('mantem anuncios desligados por padrao sem renderizar slot ou carregar script', () => {
    const config = getAdsenseConfig({})
    const wrapper = mount(AdSenseSlot, {
      props: {
        slotId: '1234567890',
        config,
      },
    })

    expect(canLoadAdsenseScript(config)).toBe(false)
    expect(wrapper.find('.adsense-slot').exists()).toBe(false)
    expect(wrapper.text()).toBe('')
    expect(document.getElementById(ADSENSE_SCRIPT_ID)).toBeNull()
    expect(window.adsbygoogle).toBeUndefined()
  })

  it('permite placeholder visual seguro sem carregar script real', () => {
    const wrapper = mount(AdSenseSlot, {
      props: {
        slotId: '1234567890',
        config: {
          ...disabledConfig,
          showPlaceholder: true,
        },
      },
    })

    expect(wrapper.find('.adsense-slot--placeholder').exists()).toBe(true)
    expect(wrapper.text()).toContain('Nenhum script de anuncio foi carregado.')
    expect(document.getElementById(ADSENSE_SCRIPT_ID)).toBeNull()
    expect(window.adsbygoogle).toBeUndefined()
  })

  it('carrega o script somente quando env esta habilitado e client id foi informado', () => {
    const wrapper = mount(AdSenseSlot, {
      props: {
        slotId: '1234567890',
        config: {
          enabled: true,
          clientId: 'ca-pub-123456789',
          showPlaceholder: false,
        },
      },
    })

    const script = document.getElementById(ADSENSE_SCRIPT_ID)

    expect(wrapper.find('ins.adsbygoogle').attributes('data-ad-client')).toBe('ca-pub-123456789')
    expect(script).not.toBeNull()
    expect(script?.getAttribute('src')).toContain('client=ca-pub-123456789')
    expect(window.adsbygoogle).toHaveLength(1)
  })
})
