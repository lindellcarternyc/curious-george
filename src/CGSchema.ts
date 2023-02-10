import { CGError } from './error'

export class CGSchema<T> {
  constructor(private readonly typeCheck?: (value: unknown) => boolean) {}

  parse(value: unknown): T {
    if (this.typeCheck) {
      if (this.typeCheck(value)) {
        return value as T
      } else if (value === null || value == undefined) {
        throw new CGError({
          code: '__required__',
          message: 'Value is required.',
        })
      } else {
        throw new CGError({
          code: '__invalid_type__',
          message: 'Value is wrong type.',
        })
      }
    }
    return value as T
  }
}
