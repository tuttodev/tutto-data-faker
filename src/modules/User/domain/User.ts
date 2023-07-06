import { AggregateRoot } from '@shared/domain/AggregateRoot'
import { UserId } from './UserId'
import { UserName } from './UserName'
import { UserUserName } from './UserUserName'
import { UserAge } from './UserAge'
import { InvalidArgumentError } from '@shared/domain/value-object/InvalidArgumentError'

interface PrimitiveData {
  id: string
  name: string
  username: string
  age?: number
}

export class User extends AggregateRoot {
  readonly id: UserId
  readonly name: UserName
  readonly username: UserUserName
  readonly age: UserAge

  constructor ({
    id,
    name,
    username,
    age
  }: { id: UserId, name: UserName, username: UserUserName, age: UserAge }) {
    super()
    this.id = id
    this.name = name
    this.username = username
    this.age = age
  }

  static create (id: UserId, name: UserName, username: UserUserName, age: UserAge): User {
    const user = new User({
      id,
      name,
      username,
      age
    })

    return user
  }

  static fromPrimitives (plainData: { id: string, name: string, username: string, age: number }): User {
    return new User({
      id: new UserId(plainData.id),
      name: new UserName(plainData.name),
      username: new UserUserName(plainData.username),
      age: new UserAge(plainData.age)
    })
  }

  toPrimitives (): PrimitiveData {
    return {
      id: this.id.value,
      name: this.name.value,
      username: this.username.value,
      age: this.age.value
    }
  }

  isAdult (age?: number): boolean {
    if (age === undefined) {
      if (this.age.value === undefined) {
        throw new InvalidArgumentError('Age is not defined')
      } else {
        return this.age.value >= 18
      }
    } else {
      return age >= 18
    }
  }
}
