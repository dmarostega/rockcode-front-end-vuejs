import { formatCurrency, parseLocaleNumber, roundTo } from './numberFormat'

export { formatCurrency }

export const parseDiscountNumber = (value) => {
  return parseLocaleNumber(value)
}

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

  const discountAmount = roundTo(originalPrice * (discountPercent / 100))
  const finalPrice = roundTo(originalPrice - discountAmount)

  return {
    error: '',
    discountAmount,
    finalPrice,
  }
}
