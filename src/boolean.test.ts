import { boolean } from './boolean'

describe(boolean, () => {
  it('creates a schema that accepts boolean values', () => {
    const boolSchema = boolean({
      required_message: 'REQUIRED',
      invalid_type_message: 'BOOLEAN',
    })

    expect(boolSchema.parse(true)).toBe(true)
    expect(boolSchema.parse(false)).toBe(false)
    expect(() => boolSchema.parse(undefined)).toThrow('REQUIRED')
    expect(() => boolSchema.parse('hello world')).toThrow('BOOLEAN')
  })
})
