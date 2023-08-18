import { UserId } from '@moduleShared/domain/value-object/UserId'
import { UserName } from '../../../domain/UserName'
import { UserUserName } from '../../../domain/UserUserName'
import { UserAge } from '../../../domain/UserAge'
import { User } from '../../../domain/User'
import { UserRepository } from '../../../domain/UserRepository'
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
      new UserName(data.name ?? user.name.value),
      new UserUserName(data.username ?? user.username.value),
      new UserAge(data.age ?? user.age?.value)
    )

    const userUpdated: User = await this._userRepository.update(dataToUpdate)
    return userUpdated
  }
}
