import { UserImage } from '@domain/entities/user-image/UserImage'

export interface UploadUserImageRepository {
  upload: (UserImage: UserImage, file: Buffer) => Promise<void>
}
