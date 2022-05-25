import { Exception } from './Exception'

export class UserAlreadyExistsException extends Exception {
  constructor () {
    super('User already exists')
    this.spanishMessage = 'El usuario ya existe'
  }
}
