import { CGSchema } from './CGSchema'
import { CGError } from './error'

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

    it('throws a required error if the value is null | undefined | void', () => {
      const schema = new CGSchema((value) => typeof value === 'string')
      ;[null].forEach((value) => {
        let error
        try {
          schema.parse(value)
        } catch (err) {
          error = err
        }
        expect(error).toMatchObject({
          code: '__required__',
          message: 'Value is required.',
        })
      })
    })

    it('throws an invalid type error if the value is the wrong type', () => {
      const schema = new CGSchema((x) => typeof x === 'string')
      try {
        schema.parse(123)
      } catch (err) {
        expect(err).toBeInstanceOf(CGError)
        expect(err).toMatchObject({
          code: '__invalid_type__',
          message: 'Value is wrong type.',
        })
      }
    })
  })

  describe('custom error messages', () => {
    it('uses custom error messages', () => {
      const schema = new CGSchema((x) => typeof x === 'number', {
        required_message: 'I must exist!',
        invalid_type_message: "I'm the wrong type!",
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
        message: 'I must exist!',
      })

      try {
        schema.parse('hello')
      } catch (err) {
        error = err
      }
      expect(error).toBeInstanceOf(CGError)
      expect(error).toMatchObject({
        code: '__invalid_type__',
        message: "I'm the wrong type!",
      })
    })
  })
})
