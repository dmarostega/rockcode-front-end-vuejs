import { mount } from '@vue/test-utils'
import { createHash } from 'node:crypto'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import HashGeneratorView from '@/views/tools/HashGeneratorView.vue'

const mountHashGenerator = () =>
  mount(HashGeneratorView, {
    global: {
      stubs: {
        RouterLink: {
          props: ['to'],
          template: '<a><slot /></a>',
        },
      },
    },
  })

const digestHex = (algorithm, value) =>
  createHash(algorithm.toLowerCase().replace('-', '')).update(value).digest('hex')

const digestBuffer = (algorithm, value) =>
  new Uint8Array(Buffer.from(digestHex(algorithm, value), 'hex')).buffer

describe('HashGeneratorView', () => {
  beforeEach(() => {
    vi.stubGlobal('crypto', {
      subtle: {
        digest: vi.fn((algorithm, value) =>
          Promise.resolve(digestBuffer(algorithm, new TextDecoder().decode(value))),
        ),
      },
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('gera SHA-256 localmente para o texto informado', async () => {
    const wrapper = mountHashGenerator()

    await wrapper.get('#hash-input').setValue('Rock Code Labs')
    await wrapper.get('button.primary-action').trigger('click')

    expect(wrapper.get('#hash-result').text()).toBe(digestHex('SHA-256', 'Rock Code Labs'))
  })

  it('gera SHA-512 depois de trocar o algoritmo', async () => {
    const wrapper = mountHashGenerator()

    await wrapper.get('#hash-input').setValue('Rock Code Labs')
    await wrapper.get('button[aria-pressed="false"]').trigger('click')
    await wrapper.get('button.primary-action').trigger('click')

    expect(wrapper.get('#hash-result').text()).toBe(digestHex('SHA-512', 'Rock Code Labs'))
  })

  it('exibe aviso claro de uso didático e não recomenda hash simples para senhas', () => {
    const wrapper = mountHashGenerator()

    expect(wrapper.text()).toContain('Hash simples não é recomendação')
    expect(wrapper.text()).toContain('senhas')
  })
})
