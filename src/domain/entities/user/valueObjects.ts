import { Uuid } from '@shared/domain/value-object/Uuid'
import { InvalidUserAge } from './exceptions'

export class UserId extends Uuid {}

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
