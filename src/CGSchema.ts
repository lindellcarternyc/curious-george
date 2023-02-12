import { CGError } from './error'

interface CGSchemaOptions {
  required_message?: string
  invalid_type_message?: string
}

export class CGSchema<T> {
  private readonly required_message: string
  private readonly invalid_type_message: string

  constructor(
    private readonly typeCheck?: (value: unknown) => boolean,
    { required_message, invalid_type_message }: CGSchemaOptions = {}
  ) {
    this.required_message = required_message || 'Value is required.'
    this.invalid_type_message = invalid_type_message || 'Value is wrong type.'
  }

  parse(value: unknown): T {
    if (this.typeCheck) {
      if (this.typeCheck(value)) {
        return value as T
      } else if (value === null || value == undefined) {
        throw new CGError({
          code: '__required__',
          message: this.required_message,
        })
      } else {
        throw new CGError({
          code: '__invalid_type__',
          message: this.invalid_type_message,
        })
      }
    }
    return value as T
  }
}
