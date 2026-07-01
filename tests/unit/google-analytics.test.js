import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  initializeGoogleAnalytics,
  isLocalAnalyticsHost,
  shouldLoadGoogleAnalytics,
} from '@/utils/googleAnalytics'

describe('googleAnalytics', () => {
  beforeEach(() => {
    document.head.innerHTML = ''
    window.dataLayer = undefined
    window.gtag = undefined
    vi.unstubAllEnvs()
  })

  it.each(['localhost', 'LOCALHOST', '127.0.0.1', '0.0.0.0', '::1', '[::1]'])(
    'bloqueia GA4 em host local: %s',
    (hostname) => {
      expect(
        shouldLoadGoogleAnalytics({
          gaEnabled: 'true',
          isProduction: true,
          hostname,
        }),
      ).toBe(false)
      expect(isLocalAnalyticsHost(hostname)).toBe(true)
    },
  )

  it('bloqueia GA4 quando a env nao esta explicitamente habilitada', () => {
    expect(
      shouldLoadGoogleAnalytics({
        gaEnabled: 'false',
        isProduction: true,
        hostname: 'rockcodelabs.com.br',
      }),
    ).toBe(false)
  })

  it('bloqueia GA4 em desenvolvimento mesmo com env habilitada', () => {
    expect(
      shouldLoadGoogleAnalytics({
        gaEnabled: 'true',
        isProduction: false,
        hostname: 'rockcodelabs.com.br',
      }),
    ).toBe(false)
  })

  it('permite GA4 apenas em producao com env explicita e host publico', () => {
    expect(
      shouldLoadGoogleAnalytics({
        gaEnabled: 'true',
        isProduction: true,
        hostname: 'rockcodelabs.com.br',
        isExcludedReferrer: false,
      }),
    ).toBe(true)
  })

  it('bloqueia GA4 quando o referrer vem do CloudPanel', () => {
    expect(
      shouldLoadGoogleAnalytics({
        gaEnabled: 'true',
        isProduction: true,
        hostname: 'rockcodelabs.com.br',
        isExcludedReferrer: true,
      }),
    ).toBe(false)
  })

  it('inicializa GA4 sem duplicar script quando chamado mais de uma vez', () => {
    vi.stubEnv('VITE_GA_ENABLED', 'true')
    vi.stubEnv('VITE_GA_MEASUREMENT_ID', 'G-TEST123')
    vi.stubEnv('PROD', true)

    expect(initializeGoogleAnalytics()).toBe(true)
    expect(initializeGoogleAnalytics()).toBe(true)

    const scripts = document.querySelectorAll('#rockcode-ga4-script')

    expect(scripts).toHaveLength(1)
    expect(scripts[0].getAttribute('src')).toBe(
      'https://www.googletagmanager.com/gtag/js?id=G-TEST123',
    )
    expect(window.dataLayer.map((item) => Array.from(item))).toEqual([
      ['js', expect.any(Date)],
      ['config', 'G-TEST123'],
      ['js', expect.any(Date)],
      ['config', 'G-TEST123'],
    ])
  })
})
