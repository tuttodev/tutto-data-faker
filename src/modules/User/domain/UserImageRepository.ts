import { UserImage } from '@domain/entities/user-image/UserImage'

export interface UserImageRepository {
  save: (userImage: UserImage) => Promise<void>
}
