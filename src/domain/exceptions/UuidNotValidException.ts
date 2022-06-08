import { Exception } from './Exception'

export class UuidNotValidException extends Exception {
  constructor () {
    super('Uuid not valid')
    this.spanishMessage = 'Uuid no valido'
  }
}
