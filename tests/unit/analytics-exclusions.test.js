import { describe, expect, it } from 'vitest'
import { isExcludedAnalyticsReferrer } from '@/utils/analyticsExclusions'

describe('analyticsExclusions', () => {
  it('bloqueia referrer do CloudPanel pelo host com porta', () => {
    expect(
      isExcludedAnalyticsReferrer({
        referrer: 'https://195.35.18.65:8443/',
      }),
    ).toBe(true)
  })

  it('permite referrer publico normal', () => {
    expect(
      isExcludedAnalyticsReferrer({
        referrer: 'https://google.com/search?q=rockcode',
      }),
    ).toBe(false)
  })

  it('permite referrer invalido sem quebrar analytics', () => {
    expect(
      isExcludedAnalyticsReferrer({
        referrer: 'referrer invalido',
      }),
    ).toBe(false)
  })
})
