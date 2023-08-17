import { Exception } from '@domain/exceptions/Exception'

export class HandlerError {
  static run (error: any): Error {
    if (error instanceof Exception) {
      return new Error(error.spanishMessage)
    }

    return error
  }
}
