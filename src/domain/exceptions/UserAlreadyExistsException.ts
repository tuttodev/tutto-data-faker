export class UserAlreadyExistsException extends Error {
  constructor () {
    super('User already exists')
  }
}
