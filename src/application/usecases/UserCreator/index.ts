import { User } from '../../../domain/entities/User'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { ExistUserByUserName } from '../../../domain/services/ExistUserByUserName'
import { UserAlreadyExistsException } from '../../../domain/exceptions/UserAlreadyExistsException'

export class UserCreatorUseCase {
  private readonly _userResposiory: UserRepository
  private readonly _existUserByUserName: ExistUserByUserName

  constructor (userRepository: UserRepository) {
    this._userResposiory = userRepository
    this._existUserByUserName = new ExistUserByUserName(userRepository)
  }

  async run (body: User): Promise<User> {
    const existUser: boolean = await this._existUserByUserName.run(body.username!)

    if (existUser) throw new UserAlreadyExistsException()

    const userCreated: User = await this._userResposiory.save(body)

    return userCreated
  }
}
