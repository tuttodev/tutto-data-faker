import { UserImageId } from '@domain/entities/user-image/UserId'
import { UserImage } from '@domain/entities/user-image/UserImage'
import { UserImageFileExtension } from '@domain/entities/user-image/UserImageFileExtension'
import { UserImageFileMimeType } from '@domain/entities/user-image/UserImageFileMimeType'
import { UserImageIsProfile } from '@domain/entities/user-image/UserImageIsProfile'
import { UserId } from '@domain/entities/user/valueObjects'
import { UploadUserImageRepository } from '@domain/repositories/UploadUserImageRepository'
import { UserImageRepository } from '@domain/repositories/UserImageRepository'

interface Input {
  id: string
  userId: string
  image: Buffer
  imageMimeType: string
  imageExt: string
  imageName: string
  isProfile: boolean
}

export class UploadUserImage {
  constructor (
    private readonly uploadUserImageRepository: UploadUserImageRepository,
    private readonly userImageRepository: UserImageRepository
  ) {}

  async execute (input: Input): Promise<void> {
    const userImage = UserImage.create({
      id: new UserImageId(input.id),
      fileExtension: new UserImageFileExtension(input.imageExt),
      fileMimeType: new UserImageFileMimeType(input.imageMimeType),
      userId: new UserId(input.userId),
      isProfile: new UserImageIsProfile(input.isProfile)
    })

    await this.uploadUserImageRepository.upload(userImage, input.image)

    await this.userImageRepository.save(userImage)
  }
}
