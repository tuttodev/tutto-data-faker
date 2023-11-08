import { UserUserName } from '@domain/entities/user/valueObjects'
import { StringMother } from '../StringMother'

export class UserUserNameMother {
  static random (): UserUserName {
    return new UserUserName(StringMother.random({ length: 10 }))
  }
}
