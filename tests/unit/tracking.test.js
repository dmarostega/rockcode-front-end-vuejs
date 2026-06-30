import { beforeEach, describe, expect, it, vi } from 'vitest'
import { trackEvent } from '@/utils/tracking'

describe('trackEvent', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.spyOn(console, 'debug').mockImplementation(() => {})
  })

  it('gera e reaproveita um session_id anonimo', () => {
    const firstEvent = trackEvent('cta_clicked', {
      cta_label: 'Ver projetos',
      destination: '/apps',
    })

    const secondEvent = trackEvent('page_viewed', {
      page_path: '/apps',
    })

    expect(firstEvent.session_id).toBeTruthy()
    expect(secondEvent.session_id).toBe(firstEvent.session_id)
    expect(localStorage.getItem('rockcode_tracking_session_id')).toBe(firstEvent.session_id)
  })

  it('inclui page_path e mantem payload explicito sem dados de input', () => {
    window.history.pushState({}, '', '/ferramentas?grupo=dev')

    const event = trackEvent('tool_card_clicked', {
      feature: 'slug_generator',
      destination: '/ferramentas/gerador-slug',
    })

    expect(event).toMatchObject({
      event_name: 'tool_card_clicked',
      page_path: '/ferramentas?grupo=dev',
      payload: {
        feature: 'slug_generator',
        destination: '/ferramentas/gerador-slug',
      },
    })
    expect(JSON.stringify(event.payload)).not.toContain('input')
  })

  it('falha silenciosamente quando o nome do evento nao e informado', () => {
    expect(trackEvent()).toBeNull()
  })
})
