import { User } from 'domain/entities/user/User'
import { UserRepository } from 'domain/repositories/UserRepository'

export class UserGetterUseCase {
  private readonly _userRepository: UserRepository

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async run (): Promise<User[]> {
    const users: User[] = await this._userRepository.getAll()
    return users
  }
}
