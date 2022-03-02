import { UserRepository } from 'domain/repositories/UserRepository'

export class ExistUserByUserName {
  private readonly _userResposiory: UserRepository

  constructor (userRepository: UserRepository) {
    this._userResposiory = userRepository
  }

  async run (username: string): Promise<boolean> {
    const user = await this._userResposiory.getByUserName(username)

    if (user !== null) return true

    return false
  }
}
