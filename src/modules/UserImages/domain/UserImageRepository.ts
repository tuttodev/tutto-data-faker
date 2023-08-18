import { UserImage } from '../domain/UserImage'

export interface UserImageRepository {
  save: (userImage: UserImage) => Promise<void>
}