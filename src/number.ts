import { CGSchema, CGSchemaOptions } from './CGSchema'

export const number = (options: CGSchemaOptions = {}): CGSchema<number> => {
  const schema = new CGSchema<number>(
    (value) => typeof value === 'number',
    options
  )
  return schema
}
