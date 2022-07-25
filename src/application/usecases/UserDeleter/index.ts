
import { User } from 'domain/entities/user/User'
import { UserRepository } from 'domain/repositories/UserRepository'
import { UserGetterById } from '../../../domain/services/UserGetterById'

export class UserDeleterUseCase {
  private readonly _userResposiory: UserRepository
  private readonly _userGetterById: UserGetterById

  constructor (userRepository: UserRepository) {
    this._userResposiory = userRepository
    this._userGetterById = new UserGetterById(userRepository)
  }

  async run (userId: string): Promise<User> {
    const userToDelete = await this._userGetterById.run(userId)

    await this._userResposiory.delete(userToDelete)

    return userToDelete
  }
}
