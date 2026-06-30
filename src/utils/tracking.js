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

  return `${window.location.pathname}${window.location.search}${window.location.hash}`
}

export const trackEvent = (eventName, payload = {}) => {
  try {
    if (!eventName) {
      return null
    }

    const event = {
      event_name: eventName,
      page_path: payload.page_path || getPagePath(),
      session_id: getSessionId(),
      timestamp: new Date().toISOString(),
      payload,
    }

    if (import.meta.env.DEV) {
      console.debug('[tracking]', event)
    }

    return event
  } catch {
    return null
  }
}
