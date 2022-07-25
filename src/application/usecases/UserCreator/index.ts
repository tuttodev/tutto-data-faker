import { User } from '../../../domain/entities/user/User'
import { UserAge, UserId, UserName, UserUserName } from '../../../domain/entities/user/valueObjects'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { ExistUserByUserName } from '../../../domain/services/ExistUserByUserName'
import { UuidGenerator } from '@domain/utils/uuidGenerator'
import { UserIsNotAnAdultException, UserAlreadyExistsException } from '@domain/exceptions'

interface UserInput {
  name: string
  age: number
  username: string
}

export class UserCreatorUseCase {
  private readonly _userResposiory: UserRepository
  private readonly _existUserByUserName: ExistUserByUserName
  private readonly _uuidGenerator: UuidGenerator

  constructor (userRepository: UserRepository, uuidGenerator: UuidGenerator) {
    this._userResposiory = userRepository
    this._uuidGenerator = uuidGenerator
    this._existUserByUserName = new ExistUserByUserName(userRepository)
  }

  async run (params: UserInput): Promise<User> {
    const user = new User({
      id: new UserId(this._uuidGenerator.generate()),
      name: new UserName(params.name),
      username: new UserUserName(params.username),
      age: new UserAge(params.age)
    })

    const existUser: boolean = await this._existUserByUserName.run(user.username._value)

    if (existUser) throw new UserAlreadyExistsException()

    const isAnAdult = user.isAdult()
    if (!isAnAdult) throw new UserIsNotAnAdultException()

    const userCreated: User = await this._userResposiory.save(user)

    return userCreated
  }
}
