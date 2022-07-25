import { Exception } from './Exception'

export class UserIsNotAnAdultException extends Exception {
  constructor () {
    super('The user is not an adult')
    this.spanishMessage = 'El usuario no es un adulto'
  }
}
