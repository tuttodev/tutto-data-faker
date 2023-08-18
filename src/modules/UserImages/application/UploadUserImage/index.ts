import { UserImageId } from '../../domain/UserImageId'
import { UserImage } from '../../domain/UserImage'
import { UserImageFileExtension } from '../../domain/UserImageFileExtension'
import { UserImageFileMimeType } from '../../domain/UserImageFileMimeType'
import { UserImageIsProfile } from '../../domain/UserImageIsProfile'
import { UserId } from '@moduleShared/domain/value-object/UserId'
import { UploadUserImageRepository } from '../../domain/UploadUserImageRepository'
import { UserImageRepository } from '../../domain/UserImageRepository'

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