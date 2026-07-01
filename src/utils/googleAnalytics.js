const GA_MEASUREMENT_ID = 'G-SRWKM62NDG'
const GA_SCRIPT_ID = 'rockcode-ga4-script'
const ENABLED_VALUES = ['1', 'true', 'enabled', 'yes']
const LOCAL_ANALYTICS_HOSTNAMES = ['localhost', '127.0.0.1', '0.0.0.0']

const isExplicitlyEnabled = (value) =>
  ENABLED_VALUES.includes(String(value || '').trim().toLowerCase())

const getCurrentHostname = () => {
  if (typeof window === 'undefined') {
    return ''
  }

  return window.location.hostname
}

export const isLocalAnalyticsHost = (hostname = getCurrentHostname()) =>
  LOCAL_ANALYTICS_HOSTNAMES.includes(String(hostname || '').toLowerCase())

export const shouldLoadGoogleAnalytics = ({
  gaEnabled = import.meta.env.VITE_GA_ENABLED,
  isProduction = import.meta.env.PROD,
  hostname = getCurrentHostname(),
} = {}) => isExplicitlyEnabled(gaEnabled) && isProduction === true && !isLocalAnalyticsHost(hostname)

export const initializeGoogleAnalytics = () => {
  if (typeof window === 'undefined' || !shouldLoadGoogleAnalytics()) {
    return false
  }

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
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script)
  }

  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID)

  return true
}
