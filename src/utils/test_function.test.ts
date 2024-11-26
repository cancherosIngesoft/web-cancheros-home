import { testFunction } from '../utils/test_function' 

describe('testFunction', () => {
  // Test básico de funcionamiento
  it('should return expected result', () => {
    const result = testFunction('test')
    expect(result).toBeDefined()
  })

  // Test con parámetros
  it('should handle input parameters correctly', () => {
    const input = 'test'
    const result = testFunction(input)
    expect(result).toBe('Hello World')
  })

  // Test de error
  it('should throw error for invalid input', () => {
    expect(() => {
      testFunction(null)
    }).toThrow('Invalid input')
  })

  // Test con diferentes tipos de datos
  it('should handle different data types', () => {
    expect(testFunction(123)).toBe('Hello World')
    expect(testFunction('string')).toBe('Hello World')
    expect(testFunction(true)).toBe('Hello World')
  })

  // Test de casos límite
  it('should handle edge cases', () => {
    expect(testFunction('')).toBe('Hello World')
    expect(testFunction(0)).toBe('Hello World')
  })
})