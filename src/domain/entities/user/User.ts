import { Nullable } from '@domain/Nullable'
import { EntityRoot } from '../EntityRoot'
import { AgeNotProvided } from './exceptions'
import { UserAge, UserId, UserName, UserUserName } from './valueObjects'

interface PrimitiveData {
  id: string
  name: string
  username: string
  age?: number
}

export class User extends EntityRoot<User, PrimitiveData> {
  readonly id: UserId
  readonly name: UserName
  readonly username: UserUserName
  readonly age?: UserAge

  constructor ({
    id,
    name,
    username,
    age
  }: { id: UserId, name: UserName, username: UserUserName, age?: UserAge }) {
    super()
    this.id = id
    this.name = name
    this.username = username
    this.age = age
  }

  static create (id: UserId, name: UserName, username: UserUserName, age?: UserAge): User {
    const user = new User({
      id,
      name,
      username,
      age
    })

    return user
  }

  static fromPrimitives (plainData: { id: string, name: string, username: string, age?: number }): User {
    return new User({
      id: new UserId(plainData.id),
      name: new UserName(plainData.name),
      username: new UserUserName(plainData.username),
      age: new UserAge(plainData.age)
    })
  }

  toPrimitives (): PrimitiveData {
    return {
      id: this.id._value,
      name: this.name._value,
      username: this.username._value,
      age: this.age?._value
    }
  }

  isAdult (age?: number): Nullable<boolean> {
    if (age === undefined) {
      if (this.age?._value === undefined) {
        throw new AgeNotProvided()
      } else {
        return this.age._value >= 18
      }
    } else {
      return age >= 18
    }
  }
}
