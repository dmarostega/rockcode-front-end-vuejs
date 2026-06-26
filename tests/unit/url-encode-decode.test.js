import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import UrlEncodeDecodeView from '@/views/tools/UrlEncodeDecodeView.vue'

const mountUrlTool = () =>
  mount(UrlEncodeDecodeView, {
    global: {
      stubs: {
        RouterLink: {
          props: ['to'],
          template: '<a><slot /></a>',
        },
      },
    },
  })

describe('UrlEncodeDecodeView', () => {
  it('codifica texto com espacos, acentos e query string', async () => {
    const wrapper = mountUrlTool()

    await wrapper
      .get('#url-input')
      .setValue('https://rockcodelabs.com.br/ferramentas?busca=Vue 3 & tópico=SEO básico')

    expect(wrapper.get('#url-result').text()).toBe(
      'https%3A%2F%2Frockcodelabs.com.br%2Fferramentas%3Fbusca%3DVue%203%20%26%20t%C3%B3pico%3DSEO%20b%C3%A1sico',
    )
  })

  it('decodifica texto codificado', async () => {
    const wrapper = mountUrlTool()

    await wrapper.get('button[aria-pressed="false"]').trigger('click')
    await wrapper
      .get('#url-input')
      .setValue('Rock%20Code%20Labs%20%26%20Vue%203%20%2B%20SEO%20b%C3%A1sico')

    expect(wrapper.get('#url-result').text()).toBe('Rock Code Labs & Vue 3 + SEO básico')
  })

  it('exibe erro amigavel ao decodificar entrada invalida', async () => {
    const wrapper = mountUrlTool()

    await wrapper.get('button[aria-pressed="false"]').trigger('click')
    await wrapper.get('#url-input').setValue('%E0%A4%A')

    expect(wrapper.get('[role="alert"]').text()).toContain('Não foi possível decodificar')
    expect(wrapper.get('button.primary-action').attributes('disabled')).toBeDefined()
  })
})
