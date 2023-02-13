import { array, ArraySchema } from './array'
import { number } from './number'
import { string } from './string'

describe(array, () => {
  it('creates an ArraySchema instance', () => {
    const stringArray = array(string())
    expect(stringArray).toBeInstanceOf(ArraySchema)
  })

  describe('#parse', () => {
    it('accepts an array of items that satisfy the schema', () => {
      const stringArray = array(string())
      expect(stringArray.parse(['hello', 'world'])).toEqual(['hello', 'world'])
      expect(stringArray.parse([])).toEqual([])
      expect(() => stringArray.parse(undefined)).toThrow('required')
      expect(() => stringArray.parse(1)).toThrow('type')
    })

    it('rejects an array with an invalid value', () => {
      const stringArray = array(
        number({
          invalid_type_message: 'Invalid type.',
        })
      )
      const values = [1, 2, 'hello']

      let error
      try {
        stringArray.parse(values)
      } catch (err) {
        error = err
      }
      expect(error).toMatchObject({
        code: '__invalid_type__',
        message: 'Invalid type.',
        path: '2',
      })
    })
  })
})
