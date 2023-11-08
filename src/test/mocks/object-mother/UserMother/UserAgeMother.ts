import { UserAge } from '@domain/entities/user/valueObjects'
import { NumberMother } from '../NumberMother'

export class UserAgeMother {
  static random (): UserAge {
    return new UserAge(NumberMother.randomAge())
  }
}
