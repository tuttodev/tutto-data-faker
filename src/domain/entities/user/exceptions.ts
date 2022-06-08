import { Exception } from '@domain/exceptions/Exception'

export class InvalidUserAge extends Exception {
  constructor () {
    super('Invalid User AGE')
    this.spanishMessage = 'Edad del usuario invalida'
  }
}
