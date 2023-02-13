import { literal } from './literal'

describe(literal, () => {
  it('creates a schema that accepts a string literal', () => {
    const schema = literal('hello world', {
      message: "must be 'hello world'",
    })
    expect(schema.parse('hello world')).toBe('hello world')
    expect(() => schema.parse('')).toThrow("must be 'hello world'")
    expect(() => schema.parse(null)).toThrow('required')
    expect(() => schema.parse(12)).toThrow('type')
  })

  it('creates a schema that accepts a number literal', () => {
    const schema = literal(123.45)
    expect(() => schema.parse(123)).toThrow('literal')
  })

  it('creates a schema that accepts a boolean literal', () => {
    expect(() => literal(true).parse(false)).toThrow('literal')
  })

  describe('#literal', () => {
    it('provides the literal value', () => {
      const hello = literal('hello')
      expect(hello.literal).toBe('hello')
    })
  })
})
