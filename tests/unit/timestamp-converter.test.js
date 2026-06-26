import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TimestampConverterView from '@/views/tools/TimestampConverterView.vue'

const mountTimestampConverter = () =>
  mount(TimestampConverterView, {
    global: {
      stubs: {
        RouterLink: {
          props: ['to'],
          template: '<a><slot /></a>',
        },
      },
    },
  })

describe('TimestampConverterView', () => {
  it('converte timestamp em segundos para data UTC legível', async () => {
    const wrapper = mountTimestampConverter()

    await wrapper.get('#timestamp-input').setValue('1700000000')

    expect(wrapper.get('#timestamp-date-result').text()).toContain('2023-11-14T22:13:20.000Z')
  })

  it('converte timestamp em milissegundos para data UTC legível', async () => {
    const wrapper = mountTimestampConverter()

    await wrapper.get('button[aria-pressed="false"]').trigger('click')
    await wrapper.get('#timestamp-input').setValue('1700000000000')

    expect(wrapper.get('#timestamp-date-result').text()).toContain('2023-11-14T22:13:20.000Z')
  })

  it('converte data local para timestamp em segundos e milissegundos', async () => {
    const wrapper = mountTimestampConverter()
    const dateValue = '2023-11-14T22:13'
    const expectedMilliseconds = new Date(dateValue).getTime()

    await wrapper.get('#date-input').setValue(dateValue)

    expect(wrapper.get('#date-timestamp-result').text()).toContain(
      String(Math.floor(expectedMilliseconds / 1000)),
    )
    expect(wrapper.get('#date-timestamp-result').text()).toContain(String(expectedMilliseconds))
  })

  it('exibe erro amigavel para timestamp invalido', async () => {
    const wrapper = mountTimestampConverter()

    await wrapper.get('#timestamp-input').setValue('abc')

    expect(wrapper.get('[role="alert"]').text()).toContain('Use apenas números')
    expect(wrapper.get('button.primary-action').attributes('disabled')).toBeDefined()
  })
})
