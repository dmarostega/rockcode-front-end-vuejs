import { describe, expect, it } from 'vitest'
import { compareUnitPrices, formatUnitPrice } from '@/utils/priceUnitComparator'

const makeItem = (name, price, quantity, unit) => ({
  name,
  price,
  quantity,
  unit,
})

describe('priceUnitComparator', () => {
  it('calcula custo unitário e indica a melhor opção', () => {
    const result = compareUnitPrices([
      makeItem('Arroz 5 kg', '22,90', '5', 'kg'),
      makeItem('Arroz 1 kg', '5,20', '1', 'kg'),
    ])

    expect(result.error).toBe('')
    expect(result.winner.name).toBe('Arroz 5 kg')
    expect(result.summary).toContain('Arroz 5 kg')
    expect(formatUnitPrice(result.items[0]).replace(/\s/u, ' ')).toBe('R$ 4,58 por kg')
    expect(formatUnitPrice(result.items[1]).replace(/\s/u, ' ')).toBe('R$ 5,20 por kg')
  })

  it('compara unidades compatíveis em bases diferentes', () => {
    const result = compareUnitPrices([
      makeItem('Shampoo 400 ml', '18,90', '400', 'ml'),
      makeItem('Shampoo 1 l', '39,00', '1', 'l'),
    ])

    expect(result.error).toBe('')
    expect(result.items[0].baseLabel).toBe('litro')
    expect(result.winner.name).toBe('Shampoo 1 l')
  })

  it('informa empate quando o custo unitário é igual', () => {
    const result = compareUnitPrices([
      makeItem('Cabo 10 m', '20', '10', 'm'),
      makeItem('Cabo 500 cm', '10', '500', 'cm'),
    ])

    expect(result.error).toBe('')
    expect(result.winner).toBeNull()
    expect(result.summary).toBe('As opções têm o mesmo custo unitário.')
  })

  it('bloqueia unidades incompatíveis', () => {
    const result = compareUnitPrices([
      makeItem('Produto em kg', '10', '1', 'kg'),
      makeItem('Produto em litro', '10', '1', 'l'),
    ])

    expect(result.error).toBe(
      'Compare itens com unidades compatíveis, como kg com g, litro com ml ou metro com cm.',
    )
  })

  it('valida preço e quantidade vazia, zero ou negativa', () => {
    expect(compareUnitPrices([makeItem('A', '', '1', 'kg'), makeItem('B', '10', '1', 'kg')]).error).toBe(
      'Informe um preço válido para A.',
    )
    expect(compareUnitPrices([makeItem('A', '10', '0', 'kg'), makeItem('B', '10', '1', 'kg')]).error).toBe(
      'Informe uma quantidade maior que zero para A.',
    )
    expect(compareUnitPrices([makeItem('A', '10', '-1', 'kg'), makeItem('B', '10', '1', 'kg')]).error).toBe(
      'Informe uma quantidade maior que zero para A.',
    )
  })
})
