import { InvalidArgumentError } from '@shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '@shared/domain/value-object/StringValueObject'

export class ContentText extends StringValueObject {
  constructor (value: string) {
    super(value)

    this.ensureTextIslessThanFiftyCharacters(value)
  }

  private ensureTextIslessThanFiftyCharacters (text: string): void {
    if (text.length > 50) {
      throw new InvalidArgumentError(`<${text}> has more than 50 characters`)
    }
  }
}
