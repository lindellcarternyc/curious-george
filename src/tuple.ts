import { CGSchema, CGSchemaOptions } from './CGSchema'
import { CGError } from './error'

type ExtractType<T extends ReadonlyArray<CGSchema<unknown>>> = {
  [K in keyof T]: T[K] extends CGSchema<infer V> ? V : never
}

interface TupleSchemaOptions extends CGSchemaOptions {
  message?: string
  length_message?: string
}

export class TupleSchema<
  T extends [CGSchema<unknown>, ...CGSchema<unknown>[]]
> extends CGSchema<ExtractType<T>> {
  private readonly message: string | null
  private readonly length_message: string

  constructor(private readonly schemas: T, options: TupleSchemaOptions = {}) {
    super(Array.isArray, options)
    this.message = options.message ?? null
    this.length_message = options.length_message ?? 'Invalid length.'
  }

  parse(value: unknown): ExtractType<T> {
    try {
      const valueArray: unknown[] = super.parse(value)
      if (valueArray.length !== this.schemas.length) {
        throw new CGError({
          code: '__length__',
          message: this.length_message,
        })
      }
      const result = [] as unknown[]

      for (let i = 0; i < valueArray.length; i++) {
        try {
          result.push(this.schemas[i].parse(valueArray[i]))
        } catch (error) {
          if (error instanceof CGError) {
            throw new CGError({
              ...error,
              path: `${i}`,
              message: this.message ?? error.message,
            })
          }
        }
      }

      return result as ExtractType<T>
    } catch (err) {
      if (err instanceof CGError && this.message !== null) {
        throw new CGError({
          ...err,
          message: this.message,
        })
      }
      throw err
    }
  }
}

export const tuple = <T extends [CGSchema<unknown>, ...CGSchema<unknown>[]]>(
  schemas: T,
  options: TupleSchemaOptions = {}
): TupleSchema<T> => {
  const schema = new TupleSchema<T>(schemas, options)
  return schema
}
