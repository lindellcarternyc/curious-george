import { CGSchema, CGSchemaOptions } from './CGSchema'
import { CGError } from './error'

interface LiteralSchemaOptions extends CGSchemaOptions {
  message?: string
}

type Primitive = string | number | boolean

class LiteralSchema<T extends Primitive> extends CGSchema<T> {
  private readonly invalid_literal_message: string

  constructor(
    private readonly literalValue: T,
    options: LiteralSchemaOptions = {}
  ) {
    super((value) => typeof value === typeof literalValue, options)
    this.invalid_literal_message = options.message ?? 'Invalid literal value.'
  }

  get literal(): T {
    return this.literalValue
  }

  parse(value: unknown): T {
    let result: T

    try {
      result = super.parse(value)
    } catch (err) {
      throw err
    }

    if (result === this.literalValue) {
      return result
    }

    throw new CGError({
      code: '__literal__',
      message: this.invalid_literal_message,
    })
  }
}

export const literal = <T extends Primitive>(
  literalValue: T,
  options: LiteralSchemaOptions = {}
): LiteralSchema<T> => {
  return new LiteralSchema(literalValue, options)
}
