import { number } from './number'

describe(number, () => {
  it('creates a schema that accepts numbers', () => {
    const numSchema = number({
      required_message: 'REQUIRED',
      invalid_type_message: 'WRONG TYPE',
    })

    let error = null
    try {
      const value = numSchema.parse(100)
      expect(value).toBe(100)
    } catch (err) {
      error = err
    }
    expect(error).toBeNull()

    try {
      numSchema.parse(null)
    } catch (err) {
      error = err
    }
    expect(error).toMatchObject({
      code: '__required__',
      message: 'REQUIRED',
    })

    try {
      numSchema.parse('hello')
    } catch (err) {
      error = err
    }
    expect(error).toMatchObject({
      code: '__invalid_type__',
      message: 'WRONG TYPE',
    })
  })
})
