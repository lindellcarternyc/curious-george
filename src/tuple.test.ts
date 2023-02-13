import { CGError } from './error'
import { number } from './number'
import { string } from './string'
import { tuple, TupleSchema } from './tuple'

describe(tuple, () => {
  it('creates a tuple schema', () => {
    const tupSchema = tuple([number(), string()])
    expect(tupSchema).toBeInstanceOf(TupleSchema)
  })

  describe('#parse', () => {
    it('accepts a valid tuple', () => {
      const tupSchema = tuple([number(), string()])
      expect(tupSchema.parse([1, 'hello'])).toEqual([1, 'hello'])
    })

    it('#rejects an array of the wrong length', () => {
      const tupSchema = tuple([number()])
      expect(() => tupSchema.parse([1, 'hello'])).toThrow('length')
    })

    it('rejects an invalid value', () => {
      const tupSchema = tuple([number(), string()])

      let error
      try {
        tupSchema.parse([12, 34])
      } catch (err) {
        error = err
      }
      expect(error).toBeInstanceOf(CGError)
      expect(error).toMatchObject({
        code: '__invalid_type__',
        path: '1',
      })
    })
  })
})
