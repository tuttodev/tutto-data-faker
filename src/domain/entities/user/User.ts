import { UserAge, UserId, UserName, UserUserName } from './valueObjects'

export class User {
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
    this.id = id
    this.name = name
    this.username = username
    this.age = age
  }

  // TODO: add fromPrimitive method and toPromitive and *createFromPrimitive*
  // TODO: find a use case for the principle tell don't ask
}
