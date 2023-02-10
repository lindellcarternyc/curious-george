export class CGSchema<T> {
  constructor(private readonly typeCheck?: (value: unknown) => boolean) {}

  parse(value: unknown): T {
    if (this.typeCheck) {
      if (this.typeCheck(value)) {
        return value as T
      } else {
        throw new Error('Invalid type')
      }
    }
    return value as T
  }
}
