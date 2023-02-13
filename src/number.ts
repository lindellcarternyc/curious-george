import { CGSchema, CGSchemaOptions } from './CGSchema'

export class CGNumber extends CGSchema<number> {
  constructor(options: CGSchemaOptions = {}) {
    super((value) => typeof value === 'number', options)
  }
}
export const number = (options: CGSchemaOptions = {}): CGNumber => {
  const schema = new CGNumber(options)
  return schema
}
