import { formatCurrency, parseLocaleNumber, roundTo } from './numberFormat'

export const unitOptions = [
  { value: 'unidade', label: 'unidade', category: 'unit', factor: 1, baseLabel: 'unidade' },
  { value: 'kg', label: 'kg', category: 'weight', factor: 1, baseLabel: 'kg' },
  { value: 'g', label: 'g', category: 'weight', factor: 0.001, baseLabel: 'kg' },
  { value: 'l', label: 'litro', category: 'volume', factor: 1, baseLabel: 'litro' },
  { value: 'ml', label: 'ml', category: 'volume', factor: 0.001, baseLabel: 'litro' },
  { value: 'm', label: 'metro', category: 'length', factor: 1, baseLabel: 'metro' },
  { value: 'cm', label: 'cm', category: 'length', factor: 0.01, baseLabel: 'metro' },
]

const unitsByValue = Object.fromEntries(unitOptions.map((unit) => [unit.value, unit]))

const parseItem = (item, index) => {
  const price = parseLocaleNumber(item.price)
  const quantity = parseLocaleNumber(item.quantity)
  const unit = unitsByValue[item.unit]
  const displayName = item.name?.trim() || `Opção ${index + 1}`

  if (price === null || price <= 0) {
    return { error: `Informe um preço válido para ${displayName}.` }
  }

  if (quantity === null || quantity <= 0) {
    return { error: `Informe uma quantidade maior que zero para ${displayName}.` }
  }

  if (!unit) {
    return { error: `Escolha uma unidade válida para ${displayName}.` }
  }

  const baseQuantity = quantity * unit.factor

  return {
    baseLabel: unit.baseLabel,
    baseQuantity,
    category: unit.category,
    name: displayName,
    price,
    quantity,
    unit: unit.label,
    unitPrice: roundTo(price / baseQuantity, 4),
  }
}

export const compareUnitPrices = (items) => {
  const parsedItems = items.map(parseItem)
  const invalidItem = parsedItems.find((item) => item.error)

  if (invalidItem) {
    return {
      error: invalidItem.error,
      items: [],
      summary: '',
    }
  }

  const [firstItem, secondItem] = parsedItems

  if (firstItem.category !== secondItem.category) {
    return {
      error: 'Compare itens com unidades compatíveis, como kg com g, litro com ml ou metro com cm.',
      items: parsedItems,
      summary: '',
    }
  }

  const priceDifference = Math.abs(firstItem.unitPrice - secondItem.unitPrice)

  if (priceDifference < 0.0001) {
    return {
      error: '',
      items: parsedItems,
      summary: 'As opções têm o mesmo custo unitário.',
      winner: null,
      differenceLabel: 'Empate técnico no custo por unidade.',
    }
  }

  const winner = firstItem.unitPrice < secondItem.unitPrice ? firstItem : secondItem
  const loser = winner === firstItem ? secondItem : firstItem
  const percentDifference = roundTo((priceDifference / loser.unitPrice) * 100)

  return {
    error: '',
    differenceLabel: `${winner.name} sai cerca de ${formatCurrency(priceDifference)} por ${winner.baseLabel} mais barato, aproximadamente ${percentDifference}% abaixo da outra opção.`,
    items: parsedItems,
    summary: `${winner.name} compensa mais pelo menor custo por ${winner.baseLabel}.`,
    winner,
  }
}

export const formatUnitPrice = (item) => `${formatCurrency(item.unitPrice)} por ${item.baseLabel}`
