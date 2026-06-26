export const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const decimalFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const normalizeNumericInput = (value) => {
  const trimmedValue = String(value ?? '').trim()

  if (!trimmedValue) {
    return ''
  }

  const compactValue = trimmedValue.replace(/\s/g, '')
  const lastCommaIndex = compactValue.lastIndexOf(',')
  const lastDotIndex = compactValue.lastIndexOf('.')

  if (lastCommaIndex !== -1 && lastDotIndex !== -1) {
    const decimalSeparator = lastCommaIndex > lastDotIndex ? ',' : '.'
    const thousandSeparator = decimalSeparator === ',' ? '.' : ','

    return compactValue.replaceAll(thousandSeparator, '').replace(decimalSeparator, '.')
  }

  if (lastDotIndex !== -1 && /^\d{1,3}(\.\d{3})+$/.test(compactValue)) {
    return compactValue.replaceAll('.', '')
  }

  return compactValue.replace(',', '.')
}

export const parseLocaleNumber = (value) => {
  const normalizedValue = normalizeNumericInput(value)

  if (!normalizedValue || !/^\d+(\.\d+)?$/.test(normalizedValue)) {
    return null
  }

  const numericValue = Number(normalizedValue)

  return Number.isFinite(numericValue) ? numericValue : null
}

export const formatCurrency = (value) => currencyFormatter.format(value)

export const formatDecimal = (value) => decimalFormatter.format(value)

export const roundTo = (value, decimalPlaces = 2) => {
  const multiplier = 10 ** decimalPlaces

  return Math.round((value + Number.EPSILON) * multiplier) / multiplier
}
