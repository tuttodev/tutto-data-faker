import { UserRepository } from '../../UserRepository'

export class ExistUserByUserName {
  private readonly _userRepository: UserRepository

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async run (username: string): Promise<boolean> {
    const user = await this._userRepository.getByUserName(username)

    if (user !== null) return true

    return false
  }
}
