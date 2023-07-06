import { NumberValueObject } from '@shared/domain/value-object/IntValueObject'
import { InvalidArgumentError } from '@shared/domain/value-object/InvalidArgumentError'

export class UserAge extends NumberValueObject {
  constructor (value: number) {
    super(value)

    this.ensureIsValidAge(value)
  }

  private ensureIsValidAge (value: number): void {
    if (value < 0 || value > 125) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${value}>`)
    }
  }
}
