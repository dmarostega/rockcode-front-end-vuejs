const TRACKING_SESSION_KEY = 'rockcode_tracking_session_id'
const ANALYTICS_PROJECT = 'rockcode-site'
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

const normalizeIdentifier = (value) => {
  if (typeof value !== 'string' || !value.trim()) {
    return null
  }

  let identifier = value.trim()
  const shouldParseAsUrl =
    /^https?:\/\//iu.test(identifier) ||
    identifier.startsWith('/') ||
    identifier.startsWith('./') ||
    identifier.startsWith('../')

  if (shouldParseAsUrl) {
    try {
      const baseUrl = typeof window === 'undefined' ? 'http://localhost' : window.location.origin
      const parsedUrl = new URL(identifier, baseUrl)
      const pathIdentifier =
        parsedUrl.pathname && parsedUrl.pathname !== '/' ? parsedUrl.pathname : ''

      identifier =
        pathIdentifier || (parsedUrl.origin !== baseUrl ? parsedUrl.hostname : identifier)
    } catch {
      identifier = identifier.replace(/[?#].*$/u, '')
    }
  }

  identifier = identifier
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/gu, '')
    .toLowerCase()
    .replace(/^\/+|\/+$/gu, '')
    .replace(/\//gu, '_')
    .replace(/[^a-z0-9_-]/gu, '_')
    .replace(/_+/gu, '_')
    .slice(0, 120)

  return identifier || null
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

const createBackendAnalyticsPayload = (event) => {
  const payload = event.payload || {}
  const projectFeature = event.event_name === 'project_card_clicked' ? payload.project_name : null
  const backendPayload = {
    project: ANALYTICS_PROJECT,
    event_name: event.event_name,
    page_path: event.page_path,
    session_id: event.session_id,
    occurred_at: event.timestamp,
  }

  const feature = normalizeIdentifier(payload.feature || projectFeature)
  const source = normalizeIdentifier(payload.source)
  const destination = normalizeIdentifier(payload.destination)

  if (feature) {
    backendPayload.feature = feature
  }

  if (source) {
    backendPayload.source = source
  }

  if (destination) {
    backendPayload.destination = destination
  }

  return backendPayload
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
    body: JSON.stringify(createBackendAnalyticsPayload(event)),
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
