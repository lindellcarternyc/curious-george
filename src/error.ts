type CGErrorCode =
  | '__required__'
  | '__invalid_type__'
  | '__literal__'
  | '__length__'

interface CGErrorArgs {
  code: CGErrorCode
  message: string
  path?: string
}

export class CGError {
  readonly code: CGErrorCode
  readonly message: string
  readonly path?: string

  constructor({ code, message, path }: CGErrorArgs) {
    this.code = code
    this.message = message
    this.path = path
  }
}
