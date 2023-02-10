import { CGError } from './error'

describe(CGError, () => {
  it('creates a CGError instance', () => {
    const error = new CGError({
      code: '__required__',
      message: 'Value is required.',
    })
    expect(error).toBeInstanceOf(CGError)
    expect(error.code).toBe('__required__')
    expect(error.message).toBe('Value is required.')
  })
})
