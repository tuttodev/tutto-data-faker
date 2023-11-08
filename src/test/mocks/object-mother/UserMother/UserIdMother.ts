import { UserId } from '@domain/entities/user/valueObjects'
import { UuidMother } from '../UuidMother'

export class UserIdMother {
  static create (value: string): UserId {
    return new UserId(value)
  }

  static random (): UserId {
    return UserIdMother.create(UuidMother.random())
  }
}
