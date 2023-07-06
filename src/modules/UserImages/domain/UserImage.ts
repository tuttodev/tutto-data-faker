import { EntityRoot } from '../../User/domain/entities/EntityRoot'
import { UserImageIsProfile } from './UserImageIsProfile'
import { UserImageUrl } from './UserImageUrl'
import { UserId } from '../user/UserId'
import { AggregateRoot } from '@shared/domain/AggregateRoot'

interface PrimitiveData {
  url: string
  userId: string
  isProfile: Boolean
}

export class UserImage extends AggregateRoot {
  readonly url: UserImageUrl
  readonly isProfile: UserImageIsProfile
  readonly userId: UserId

  constructor ({
    url,
    isProfile,
    userId
  }: { url: UserImageUrl, isProfile: UserImageIsProfile, userId: UserId }) {
    super()
    this.url = url
    this.isProfile = isProfile
    this.userId = userId
  }

  static create (data: { url: UserImageUrl, isProfile: UserImageIsProfile, userId: UserId }): UserImage {
    const user = new UserImage(data)

    return user
  }

  static fromPrimitives (plainData: { url: string, isProfile: boolean, userId: string }): UserImage {
    return new UserImage({
      url: new UserImageUrl(plainData.url),
      isProfile: new UserImageIsProfile(plainData.isProfile),
      userId: new UserId(plainData.userId)
    })
  }

  toPrimitives (): PrimitiveData {
    return {
      url: this.url._value,
      isProfile: this.isProfile._value,
      userId: this.userId._value
    }
  }

  generateUrlName (): string {
    return `${this.userId._value}.png`
  }

  isProfileImage (): boolean {
    return this.isProfile._value
  }
}
