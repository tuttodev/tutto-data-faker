import { StringValueObject } from '@moduleShared/domain/value-object/StringValueObject'

export class UserImageFileExtension extends StringValueObject {
  constructor (value: string) {
    super(value)

    this.ensureIsAllowExtension(value)
  }

  private ensureIsAllowExtension (value: string): void {
    const allowedExtensions = ['png', 'jpg', 'jpeg']

    if (!allowedExtensions.includes(value)) {
      throw new Error(`The file extension ${value} is not allowed`)
    }
  }
}