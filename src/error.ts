type CGErrorCode = '__required__' | '__invalid_type__' | '__literal__'

interface CGErrorArgs {
  code: CGErrorCode
  message: string
}

export class CGError {
  readonly code: CGErrorCode
  readonly message: string

  constructor({ code, message }: CGErrorArgs) {
    this.code = code
    this.message = message
  }
}
