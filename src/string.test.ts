import { CGSchema } from './CGSchema'
import { CGError } from './error'
import { string } from './string'

describe(string, () => {
  it('creates a string schema', () => {
    const schema = string()
    expect(schema).toBeInstanceOf(CGSchema)
  })

  describe('#parse', () => {
    it('only accepts string values', () => {
      const schema = string()
      expect(schema.parse('hello world')).toBe('hello world')
      expect(() => schema.parse(undefined)).toThrow()
    })

    it('uses custom error messages', () => {
      const schema = string({
        required_message: 'REQUIRED',
        invalid_type_message: 'WRONG TYPE',
      })

      let error
      try {
        schema.parse(null)
      } catch (err) {
        error = err
      }
      expect(error).toBeInstanceOf(CGError)
      expect(error).toMatchObject({
        code: '__required__',
        message: 'REQUIRED',
      })

      try {
        schema.parse(42)
      } catch (err) {
        error = err
      }
      expect(error).toBeInstanceOf(CGError)
      expect(error).toMatchObject({
        code: '__invalid_type__',
        message: 'WRONG TYPE',
      })
    })
  })
})
