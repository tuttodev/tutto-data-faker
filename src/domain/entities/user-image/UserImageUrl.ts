import { StringValueObject } from '@shared/domain/value-object/StringValueObject'

export class UserImageUrl extends StringValueObject {
  constructor (value: string) {
    super(value)
    this.ensureIsUrl(value)
  }

  private ensureIsUrl (value: string): void {
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

    if (!urlRegex.test(value)) {
      throw new Error(`The url <${value}> is not valid`)
    }
  }
}
