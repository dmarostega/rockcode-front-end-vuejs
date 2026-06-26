import { formatCurrency, formatDecimal, parseLocaleNumber, roundTo } from './numberFormat'

export const calculateFuelConsumption = (distanceInput, litersInput, fuelPriceInput = '') => {
  const distance = parseLocaleNumber(distanceInput)
  const liters = parseLocaleNumber(litersInput)
  const hasFuelPrice = String(fuelPriceInput ?? '').trim() !== ''
  const fuelPrice = hasFuelPrice ? parseLocaleNumber(fuelPriceInput) : null

  if (distance === null || distance <= 0) {
    return {
      error: 'Informe uma distância maior que zero.',
    }
  }

  if (liters === null || liters <= 0) {
    return {
      error: 'Informe uma quantidade de litros maior que zero.',
    }
  }

  if (hasFuelPrice && (fuelPrice === null || fuelPrice <= 0)) {
    return {
      error: 'Informe um preço de combustível válido ou deixe o campo em branco.',
    }
  }

  const kmPerLiter = roundTo(distance / liters)
  const totalCost = fuelPrice ? roundTo(liters * fuelPrice) : null
  const costPerKm = fuelPrice ? roundTo(totalCost / distance, 4) : null

  return {
    costPerKm,
    distance,
    error: '',
    fuelPrice,
    kmPerLiter,
    liters,
    totalCost,
  }
}

export const formatFuelDecimal = (value) => formatDecimal(value)

export const formatFuelCurrency = (value) => formatCurrency(value)
