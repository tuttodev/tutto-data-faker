import { Exception } from './Exception'

export class UserNotFoundException extends Exception {
  constructor () {
    super('User not found')
    this.spanishMessage = 'Usuario no encontrado'
  }
}
