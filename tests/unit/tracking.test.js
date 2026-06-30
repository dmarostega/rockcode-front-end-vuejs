import { beforeEach, describe, expect, it, vi } from 'vitest'
import { trackEvent } from '@/utils/tracking'

describe('trackEvent', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
    vi.spyOn(console, 'debug').mockImplementation(() => {})
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ ok: true })),
    )
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

  it('inclui page_path limpo e mantem payload explicito sem dados de input', () => {
    window.history.pushState({}, '', '/ferramentas?grupo=dev')

    const event = trackEvent('tool_card_clicked', {
      feature: 'slug_generator',
      destination: '/ferramentas/gerador-slug',
    })

    expect(event).toMatchObject({
      event_name: 'tool_card_clicked',
      page_path: '/ferramentas',
      payload: {
        feature: 'slug_generator',
        destination: '/ferramentas/gerador-slug',
      },
    })
    expect(JSON.stringify(event.payload)).not.toContain('input')
  })

  it('ignora eventos fora da allowlist', () => {
    expect(trackEvent('form_submitted', { email: 'cliente@example.com' })).toBeNull()
    expect(fetch).not.toHaveBeenCalled()
  })

  it('remove campos nao permitidos antes de retornar ou enviar o evento', () => {
    const event = trackEvent('tool_result_copied', {
      feature: 'slug_generator',
      input: 'Texto digitado',
      output: 'texto-digitado',
      email: 'cliente@example.com',
    })

    expect(event.payload).toEqual({
      feature: 'slug_generator',
    })
    expect(JSON.stringify(event)).not.toContain('Texto digitado')
    expect(JSON.stringify(event)).not.toContain('texto-digitado')
    expect(JSON.stringify(event)).not.toContain('cliente@example.com')
  })

  it('nao registra query string nem hash no page_path automatico', () => {
    window.history.pushState({}, '', '/ferramentas?url=https://exemplo.com#token')

    const event = trackEvent('page_viewed')

    expect(event.page_path).toBe('/ferramentas')
    expect(event.page_path).not.toContain('?')
    expect(event.page_path).not.toContain('#')
  })

  it('sanitiza page_path informado manualmente no evento e no payload', () => {
    const event = trackEvent('page_viewed', {
      page_path: '/apps?redirect=https://exemplo.com#token',
      route_name: 'apps',
    })

    expect(event.page_path).toBe('/apps')
    expect(event.payload.page_path).toBe('/apps')
    expect(JSON.stringify(event)).not.toContain('redirect=')
    expect(JSON.stringify(event)).not.toContain('#token')
  })

  it('remove origem, query string e hash de URL absoluta em page_path manual', () => {
    const event = trackEvent('page_viewed', {
      page_path: 'https://rockcodelabs.com.br/ferramentas?url=https://exemplo.com#token',
    })

    expect(event.page_path).toBe('/ferramentas')
    expect(event.payload.page_path).toBe('/ferramentas')
    expect(JSON.stringify(event)).not.toContain('rockcodelabs.com.br')
    expect(JSON.stringify(event)).not.toContain('exemplo.com')
    expect(JSON.stringify(event)).not.toContain('#token')
  })

  it('falha silenciosamente quando o nome do evento nao e informado', () => {
    expect(trackEvent()).toBeNull()
  })

  it('nao envia evento quando analytics esta desativado por env ausente', () => {
    trackEvent('cta_clicked', {
      cta_label: 'Ver projetos',
      destination: '/apps',
    })

    expect(fetch).not.toHaveBeenCalled()
  })

  it('nao envia evento quando endpoint nao esta configurado', () => {
    vi.stubEnv('VITE_ANALYTICS_ENABLED', 'true')

    trackEvent('cta_clicked', {
      cta_label: 'Ver projetos',
      destination: '/apps',
    })

    expect(fetch).not.toHaveBeenCalled()
  })

  it('envia evento permitido quando analytics esta habilitado e endpoint configurado', () => {
    vi.stubEnv('VITE_ANALYTICS_ENABLED', 'true')
    vi.stubEnv('VITE_ANALYTICS_ENDPOINT', 'https://api.rockcodelabs.com.br/events')

    const event = trackEvent('cta_clicked', {
      cta_label: 'Ver projetos',
      destination: '/apps?utm_source=teste#secao',
      input: 'nao enviar',
    })

    expect(fetch).toHaveBeenCalledWith('https://api.rockcodelabs.com.br/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
      credentials: 'omit',
      keepalive: true,
    })
    expect(event.payload.destination).toBe('/apps')
    expect(JSON.stringify(event)).not.toContain('utm_source')
    expect(JSON.stringify(event)).not.toContain('nao enviar')
  })

  it('mantem fallback silencioso quando endpoint falha', () => {
    vi.stubEnv('VITE_ANALYTICS_ENABLED', 'true')
    vi.stubEnv('VITE_ANALYTICS_ENDPOINT', 'https://api.rockcodelabs.com.br/events')
    fetch.mockRejectedValueOnce(new Error('Network error'))

    expect(() => trackEvent('page_viewed', { page_path: '/apps' })).not.toThrow()
    expect(fetch).toHaveBeenCalledTimes(1)
  })
})
