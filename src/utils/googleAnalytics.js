import { isExcludedAnalyticsReferrer } from './analyticsExclusions'

const DEFAULT_GA_MEASUREMENT_ID = 'G-SRWKM62NDG'
const GA_SCRIPT_ID = 'rockcode-ga4-script'
const ENABLED_VALUES = ['1', 'true', 'enabled', 'yes']
const LOCAL_ANALYTICS_HOSTNAMES = ['localhost', '127.0.0.1', '0.0.0.0', '::1', '[::1]']

const isExplicitlyEnabled = (value) =>
  ENABLED_VALUES.includes(String(value || '').trim().toLowerCase())

const getCurrentHostname = () => {
  if (typeof window === 'undefined') {
    return ''
  }

  return window.location.hostname
}

const getGoogleAnalyticsMeasurementId = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID

  return typeof measurementId === 'string' && measurementId.trim()
    ? measurementId.trim()
    : DEFAULT_GA_MEASUREMENT_ID
}

export const isLocalAnalyticsHost = (hostname = getCurrentHostname()) =>
  LOCAL_ANALYTICS_HOSTNAMES.includes(String(hostname || '').trim().toLowerCase())

export const shouldLoadGoogleAnalytics = ({
  gaEnabled = import.meta.env.VITE_GA_ENABLED,
  isProduction = import.meta.env.PROD,
  hostname = getCurrentHostname(),
  isExcludedReferrer = isExcludedAnalyticsReferrer(),
} = {}) =>
  isExplicitlyEnabled(gaEnabled) &&
  isProduction === true &&
  !isLocalAnalyticsHost(hostname) &&
  !isExcludedReferrer

export const initializeGoogleAnalytics = () => {
  if (typeof window === 'undefined' || !shouldLoadGoogleAnalytics()) {
    return false
  }

  const measurementId = getGoogleAnalyticsMeasurementId()

  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments)
    }

  if (!document.getElementById(GA_SCRIPT_ID)) {
    const script = document.createElement('script')
    script.id = GA_SCRIPT_ID
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script)
  }

  window.gtag('js', new Date())
  window.gtag('config', measurementId)

  return true
}
