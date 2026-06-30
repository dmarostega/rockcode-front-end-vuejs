const TRACKING_SESSION_KEY = 'rockcode_tracking_session_id'
const ANALYTICS_ENABLED_VALUES = ['1', 'true', 'enabled', 'yes']
const ALLOWED_EVENT_PAYLOAD_FIELDS = {
  page_viewed: ['page_path', 'route_name'],
  cta_clicked: ['cta_label', 'destination', 'source', 'project_name'],
  tool_card_clicked: ['feature', 'tool_name', 'destination', 'source'],
  project_card_clicked: ['project_name', 'destination', 'source'],
  tool_opened: ['feature'],
  tool_result_copied: ['feature'],
  tool_example_used: ['feature'],
  tool_cleared: ['feature'],
}

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

const sanitizeUrlValue = (value) => {
  if (typeof value !== 'string' || !value.trim()) {
    return null
  }

  try {
    const baseUrl = typeof window === 'undefined' ? 'http://localhost' : window.location.origin
    const parsedUrl = new URL(value, baseUrl)

    if (parsedUrl.origin === baseUrl) {
      return parsedUrl.pathname || '/'
    }

    return `${parsedUrl.origin}${parsedUrl.pathname || '/'}`
  } catch {
    return value.trim()
  }
}

const sanitizePayloadValue = (field, value) => {
  if (field === 'page_path') {
    return sanitizePagePath(value)
  }

  if (field === 'destination') {
    return sanitizeUrlValue(value)
  }

  if (typeof value === 'string') {
    return value.trim().slice(0, 160)
  }

  if (value === null || value === undefined) {
    return null
  }

  return String(value).slice(0, 160)
}

const createAllowedPayload = (eventName, payload, pagePath) => {
  const allowedFields = ALLOWED_EVENT_PAYLOAD_FIELDS[eventName]

  if (!allowedFields) {
    return null
  }

  return allowedFields.reduce((eventPayload, field) => {
    if (field === 'page_path') {
      eventPayload.page_path = pagePath
      return eventPayload
    }

    if (!Object.prototype.hasOwnProperty.call(payload, field)) {
      return eventPayload
    }

    const sanitizedValue = sanitizePayloadValue(field, payload[field])

    if (sanitizedValue) {
      eventPayload[field] = sanitizedValue
    }

    return eventPayload
  }, {})
}

const isAnalyticsEnabled = () =>
  ANALYTICS_ENABLED_VALUES.includes(
    String(import.meta.env.VITE_ANALYTICS_ENABLED || '').toLowerCase(),
  )

const getAnalyticsEndpoint = () => {
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT

  return typeof endpoint === 'string' ? endpoint.trim() : ''
}

const sendTrackingEvent = (event) => {
  if (!isAnalyticsEnabled() || !getAnalyticsEndpoint() || typeof fetch !== 'function') {
    return
  }

  fetch(getAnalyticsEndpoint(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
    credentials: 'omit',
    keepalive: true,
  }).catch(() => {})
}

export const trackEvent = (eventName, payload = {}) => {
  try {
    if (!eventName || !ALLOWED_EVENT_PAYLOAD_FIELDS[eventName]) {
      return null
    }

    const pagePath = sanitizePagePath(payload.page_path)
    const eventPayload = createAllowedPayload(eventName, payload, pagePath)

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

    sendTrackingEvent(event)

    return event
  } catch {
    return null
  }
}
