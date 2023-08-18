import { UserImage } from '../domain/UserImage'

export interface UploadUserImageRepository {
  upload: (UserImage: UserImage, file: Buffer) => Promise<void>
}