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
  private readonly _userResposiory: UserRepository
  private readonly _userGetterById: UserGetterById

  constructor (userRepository: UserRepository) {
    this._userResposiory = userRepository
    this._userGetterById = new UserGetterById(userRepository)
  }

  async run (data: UserInput): Promise<User> {
    const user = await this._userGetterById.run(data.id)

    const dataToUpdate: User = {
      age: new UserAge(data.age) ?? new UserAge(user.age?._value), // Nullish Coalescing Operator
      name: new UserName(data.name) ?? new UserName(user.name._value),
      id: new UserId(data.id),
      username: new UserUserName(data.username) ?? new UserUserName(user.username._value)
    }

    const userUpdated: User = await this._userResposiory.update(dataToUpdate)
    return userUpdated
  }
}
