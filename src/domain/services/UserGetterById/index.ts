import { User } from 'domain/entities/User'
import { UserRepository } from 'domain/repositories/UserRepository'
import { UserNotFoundException } from '../../exceptions/UserNotFoundException'

export class UserGetterById {
  private readonly _userResposiory: UserRepository

  constructor (userRepository: UserRepository) {
    this._userResposiory = userRepository
  }

  async run (id: string): Promise<User> {
    const user = await this._userResposiory.getById(id)

    if (user === null) { throw new UserNotFoundException() }

    return user
  }
}
