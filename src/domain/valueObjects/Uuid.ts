import { UuidNotValidException } from '@domain/exceptions'
import { validate as uuidValidate } from 'uuid'

export class Uuid {
  readonly _value: string

  constructor (value: string) {
    if (!uuidValidate(value)) throw new UuidNotValidException()

    this._value = value
  }
}
