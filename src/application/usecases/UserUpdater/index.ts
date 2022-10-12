import { UserAge, UserId, UserName, UserUserName } from '@domain/entities/user/valueObjects'
import { User } from '../../../domain/entities/user/User'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { UserGetterById } from '../../../domain/services/UserGetterById'

interface UserInput {
  name: string
  age: number
  username: string
  id: string
}

export class UserUpdaterUseCase {
  private readonly _userRepository: UserRepository
  private readonly _userGetterById: UserGetterById

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
    this._userGetterById = new UserGetterById(userRepository)
  }

  async run (data: UserInput): Promise<User> {
    const user = await this._userGetterById.run(data.id)

    const dataToUpdate = User.create(
      new UserId(data.id),
      new UserName(data.name ?? user.name._value),
      new UserUserName(data.username ?? user.username._value),
      new UserAge(data.age ?? user.age?._value)
    )

    const userUpdated: User = await this._userRepository.update(dataToUpdate)
    return userUpdated
  }
}
