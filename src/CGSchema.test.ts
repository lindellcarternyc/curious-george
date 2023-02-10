import { CGSchema } from './CGSchema'

describe(CGSchema, () => {
  it('creates a cg schema', () => {
    const schema = new CGSchema()
    expect(schema).toBeInstanceOf(CGSchema)
  })

  describe('#parse', () => {
    it('returns any value', () => {
      const schema = new CGSchema()
      const value = schema.parse('hello world')
      expect(value).toBe('hello world')
    })
  })

  describe('custom type check', () => {
    it('uses a custom type check function', () => {
      const schema = new CGSchema<2>((x) => x === 2)
      expect(schema.parse(2)).toBe(2)
      expect(() => {
        schema.parse(null)
      }).toThrow()
    })
  })
})
