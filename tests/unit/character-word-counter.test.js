import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CharacterWordCounterView from '@/views/tools/CharacterWordCounterView.vue'

const mountCharacterWordCounter = () =>
  mount(CharacterWordCounterView, {
    global: {
      stubs: {
        RouterLink: {
          props: ['to'],
          template: '<a><slot /></a>',
        },
      },
    },
  })

const getStatValue = (wrapper, label) => {
  const statCard = wrapper.findAll('.stat-card').find((card) => card.find('span').text() === label)

  return statCard.find('strong').text()
}

describe('CharacterWordCounterView', () => {
  it('mostra contagem zerada quando o texto esta vazio', () => {
    const wrapper = mountCharacterWordCounter()

    expect(getStatValue(wrapper, 'Caracteres')).toBe('0')
    expect(getStatValue(wrapper, 'Palavras')).toBe('0')
    expect(getStatValue(wrapper, 'Linhas')).toBe('0')
    expect(getStatValue(wrapper, 'Sem espaços')).toBe('0')
  })

  it('atualiza caracteres, palavras e linhas conforme o texto digitado', async () => {
    const wrapper = mountCharacterWordCounter()

    await wrapper.get('#counter-input').setValue('Rock Code Labs\nFerramenta gratuita')

    expect(getStatValue(wrapper, 'Caracteres')).toBe('34')
    expect(getStatValue(wrapper, 'Palavras')).toBe('5')
    expect(getStatValue(wrapper, 'Linhas')).toBe('2')
    expect(getStatValue(wrapper, 'Sem espaços')).toBe('30')
  })
})
