import { User } from '../../User'
import { UserRepository } from '../../UserRepository'

export class UserGetterById {
  private readonly _userRepository: UserRepository

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async run (id: string): Promise<User> {
    const user = await this._userRepository.getById(id)

    if (user == null) { throw new Error('User not found') }

    return user
  }
}
