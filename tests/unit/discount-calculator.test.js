import { describe, expect, it } from 'vitest'
import { calculateDiscount, formatCurrency, parseDiscountNumber } from '@/utils/discountCalculator'

describe('discountCalculator', () => {
  it('calcula valor do desconto e preço final', () => {
    const result = calculateDiscount('200', '15')

    expect(result.error).toBe('')
    expect(result.discountAmount).toBe(30)
    expect(result.finalPrice).toBe(170)
  })

  it('aceita vírgula e ponto em números decimais', () => {
    expect(calculateDiscount('199,90', '10').finalPrice).toBe(179.91)
    expect(calculateDiscount('199.90', '10.5').discountAmount).toBe(20.99)
    expect(parseDiscountNumber('15,5')).toBe(15.5)
    expect(parseDiscountNumber('1.000,50')).toBe(1000.5)
    expect(parseDiscountNumber('1,000.50')).toBe(1000.5)
  })

  it('mantém o preço original quando o desconto é zero', () => {
    const result = calculateDiscount('149,99', '0')

    expect(result.error).toBe('')
    expect(result.discountAmount).toBe(0)
    expect(result.finalPrice).toBe(149.99)
  })

  it('zera o preço final quando o desconto é de 100%', () => {
    const result = calculateDiscount('149,99', '100')

    expect(result.error).toBe('')
    expect(result.discountAmount).toBe(149.99)
    expect(result.finalPrice).toBe(0)
  })

  it('retorna erro amigável para entradas vazias ou inválidas', () => {
    expect(calculateDiscount('', '10').error).toBe('Informe um preço original válido.')
    expect(calculateDiscount('100', '').error).toBe('Informe um desconto válido entre 0% e 100%.')
    expect(calculateDiscount('100', '120').error).toBe(
      'Informe um desconto válido entre 0% e 100%.',
    )
  })

  it('formata moeda em pt-BR', () => {
    expect(formatCurrency(169.91).replace(/\s/u, ' ')).toBe('R$ 169,91')
  })
})
