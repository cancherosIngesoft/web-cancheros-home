import { testFunction } from './test_function'

describe('testFunction', () => {
  // Test básico de funcionamiento
  it('should return "Hello World" for valid input', () => {
    const result = testFunction('test')
    expect(result).toBe('Hello World')
  })

  // Test de error
  it('should throw error for null input', () => {
    expect(() => {
      testFunction(null)
    }).toThrow('Invalid input')
  })

  // Test con diferentes tipos de datos
  it('should handle different data types', () => {
    const testCases = [
      123,
      'string',
      true,
      false,
      [],
      {},
      undefined
    ]

    testCases.forEach(testCase => {
      expect(testFunction(testCase)).toBe('Hello World')
    })
  })

  // Test de casos límite
  it('should handle edge cases', () => {
    const edgeCases = [
      '',
      0,
      -0,
      Number.MAX_SAFE_INTEGER,
      Number.MIN_SAFE_INTEGER
    ]

    edgeCases.forEach(edgeCase => {
      expect(testFunction(edgeCase)).toBe('Hello World')
    })
  })
})