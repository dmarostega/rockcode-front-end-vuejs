const TRUTHY_ENV_VALUES = new Set(['1', 'true', 'yes', 'on'])

export const ADSENSE_SCRIPT_ID = 'rock-code-labs-adsense-script'

export function isEnvEnabled(value) {
  return TRUTHY_ENV_VALUES.has(String(value ?? '').trim().toLowerCase())
}

export function getAdsenseConfig(env = import.meta.env) {
  return {
    enabled: isEnvEnabled(env.VITE_ADSENSE_ENABLED),
    clientId: String(env.VITE_ADSENSE_CLIENT_ID ?? '').trim(),
    showPlaceholder: isEnvEnabled(env.VITE_ADSENSE_PLACEHOLDER_ENABLED),
  }
}

export function canLoadAdsenseScript(config = getAdsenseConfig()) {
  return config.enabled && config.clientId.length > 0
}
