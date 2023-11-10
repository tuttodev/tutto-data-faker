import { User } from '@domain/entities/user/User'
import { UserAge, UserId, UserName, UserUserName } from '@domain/entities/user/valueObjects'
import { UserIdMother } from './UserIdMother'
import { UserNameMother } from './UserNameMother'
import { UserUserNameMother } from './UserUserNameMother'
import { UserAgeMother } from './UserAgeMother'

export class UserMother {
  static create (id: UserId, name: UserName, username: UserUserName, age: UserAge): User {
    return new User({
      id,
      name,
      username,
      age
    })
  }

  static random (): User {
    return new User({
      id: UserIdMother.random(),
      name: UserNameMother.random(),
      username: UserUserNameMother.random(),
      age: UserAgeMother.random()
    })
  }
}
