import { UserAge, UserId, UserName, UserUserName } from './valueObjects'

export class User {
  readonly id: UserId
  readonly name: UserName
  readonly username: UserUserName
  readonly _age?: UserAge

  constructor ({
    id,
    name,
    username,
    age
  }: { id: UserId, name: UserName, username: UserUserName, age?: UserAge }) {
    this.id = id
    this.name = name
    this.username = username
    this._age = age
  }
}
