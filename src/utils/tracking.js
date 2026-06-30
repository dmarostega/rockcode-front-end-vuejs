const TRACKING_SESSION_KEY = 'rockcode_tracking_session_id'

const createSessionId = () => {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID()
  }

  return `session-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

const getSessionId = () => {
  try {
    const storedSessionId = window.localStorage.getItem(TRACKING_SESSION_KEY)

    if (storedSessionId) {
      return storedSessionId
    }

    const sessionId = createSessionId()
    window.localStorage.setItem(TRACKING_SESSION_KEY, sessionId)

    return sessionId
  } catch {
    return createSessionId()
  }
}

const getPagePath = () => {
  if (typeof window === 'undefined') {
    return ''
  }

  return window.location.pathname
}

const sanitizePagePath = (pagePath) => {
  if (typeof pagePath !== 'string' || !pagePath.trim()) {
    return getPagePath()
  }

  try {
    const baseUrl = typeof window === 'undefined' ? 'http://localhost' : window.location.origin
    const parsedUrl = new URL(pagePath, baseUrl)

    return parsedUrl.pathname || '/'
  } catch {
    return getPagePath()
  }
}

export const trackEvent = (eventName, payload = {}) => {
  try {
    if (!eventName) {
      return null
    }

    const pagePath = sanitizePagePath(payload.page_path)
    const eventPayload = Object.prototype.hasOwnProperty.call(payload, 'page_path')
      ? { ...payload, page_path: pagePath }
      : payload

    const event = {
      event_name: eventName,
      page_path: pagePath,
      session_id: getSessionId(),
      timestamp: new Date().toISOString(),
      payload: eventPayload,
    }

    if (import.meta.env.DEV) {
      console.debug('[tracking]', event)
    }

    return event
  } catch {
    return null
  }
}
