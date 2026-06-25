import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SlugGeneratorView from '@/views/tools/SlugGeneratorView.vue'

const mountSlugGenerator = () =>
  mount(SlugGeneratorView, {
    global: {
      stubs: {
        RouterLink: {
          props: ['to'],
          template: '<a><slot /></a>',
        },
      },
    },
  })

describe('SlugGeneratorView', () => {
  it('normaliza texto com acentos e pontuacao para slug', async () => {
    const wrapper = mountSlugGenerator()

    await wrapper
      .get('#slug-input')
      .setValue('  Guia r\u00e1pido: P\u00e1ginas Vue com SEO b\u00e1sico!  ')

    expect(wrapper.get('#slug-result').text()).toBe('guia-rapido-paginas-vue-com-seo-basico')
  })

  it('desabilita a acao de copiar quando nao ha slug gerado', async () => {
    const wrapper = mountSlugGenerator()

    await wrapper.get('#slug-input').setValue('')

    expect(wrapper.get('button.primary-action').attributes('disabled')).toBeDefined()
    expect(wrapper.get('#slug-result').text()).toContain('O slug')
  })
})
