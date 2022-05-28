import { User } from '../../../domain/entities/User'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { ExistUserByUserName } from '../../../domain/services/ExistUserByUserName'
import { UserAlreadyExistsException } from '../../../domain/exceptions/UserAlreadyExistsException'
import { UuidGenerator } from '@domain/utils/uuidGenerator'

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
    const user: User = {
      id: this._uuidGenerator.generate(),
      age: params.age,
      name: params.name,
      username: params.username
    }

    const existUser: boolean = await this._existUserByUserName.run(user.username!)

    if (existUser) throw new UserAlreadyExistsException()

    const userCreated: User = await this._userResposiory.save(user)

    return userCreated
  }
}
