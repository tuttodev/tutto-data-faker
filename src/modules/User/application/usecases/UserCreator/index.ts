import { UserRepository } from '../../../domain/UserRepository'
import { ExistUserByUserName } from '../../../domain/services/ExistUserByUserName'
import { UuidGenerator } from '@moduleShared/domain/uuidGenerator'
import { User } from '../../../domain/User'
import { UserId } from '@moduleShared/domain/value-object/UserId'
import { UserName } from '../../../domain/UserName'
import { UserUserName } from '../../../domain/UserUserName'
import { UserAge } from '../../../domain/UserAge'


interface UserInput {
  name: string
  age: number
  username: string
}

export class UserCreatorUseCase {
  private readonly _userRepository: UserRepository
  private readonly _existUserByUserName: ExistUserByUserName
  private readonly _uuidGenerator: UuidGenerator

  constructor (userRepository: UserRepository, uuidGenerator: UuidGenerator) {
    this._userRepository = userRepository
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

    const existUser: boolean = await this._existUserByUserName.run(user.username.value)

    if (existUser) throw new Error('User already exist')

    const isAnAdult = user.isAdult()
    if (!isAnAdult) throw new Error('User is not adult')

    const userCreated: User = await this._userRepository.save(user)

    return userCreated
  }
}
