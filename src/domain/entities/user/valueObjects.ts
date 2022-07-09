import { Uuid } from '@domain/valueObjects/Uuid'
import { InvalidUserAge } from './exceptions'

export class UserId extends Uuid {
  constructor (value: string) {
    super(value)
  }
}

export class UserName {
  readonly _value: string

  constructor (value: string) {
    this._value = value
  }
}

export class UserUserName {
  readonly _value: string

  constructor (value: string) {
    this._value = value
  }
}

export class UserAge {
  readonly _value: number

  constructor (value?: number) {
    if (value === undefined) throw new InvalidUserAge()

    if (value < 0 || value > 125) throw new InvalidUserAge()

    this._value = value
  }
}
