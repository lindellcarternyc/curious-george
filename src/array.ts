import { CGSchema, CGSchemaOptions } from './CGSchema'
import { CGError } from './error'

export class ArraySchema<T> extends CGSchema<T[]> {
  constructor(
    private readonly schema: CGSchema<T>,
    options: CGSchemaOptions = {}
  ) {
    super(Array.isArray, options)
  }

  get element(): CGSchema<T> {
    return this.schema
  }

  parse(value: unknown): T[] {
    try {
      const valueArray = super.parse(value) as unknown[]
      const result: T[] = []
      for (let i = 0; i < valueArray.length; i++) {
        try {
          result.push(this.schema.parse(valueArray[i]))
        } catch (error) {
          if (error instanceof CGError) {
            throw new CGError({
              code: error.code,
              message: error.message,
              path: `${i}`,
            })
          }
          throw error
        }
      }
      return result
    } catch (error) {
      throw error
    }
  }
}

export const array = <T>(
  schema: CGSchema<T>,
  options: CGSchemaOptions = {}
): ArraySchema<T> => {
  const arraySchema = new ArraySchema<T>(schema, options)
  return arraySchema
}
