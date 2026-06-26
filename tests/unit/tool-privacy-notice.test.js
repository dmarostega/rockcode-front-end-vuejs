import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ToolPrivacyNotice from '@/components/tools/ToolPrivacyNotice.vue'

describe('ToolPrivacyNotice', () => {
  it('exibe o aviso padrao de processamento local e ausencia de persistencia', () => {
    const wrapper = mount(ToolPrivacyNotice)

    expect(wrapper.text()).toContain('Processamento local no navegador.')
    expect(wrapper.text()).toContain('ficam no seu navegador')
    expect(wrapper.text()).toContain('não são salvos em histórico')
    expect(wrapper.text()).toContain('backend ou APIs externas')
  })

  it('exibe aviso de resultado estimado quando solicitado', () => {
    const wrapper = mount(ToolPrivacyNotice, {
      props: {
        estimate: true,
      },
    })

    expect(wrapper.text()).toContain('Resultado estimado.')
    expect(wrapper.text()).toContain('Use o resultado como referência.')
    expect(wrapper.text()).toContain('Valores finais podem variar')
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
