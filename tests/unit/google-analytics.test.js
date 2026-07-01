import { describe, expect, it } from 'vitest'
import { isLocalAnalyticsHost, shouldLoadGoogleAnalytics } from '@/utils/googleAnalytics'

describe('googleAnalytics', () => {
  it.each(['localhost', '127.0.0.1', '0.0.0.0'])(
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
})
