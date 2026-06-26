export const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const normalizeNumericInput = (value) => {
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

  return compactValue.replace(',', '.')
}

export const parseDiscountNumber = (value) => {
  const normalizedValue = normalizeNumericInput(value)

  if (!normalizedValue || !/^\d+(\.\d+)?$/.test(normalizedValue)) {
    return null
  }

  const numericValue = Number(normalizedValue)

  return Number.isFinite(numericValue) ? numericValue : null
}

export const formatCurrency = (value) => currencyFormatter.format(value)

const roundToCents = (value) => Math.round((value + Number.EPSILON) * 100) / 100

export const calculateDiscount = (originalPriceInput, discountPercentInput) => {
  const originalPrice = parseDiscountNumber(originalPriceInput)
  const discountPercent = parseDiscountNumber(discountPercentInput)

  if (originalPrice === null) {
    return {
      error: 'Informe um preço original válido.',
      discountAmount: 0,
      finalPrice: 0,
    }
  }

  if (discountPercent === null || discountPercent > 100) {
    return {
      error: 'Informe um desconto válido entre 0% e 100%.',
      discountAmount: 0,
      finalPrice: 0,
    }
  }

  const discountAmount = roundToCents(originalPrice * (discountPercent / 100))
  const finalPrice = roundToCents(originalPrice - discountAmount)

  return {
    error: '',
    discountAmount,
    finalPrice,
  }
}
