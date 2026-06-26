import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ToolPrivacyNotice from '@/components/tools/ToolPrivacyNotice.vue'

describe('ToolPrivacyNotice', () => {
  it('exibe o aviso padrao de processamento local e ausencia de persistencia', () => {
    const wrapper = mount(ToolPrivacyNotice)

    expect(wrapper.text()).toContain('Processamento local no navegador.')
    expect(wrapper.text()).toContain('sem envio para backend, API externa ou upload')
    expect(wrapper.text()).toContain('não cria histórico nem persiste a entrada')
  })

  it('permite complementar o aviso com itens especificos', () => {
    const wrapper = mount(ToolPrivacyNotice, {
      props: {
        items: ['Item complementar de privacidade.'],
      },
    })

    expect(wrapper.findAll('li')).toHaveLength(1)
    expect(wrapper.text()).toContain('Item complementar de privacidade.')
  })
})
