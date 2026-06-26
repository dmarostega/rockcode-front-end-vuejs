import { describe, expect, it } from 'vitest'
import {
  calculateFuelConsumption,
  formatFuelCurrency,
  formatFuelDecimal,
} from '@/utils/fuelConsumptionCalculator'

describe('fuelConsumptionCalculator', () => {
  it('calcula consumo médio a partir de distância e litros', () => {
    const result = calculateFuelConsumption('420', '35')

    expect(result.error).toBe('')
    expect(result.kmPerLiter).toBe(12)
    expect(result.costPerKm).toBeNull()
    expect(result.totalCost).toBeNull()
  })

  it('calcula custo por km e gasto estimado quando há preço', () => {
    const result = calculateFuelConsumption('420', '35', '5,89')

    expect(result.error).toBe('')
    expect(result.kmPerLiter).toBe(12)
    expect(result.totalCost).toBe(206.15)
    expect(result.costPerKm).toBe(0.4908)
    expect(formatFuelDecimal(result.kmPerLiter)).toBe('12,00')
    expect(formatFuelCurrency(result.totalCost).replace(/\s/u, ' ')).toBe('R$ 206,15')
  })

  it('aceita ponto decimal em valores numéricos', () => {
    const result = calculateFuelConsumption('100.5', '8.5', '6.10')

    expect(result.error).toBe('')
    expect(result.kmPerLiter).toBe(11.82)
  })

  it('retorna erro amigável para valores inválidos', () => {
    expect(calculateFuelConsumption('', '35').error).toBe('Informe uma distância maior que zero.')
    expect(calculateFuelConsumption('420', '0').error).toBe(
      'Informe uma quantidade de litros maior que zero.',
    )
    expect(calculateFuelConsumption('420', '35', 'abc').error).toBe(
      'Informe um preço de combustível válido ou deixe o campo em branco.',
    )
  })
})
