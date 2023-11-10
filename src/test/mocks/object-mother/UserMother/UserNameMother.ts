import { UserName } from '@domain/entities/user/valueObjects'
import { StringMother } from '../StringMother'

export class UserNameMother {
  static random (): UserName {
    return new UserName(StringMother.random({ length: 10 }))
  }
}
