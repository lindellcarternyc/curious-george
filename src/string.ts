import { CGSchema, CGSchemaOptions } from './CGSchema'

export class CGString extends CGSchema<string> {
  constructor(options: CGSchemaOptions = {}) {
    super((value) => typeof value === 'string', options)
  }
}

export const string = (options: CGSchemaOptions = {}): CGString => {
  return new CGString(options)
}
