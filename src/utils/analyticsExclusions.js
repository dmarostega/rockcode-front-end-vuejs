const DEFAULT_EXCLUDED_REFERRER_HOSTS = ['195.35.18.65:8443']

const parseList = (value) =>
  String(value || '')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)

const getExcludedReferrerHosts = (envValue = import.meta.env.VITE_ANALYTICS_EXCLUDED_REFERRERS) => [
  ...new Set([...DEFAULT_EXCLUDED_REFERRER_HOSTS, ...parseList(envValue)]),
]

const getCurrentReferrer = () => {
  if (typeof document === 'undefined') {
    return ''
  }

  return document.referrer
}

export const isExcludedAnalyticsReferrer = ({
  referrer = getCurrentReferrer(),
  excludedReferrers = getExcludedReferrerHosts(),
} = {}) => {
  if (typeof referrer !== 'string' || !referrer.trim()) {
    return false
  }

  try {
    const referrerHost = new URL(referrer).host.toLowerCase()

    return excludedReferrers.includes(referrerHost)
  } catch {
    return false
  }
}
