import { User } from 'domain/entities/User'
import { UserRepository } from 'domain/repositories/UserRepository'

export class UserGetterUseCase {
  private readonly _userResposiory: UserRepository

  constructor (userRepository: UserRepository) {
    this._userResposiory = userRepository
  }

  async run (): Promise<User[]> {
    const users: User[] = await this._userResposiory.getAll()
    return users
  }
}
