import { CGSchema, CGSchemaOptions } from './CGSchema'

export const boolean = (options: CGSchemaOptions = {}): CGSchema<boolean> => {
  const schema = new CGSchema<boolean>(
    (value) => typeof value === 'boolean',
    options
  )
  return schema
}
